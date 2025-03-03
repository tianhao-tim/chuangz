import { onUnmounted, ref, toRefs, watch } from "vue";
import { useEditorStore } from "@/store/modules/editor";
import { useToolbarStore } from "@/store/modules/toolbar";
import { useApiStore } from "@/store/modules/api";
import { useEventStore } from "@/store/modules/event";
import { DatavComponent } from "@/datav/types/datav-component";
import { ApiConfig, ApiDataConfig, ApiKeyName } from "@/datav/types/data-source";
import { debounce } from "lodash-es";
import { ElMessage } from "element-plus";

export const setComponentData = async (comId: string, apiKey: ApiKeyName, aConfig: ApiConfig, adConfig: ApiDataConfig) => {
	const apiStore = useApiStore();
	const toolbarStore = useToolbarStore();
	toolbarStore.addLoading();

	let isError = false;
	let res: any;

	try {
		// 获取源数据 根据不同类型获取不同数据
		res = await apiStore.requestData(comId, aConfig, adConfig);
	} catch (error: any) {
		isError = true;
		res = { isError, message: error.message };
	}

	if (!isError) {
		try {
			// 使用过滤器筛选数据
			if (adConfig.config.useFilter) {
				// res = execFilter(filterStore.dataFilters, adConfig.pageFilters, res)
			} else {
				// debugStore.setDataStatus(comId, apiKey, 'filter', '')
			}
		} catch (error: any) {
			isError = true;
			res = { isError, message: error.message };
			// debugStore.setDataStatus(comId, apiKey, 'filter', res.message)
		}
	}

	if (isError) {
		ElMessage.error(res.message);
	}

	// 传入组件的数据
	apiStore.setData(comId, apiKey, res);
	toolbarStore.removeLoading();
};

export const useDataCenter = (com: DatavComponent) => {
	const eventStore = useEventStore();
	const editorStore = useEditorStore();

	const { apis, apiData } = toRefs(com);
	const apiKeys = Object.keys(com.apis) as ApiKeyName[];
	const timers = ref<number[]>([]);

	const autoRefreshData = (apiKey: ApiKeyName, ac: ApiConfig) => {
		if (ac.useAutoUpdate && ac.autoUpdate > 0) {
			const timer = window.setInterval(() => {
				setComponentData(com.id, apiKey, ac, apiData.value[apiKey]);
			}, ac.autoUpdate * 1000);
			timers.value.push(timer);
		}
	};

	const autoRefreshAllData = () => {
		apiKeys.forEach(apiKey => {
			autoRefreshData(apiKey, apis.value[apiKey]);
		});
	};

	const initData = (apiKey: ApiKeyName, ac: ApiConfig) => {
		const adc = apiData.value[apiKey];
		watch(
			[ac, () => adc.type, adc.config],
			() => {
				setComponentData(com.id, apiKey, ac, adc);
			},
			{
				deep: true,
				immediate: true
			}
		);
	};

	const stopAutoRefreshAllData = () => {
		timers.value.forEach(t => stopAutoRefreshData(t));
	};

	const stopAutoRefreshData = (id?: number) => {
		clearInterval(id);
	};

	const initAllData = () => {
		apiKeys.forEach(apiKey => {
			initData(apiKey, apis.value[apiKey]);
		});
	};

	// 订阅的变量发生变化时刷新
	const onSubVariablesChange = (fields: Record<string, string>) => {
		const sv = eventStore.subscribersView;
		for (const fname in fields) {
			const key = fields[fname] || fname;
			sv[key]?.forEach(comId => {
				console.log(comId);
			});
		}
	};

	const datavEmit = (eventName: string, data: Record<string, any>) => {
		const cv = eventStore.componentsView[com.id];
		if (!cv) {
			return;
		}
		const eventItem = cv[eventName];
		if (eventItem && eventItem.enable) {
			eventStore.setVariables(eventItem.fields, data);
			onSubVariablesChange(eventItem.fields);
		}
	};

	initAllData();
	if (!editorStore.editMode) {
		autoRefreshAllData();
	}

	onUnmounted(() => {
		stopAutoRefreshAllData();
	});

	// ------初始化默认公共动作------
	const requestData = debounce(() => {
		stopAutoRefreshAllData();

		const arr = apiKeys.map(apiKey => setComponentData(com.id, apiKey, apis.value[apiKey], apiData.value[apiKey]));
		Promise.all(arr).then(() => {
			autoRefreshAllData();
		});
	}, 300);

	return {
		requestData,
		datavEmit
	};
};
