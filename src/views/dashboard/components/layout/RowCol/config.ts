import { ComponentType, DashboardComponent } from "@/views/dashboard/components/types";
import dataJson from "./data.json";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { cloneDeep } from "lodash-es";

//https://element-plus.gitee.io/zh-CN/component/layout.html#%E5%9F%BA%E7%A1%80%E5%B8%83%E5%B1%80
export const option = {
	gutter: 0,
	colList: [
		{
			id: 1,
			span: 12,
			component: null
		},
		{
			id: 2,
			span: 12,
			component: null
		}
	]
};

const attr = {
	x: 0,
	y: 0,
	w: 6,
	h: 6,
	i: 0
};

export default class Config extends DashboardComponent {
	apiData: Partial<ApiDataConfigMap>;
	apis: Partial<ApiConfigMap>;
	config = cloneDeep(option);
	componentType = ComponentType.LAYOUT;
	events: Record<string, any>;

	constructor() {
		super("RowCol", attr);
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
