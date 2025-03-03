import { DatavChartSeries, DatavComponent } from "@/datav/types/datav-component";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { getStaticData } from "@/api/modules/data";
import { EChartEasing } from "@/datav/charts/echarts-animation";

export class BasicPieSeries extends DatavChartSeries {
	constructor(name: string) {
		super("pie", name);
	}
}

/**
 * BasicRing
 */
export class BasicRing extends DatavComponent {
	config = {
		global: {
			fontFamily: "Microsoft Yahei",
			center: ["50%", "50%"],
			radius: ["50%", "75%"],
			roseType: false,
			borderRadius: 5
		},
		label: {
			show: true,
			position: "outside",
			textStyle: {
				fontSize: 12,
				color: "rgba(255, 255, 255, 0.6)",
				fontWeight: "normal"
			},
			formatter: "",
			alignTo: "none",
			bleedMargin: 10,
			distanceToLabelLine: 5
		},
		legend: {
			show: true,
			position: "bottom-center",
			orient: "horizontal",
			textStyle: {
				fontSize: 12,
				color: "#90a0ae",
				fontWeight: "normal"
			},
			symbol: {
				show: true,
				icon: "auto",
				width: 25,
				height: 14,
				gap: 10
			}
		},
		tooltip: {
			show: true,
			textStyle: {
				fontSize: 14,
				color: "#fff",
				fontWeight: "normal"
			},
			background: {
				padding: { h: 5, v: 5 },
				color: "rgba(0, 0, 0, 0.65)"
			}
		},
		colors: [{ color: "#0a73ff" }, { color: "#43ccff" }, { color: "#3dabff" }, { color: "#a0a7e6" }, { color: "#c4ebad" }, { color: "#96dee8" }],
		series: [new BasicPieSeries("")],
		animation: {
			enabled: true,
			duration: 1000,
			easing: EChartEasing.cubicOut,
			delay: 0
		}
	};

	apis: Partial<ApiConfigMap>;
	apiData: Partial<ApiDataConfigMap>;

	events: Record<string, any>;

	actions: Record<string, any>;

	constructor() {
		super("BasicRing", { w: 500, h: 300 });

		this.initData();
	}

	initData() {
		this.apis = initApiConfig({
			description: "基础环图"
		});

		this.apiData = initApiData(this.id);

		this.events = {
			click: {
				description: "当点击数据项时"
				// fields: Object.assign({}, ...fields),
			}
		};
		this.actions = {};
		return this;
	}

	async loadData() {
		try {
			// 组件静态数据来源，当前项目统一管理目录：public/data/*
			// 如：public/data/demo/data.json 简写为 => demo/data
			const path = "pie/basic-ring";
			const res = await getStaticData(this.id, path);
			this.apiData.source.config.data = JSON.stringify(res.data);
		} catch (error) {
			throw error;
		}
	}
}

export default BasicRing;
