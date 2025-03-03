import { ComponentType, DashboardComponent } from "@/views/dashboard/components/types";
import dataJson from "./data.json";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { cloneDeep } from "lodash-es";

export enum WritingModeEnum {
	HORIZONTAL = "水平",
	VERTICAL = "垂直"
}

export const WritingModeObject = {
	[WritingModeEnum.HORIZONTAL]: "horizontal-tb",
	[WritingModeEnum.VERTICAL]: "vertical-rl"
};

export enum FontWeightEnum {
	NORMAL = "常规",
	BOLD = "加粗"
}

export const FontWeightObject = {
	[FontWeightEnum.NORMAL]: "normal",
	[FontWeightEnum.BOLD]: "bold"
};

export const option = {
	link: "",
	dataset: dataJson,
	fontSize: 20,
	fontColor: "#000000",
	paddingX: 10,
	paddingY: 10,
	textAlign: "center", // 水平对齐方式
	fontWeight: "normal",

	// 边框
	borderWidth: 0,
	borderColor: "#ffffff",
	borderRadius: 5,

	// 字间距
	letterSpacing: 5,
	writingMode: "horizontal-tb",
	backgroundColor: "#00000000"
};

const attr = {
	x: 0,
	y: 0,
	w: 3,
	h: 1,
	i: 0
};

export default class Config extends DashboardComponent {
	apiData: Partial<ApiDataConfigMap>;
	apis: Partial<ApiConfigMap>;
	config = cloneDeep(option);
	componentType = ComponentType.BASIC;
	events: Record<string, any>;

	constructor() {
		super("Text", attr);
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
