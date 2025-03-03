import { ComponentType, DashboardComponent } from "@/views/dashboard/components/types";
import dataJson from "./data.json";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { cloneDeep } from "lodash-es";

// https://element-plus.org/zh-CN/component/button.html#button-api
const config = {
	size: "small",
	type: "",
	plain: false,
	text: false,
	link: false,
	round: false,
	circle: false,
	color: "",
	icon: "",
	btnText: "按钮",
	linkUrl: ""
};

const attr = {
	x: 0,
	y: 0,
	w: 1,
	h: 1,
	i: 0
};

export default class Config extends DashboardComponent {
	apiData: Partial<ApiDataConfigMap>;
	apis: Partial<ApiConfigMap>;
	config = cloneDeep(config);
	componentType = ComponentType.BASIC;
	events: Record<string, any>;

	constructor() {
		super("Button", attr);
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
