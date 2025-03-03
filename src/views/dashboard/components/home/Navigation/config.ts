import { ComponentType, DashboardComponent } from "@/views/dashboard/components/types";
import dataJson from "./data.json";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { cloneDeep } from "lodash-es";

const config = {
	title: "快捷导航工具",
	titleFontSize: 16,
	backgroundColor: "#f5f5ff",
	colNum: 4,
	// 数据
	dataset: dataJson
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
	config = cloneDeep(config);
	componentType = ComponentType.HOME;
	events: Record<string, any>;

	constructor() {
		super("Navigation", attr);
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
