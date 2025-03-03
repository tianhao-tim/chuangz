import { DashboardComponent } from "@/views/dashboard/components/types";
import dataJson from "./data.json";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { eChartOptionPrefixHandle } from "@/views/dashboard/components/chart";
import { cloneDeep } from "lodash-es";

export const includes = ["legend", "xAxis", "yAxis", "title"];
export const seriesItem = {
	type: "bar",
	barWidth: 15,
	label: {
		show: true,
		position: "top",
		color: "#303133",
		fontSize: 12
	},
	itemStyle: {
		borderRadius: 2
	}
};
export const option = {
	tooltip: {
		show: true,
		trigger: "axis",
		axisPointer: {
			show: true,
			type: "shadow"
		}
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
	title: {
		text: "基础柱状图"
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
		super("BasicBar", attr);
		this.initData();
	}
	initData(): this {
		this.apis = initApiConfig({
			description: "基础柱状图"
		});
		this.apiData = initApiData(this.id);
		this.apiData.source.config.data = dataJson;
		return this;
	}
}
