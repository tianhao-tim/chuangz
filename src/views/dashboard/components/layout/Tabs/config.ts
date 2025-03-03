import { ComponentType, DashboardComponent } from "@/views/dashboard/components/types";
import dataJson from "./data.json";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { cloneDeep } from "lodash-es";

//https://element-plus.org/zh-CN/component/tabs.html#tabs-%E5%B1%9E%E6%80%A7
export const option = {
	type: "card",
	closable: false,
	addable: false,
	"tab-position": "top",
	stretch: false,
	tabList: [
		{
			id: 1,
			label: "标签1",
			icon: "",
			componentList: []
		},
		{
			id: 2,
			label: "标签2",
			icon: "",
			componentList: []
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
		super("Tabs", attr);
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
