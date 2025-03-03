import { ComponentType, DashboardComponent } from "@/views/dashboard/components/types";
import dataJson from "./data.json";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { cloneDeep } from "lodash-es";

/**
 *  表单项类型
 */
export enum FormItemType {
	INPUT = "input",
	SELECT = "select",
	DATE_PICKER = "date-picker",
	DATE_RANGE_PICKER = "date-range-picker"
}

/**
 *  表单项类型
 */
export class ChartFormItem {
	id: string;
	type: FormItemType;
	// 字段key
	vModel: string;
	label: string;
	placeholder: string;
	// 必填
	required: boolean;
	// 下拉的特殊配置
	options?: Array<{ label: string; value: string }>;
	// 联动的图表ID
	selectedMappingChartsId?: Array<string>;
	// 映射关系
	mappingFields: Map<string, string>;
	// 过滤条件类型  等于不等之类
	filterType: string;
	// 绑定表单
	bindFormInfo: any;
}

export const option = {
	submitBtnText: "查询",
	// 逻辑连接符号
	logicSymbol: "AND", // AND OR
	// 表单项列表
	formItemList: [] as ChartFormItem[],
	// 数据
	dataset: dataJson
};

const attr = {
	x: 0,
	y: 0,
	w: 6,
	h: 5,
	i: 0
};

export default class Config extends DashboardComponent {
	apiData: Partial<ApiDataConfigMap>;
	apis: Partial<ApiConfigMap>;
	config = cloneDeep(option);
	componentType = ComponentType.BASIC;
	events: Record<string, any>;

	constructor() {
		super("Form", attr);
		this.initData();
	}

	initData(): this {
		this.apis = initApiConfig({
			description: ""
		});

		this.apiData = initApiData(this.id);
		this.apiData.source.config.data = JSON.stringify(dataJson);
		return this;
	}
}
