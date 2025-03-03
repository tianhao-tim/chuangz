import { DashboardComponent } from "@/views/dashboard/components/types";
import dataJson from "./data.json";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { eChartOptionPrefixHandle } from "@/views/dashboard/components/chart";

export const includes = ["legend", "title"];

// 雷达形状
export const RadarShapeEnumList = [
	{ value: "多边形", id: "polygon" },
	{ value: "圆形", id: "circle" }
];

export const option = {
	tooltip: {
		show: true
	},
	legend: {
		data: dataJson.seriesData.map(i => i.name)
	},
	title: {
		text: "基础雷达图"
	},
	dataset: { ...dataJson },
	radar: {
		shape: "polygon",
		radius: ["0%", "60%"],
		center: ["50%", "55%"],
		splitArea: { show: true },
		splitLine: { show: true },
		axisName: { show: true, color: "#000", fontSize: 12 },
		axisLine: { show: true },
		axisTick: { show: true },
		indicator: dataJson.radarIndicator
	},
	series: [
		{
			name: "radar",
			type: "radar",
			areaStyle: {
				opacity: 0.1
			},
			data: dataJson.seriesData
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
		super("BasicRadar", attr);
		this.initData();
	}
	initData(): this {
		this.apis = initApiConfig({
			description: "基础雷达图"
		});

		this.apiData = initApiData(this.id);
		this.apiData.source.config.data = JSON.stringify(dataJson);
		return this;
	}
}
