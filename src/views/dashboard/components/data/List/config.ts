import { ComponentType, DashboardComponent } from "@/views/dashboard/components/types";
import dataJson from "./data.json";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { cloneDeep } from "lodash-es";

// https://element-plus.gitee.io/zh-CN/component/table.html#%E5%8D%95%E9%80%89
const config = {
	fontSize: 14,
	dataset: dataJson
};

const attr = {
	x: 0,
	y: 0,
	w: 6,
	h: 8,
	i: 0
};

export default class Config extends DashboardComponent {
	apiData: Partial<ApiDataConfigMap>;
	apis: Partial<ApiConfigMap>;
	config = cloneDeep(config);
	componentType = ComponentType.DATA;
	events: Record<string, any>;

	constructor() {
		super("List", attr);
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
