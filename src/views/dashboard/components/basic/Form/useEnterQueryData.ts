import { ChartFormItem, option } from "@/views/dashboard/components/basic/Form/config";
import { useChartDataFetch } from "../../useChartDataFetch";

export const useQuery = (chartList: any, chartConfig: any, formModel: any) => {
	// 表单配置
	const currentFormConfig = chartConfig.config as typeof option;
	// 记录修改了的组件Id
	const queryComponentIdMap = new Map();
	currentFormConfig.formItemList.forEach((item: ChartFormItem) => {
		// 是否开启了联动
		if (!item.selectedMappingChartsId && item.selectedMappingChartsId.length == 0) {
			return;
		}
		for (let dashboardComponent of chartList) {
			// 开启映射 寻找映射字段名称
			if (item.selectedMappingChartsId.includes(dashboardComponent.id)) {
				const fieldName = item.mappingFields[dashboardComponent.id];
				// 值
				const value = formModel[item.vModel];
				if (fieldName && value) {
					let linkageFilter = dashboardComponent.apiData.source.config.formConfig.linkageFilter;
					if (linkageFilter) {
						const index = linkageFilter.conditionList?.findIndex(item => item.formItemId == fieldName);
						if (index != -1) {
							linkageFilter.conditionList[index] = { method: item.filterType, value: value, formItemId: fieldName };
						} else {
							linkageFilter.conditionList.push({ method: item.filterType, value: value, formItemId: fieldName });
						}
					}
					linkageFilter.rel = currentFormConfig.logicSymbol;
					dashboardComponent.apiData.source.config.formConfig.linkageFilter = linkageFilter;
					queryComponentIdMap.set(dashboardComponent.id, dashboardComponent);
				}
			}
		}
	});
	// 全部刷新
	for (let value of queryComponentIdMap.values()) {
		useChartDataFetch(value, () => {});
	}
};
