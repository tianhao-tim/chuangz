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
 * PieOneValue
 */
export class PieOneValue extends DatavComponent {
	config = {
		global: {
			fontFamily: "Microsoft Yahei",
			radius: ["90%", "75%"],
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
		colors: ["#0a73ff", "#43ccff", "#3dabff", "#a0a7e6", "#c4ebad", "#96dee8"],
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
		super("PieOneValue", { w: 350, h: 150 });
		this.initData();
	}

	initData() {
		this.apis = initApiConfig({
			// fields: Object.assign({}, ...fields),
			description: "基本折线图接口"
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
			const path = "pie/pie-one-value";
			const res = await getStaticData(this.id, path);
			this.apiData.source.config.data = JSON.stringify(res.data);
		} catch (error) {
			throw error;
		}
	}
}

export default PieOneValue;
