import { DashboardComponent } from "@/views/dashboard/components/types";
import dataJson from "./data.json";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { eChartOptionPrefixHandle } from "@/views/dashboard/components/chart";

export const includes = ["legend", "title"];

export enum PieTypeEnum {
	NORMAL = "常规图",
	RING = "环形图",
	ROSE = "玫瑰图"
}

export const PieTypeObject = {
	[PieTypeEnum.NORMAL]: "nomal",
	[PieTypeEnum.RING]: "ring",
	[PieTypeEnum.ROSE]: "rose"
};

const option = {
	type: "ring",
	tooltip: {
		show: true,
		trigger: "item"
	},
	legend: {
		show: true
	},
	title: {
		text: "基础饼图"
	},
	dataset: { ...dataJson },
	series: [
		{
			type: "pie",
			radius: ["40%", "65%"],
			center: ["50%", "60%"],
			roseType: false,
			avoidLabelOverlap: false,
			itemStyle: {
				show: true,
				borderRadius: 10,
				borderColor: "#FFFFFF",
				borderWidth: 2
			},
			label: {
				show: false,
				position: "center"
			},
			emphasis: {
				label: {
					show: true,
					fontSize: "40",
					fontWeight: "bold"
				}
			},
			labelLine: {
				show: false
			}
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
	config = {
		...eChartOptionPrefixHandle(option, includes)
	};
	events: Record<string, any>;

	constructor() {
		super("BasicPie", attr);
		this.initData();
	}
	initData(): this {
		this.apis = initApiConfig({
			description: "基础饼图"
		});

		this.apiData = initApiData(this.id);
		this.apiData.source.config.data = JSON.stringify(dataJson);
		return this;
	}
}
