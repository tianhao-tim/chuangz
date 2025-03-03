import { DashboardComponent } from "@/views/dashboard/components/types";
import dataJson from "./data.json";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { eChartOptionPrefixHandle } from "@/views/dashboard/components/chart";

export const includes = ["legend", "title"];

// 排序枚举
export const FunnelOrderEnumList = [
	{ value: "倒三角", id: "descending" },
	{ value: "正三角", id: "ascending" }
];
// 标签位置枚举
export const FunnelLabelPositionEnumList = [
	{ value: "内部", id: "inside" },
	{ value: "外部", id: "outside" },
	{ value: "内部左侧", id: "insideLeft" },
	{ value: "内部右侧", id: "insideRight" }
];

export const option = {
	tooltip: {},
	legend: {},
	dataset: { ...dataJson },
	title: {
		text: "基础漏斗图"
	},
	series: [
		{
			name: "Funnel",
			type: "funnel",
			top: 70,
			left: "10%",
			width: "80%",
			min: 0,
			minSize: "0%",
			maxSize: "100%",
			sort: "descending", // descending | ascending
			gap: 5,
			label: {
				show: true,
				position: "inside",
				fontSize: 12
			},
			itemStyle: {
				borderColor: "#fff",
				borderWidth: 0
			},
			emphasis: {
				label: {
					fontSize: 20
				}
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
		super("Funnel", attr);
		this.initData();
	}
	initData(): this {
		this.apis = initApiConfig({
			description: "基础漏斗图"
		});

		this.apiData = initApiData(this.id);
		this.apiData.source.config.data = JSON.stringify(dataJson);
		return this;
	}
}
