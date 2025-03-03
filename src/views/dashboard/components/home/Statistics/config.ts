import { ComponentType, DashboardComponent } from "@/views/dashboard/components/types";
import dataJson from "./data.json";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { cloneDeep } from "lodash-es";

// https://element-plus.org/zh-CN/component/image.html#image-%E5%B1%9E%E6%80%A7
const config = {
	// 数据
	dataset: dataJson
};

const attr = {
	x: 0,
	y: 0,
	w: 8,
	h: 3,
	i: 0
};

export default class Config extends DashboardComponent {
	apiData: Partial<ApiDataConfigMap>;
	apis: Partial<ApiConfigMap>;
	config = cloneDeep(config);
	componentType = ComponentType.HOME;
	events: Record<string, any>;

	constructor() {
		super("Statistics", attr);
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
