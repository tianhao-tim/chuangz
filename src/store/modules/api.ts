import { defineStore } from "pinia";
import { set } from "lodash-es";
import { ApiKeyName, ApiConfig, ApiDataConfig, ApiType, ApiRequestMethod } from "@/datav/types/data-source";
import { isUrl, toJson, replaceTextParams } from "@/utils";
import dcRequest from "axios";
import { useEventStore } from "./event";
import http from "@/api/index";

export interface IApiState {
	// 数据集合
	dataMap: {
		[k: string]: {
			[k in ApiKeyName]?: any;
		};
	};
}

export const useApiStore = defineStore("api", {
	state: (): IApiState => ({
		dataMap: {}
	}),
	actions: {
		async setData(comId: string, apiKey: ApiKeyName, data: any) {
			set(this.dataMap, `${comId}.${apiKey}`, data);
		},
		async requestData(comId: string, aConfig: ApiConfig, adConfig: ApiDataConfig) {
			const eventStore = useEventStore();
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
				res = await http.post("/datav/chart/data", { chartType, ...formConfig });
			} else if (type === ApiType.dataset) {
				const { datasetConfig } = config;
				// 截取第一个下划线前的字符串
				const chartType = comId.split("_")[0];
				res = await http.post("/datav/chart/data", { chartType, ...datasetConfig });
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

					const url = replaceTextParams(config.api, eventStore.variables);
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
		}
	}
});
