import { ComponentType, DashboardComponent } from "@/views/dashboard/components/types";
import dataJson from "./data.json";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { cloneDeep } from "lodash-es";

export const includes = ["legend", "title"];

const config = {
	// 是否自动切换
	autoplay: true,
	//interval 自动切换的时间间隔，单位为毫秒
	interval: 3000,
	// 类型
	type: "",
	//方向
	direction: "horizontal",
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
	config = cloneDeep(config);
	componentType = ComponentType.BASIC;
	events: Record<string, any>;

	constructor() {
		super("Carousel", attr);
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
