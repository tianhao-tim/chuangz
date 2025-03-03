import { DatavEChartsComponent, DatavChartSeries } from "@/datav/types/datav-component";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { getStaticData } from "@/api/modules/data";

export class WordCloudSeries extends DatavChartSeries {
	color = "#fff";

	constructor(name: string, color: string) {
		super("wordCloud", name);

		this.color = color;
	}
}

/**
 * WordCloud
 */
export class WordCloud extends DatavEChartsComponent {
	config = {
		global: {
			fontFamily: "Microsoft Yahei",
			max: 35,
			min: 14,
			rotationRange: {
				min: -90,
				max: 90
			},
			rotate: 45,
			drawType: "preset",
			shape: "circle",
			image: ""
		},
		series: [new WordCloudSeries("0", "#0a73ff"), new WordCloudSeries("1", "#3dabff"), new WordCloudSeries("2", "#79daff")],
		tooltip: {
			show: false,
			textStyle: {
				fontSize: 14,
				color: "#fff",
				fontWeight: "normal"
			},
			backgroundColor: "rgba(0, 0, 0, 0.65)"
		},
		animation: {
			enabled: true
		}
	};

	apis: Partial<ApiConfigMap>;
	apiData: Partial<ApiDataConfigMap>;

	events: Record<string, any>;

	actions: Record<string, any>;

	constructor() {
		super("WordCloud", { w: 300, h: 200 });

		this.initData();
	}

	initData() {
		this.apis = initApiConfig({});

		this.apiData = initApiData(this.id);

		this.events = {};
		this.actions = {};

		return this;
	}

	async loadData() {
		try {
			// 组件静态数据来源，当前项目统一管理目录：public/data/*
			// 如：public/data/demo/data.json 简写为 => demo/data
			const path = "chart/word-cloud";
			const res = await getStaticData(this.id, path);
			this.apiData.source.config.data = JSON.stringify(res.data);
		} catch (error) {
			throw error;
		}
	}
}

export const drawTypes = [
	{ id: "preset", value: "内置图形" },
	{ id: "image", value: "自定义图形" }
];

export const simpleShapes = [
	{ id: "circle", value: "圆形" },
	{ id: "triangle", value: "三矩形" },
	{ id: "diamond", value: "菱形" },
	{ id: "pentagon", value: "五角星" }
];

export default WordCloud;
