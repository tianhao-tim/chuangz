import { ref, toRefs } from "vue";
import type VChart from "vue-echarts";
import { ComponentType, DashboardComponent } from "@/views/dashboard/components/types";
import { ApiConfig, ApiDataConfig, ApiRequestMethod, ApiType } from "@/datav/types/data-source";
import http from "@/api";
import { isUrl, toJson } from "@/utils";
import dcRequest from "axios";

/**
 * setdata 数据监听与更改
 * @param targetComponent
 * @param updateCallback 自定义更新函数
 */
export const useChartDataFetch = (targetComponent: DashboardComponent, updateCallback?: (...args: any) => any) => {
	const vChartRef = ref<typeof VChart | null>(null);
	let fetchInterval: any = 0;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const requestIntervalFn = () => {
		const { source: apiConfig } = toRefs(targetComponent.apis);
		const { source: adConfig } = toRefs(targetComponent.apiData);

		try {
			// @ts-ignore
			clearInterval(fetchInterval);
			const fetchFn = async () => {
				const res = await requestData(apiConfig.value, adConfig.value, targetComponent.id);
				if (res) {
					try {
						// const filter = targetComponent.filter;
						targetComponent.apiData.source.config.data = res;
						if (targetComponent.config.dataset) {
							targetComponent.config.dataset = res;
						}
						// eCharts 组件配合 vChart 库更新方式
						if (targetComponent.componentType === ComponentType.ECHARTS) {
							if (vChartRef.value) {
								vChartRef.value.setOption({ dataset: res });
							}
						}
						// 更新回调函数
						if (updateCallback) {
							updateCallback(res);
						}
					} catch (error) {
						console.error(error);
					}
				}
			};
			// 立即调用
			fetchFn();

			// 开启定时
			const useAutoUpdate = targetComponent.apis.source.useAutoUpdate;
			// 单位秒
			const autoUpdate = targetComponent.apis.source.autoUpdate;
			// 开启轮询
			if (useAutoUpdate) fetchInterval = setInterval(fetchFn, autoUpdate * 1000);
			// eslint-disable-next-line no-empty
		} catch (error) {
			console.log(error);
		}
	};

	const requestData = async (aConfig: ApiConfig, adConfig: ApiDataConfig, comId: string) => {
		const { type, config } = adConfig;
		let res: any;
		// 静态数据
		if (type === ApiType.static) {
			res = config;
			// 接口请求
		}
		if (type === ApiType.form) {
			const { formConfig } = config;
			// 截取第一个下划线前的字符串
			const chartType = comId.split("_")[0];
			res = await http.post("/dashboard/chart/data", { chartType, ...formConfig });
		} else if (type === ApiType.api) {
			if (!config.api) {
				return [];
			}

			if (!isUrl(config.api)) {
				throw Error("url must contains protocol field, like http:");
			}

			try {
				const conf = {
					headers: toJson(config.apiHeaders, {}),
					withCredentials: config.cookie
				};

				const url = config.api;
				if (config.apiMethod === ApiRequestMethod.GET) {
					res = await dcRequest.get(url, conf);
				} else {
					res = await dcRequest.post(url, toJson(config.apiBody, {}), conf);
				}
			} catch {
				throw Error("connectFailed");
			}
		}

		return toJson(res.data, []);
	};

	requestIntervalFn();
	return { vChartRef };
};
