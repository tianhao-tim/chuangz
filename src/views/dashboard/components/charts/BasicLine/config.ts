import { DashboardComponent } from "@/views/dashboard/components/types";
import dataJson from "./data.json";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { eChartOptionPrefixHandle } from "@/views/dashboard/components/chart";
import { cloneDeep } from "lodash-es";

export const includes = ["legend", "xAxis", "yAxis", "title"];

export const seriesItem = {
	type: "line",
	label: {
		show: true,
		position: "top",
		color: "#fff",
		fontSize: 12
	},
	symbolSize: 5, //设定实心点的大小
	itemStyle: {
		// @ts-ignore
		color: null,
		borderRadius: 0
	},
	lineStyle: {
		type: "solid",
		width: 3,
		// @ts-ignore
		color: null
	}
};

export const option = {
	tooltip: {
		show: true,
		trigger: "axis",
		axisPointer: {
			type: "line"
		}
	},
	title: {
		text: "基础折线图"
	},
	legend: {
		show: true
	},
	xAxis: {
		show: true,
		type: "category"
	},
	yAxis: {
		show: true,
		type: "value"
	},
	dataset: { ...dataJson },
	series: [cloneDeep(seriesItem), cloneDeep(seriesItem)]
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
		super("BasicLine", attr);
		this.initData();
	}

	initData(): this {
		this.apis = initApiConfig({
			description: "基础折线图"
		});

		this.apiData = initApiData(this.id);
		this.apiData.source.config.data = JSON.stringify(dataJson);
		return this;
	}
}
