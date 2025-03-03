import { DatavEChartsComponent, DatavChartSeries } from "@/datav/types/datav-component";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { getStaticData } from "@/api/modules/data";

export class BasicRadarSeries extends DatavChartSeries {
	constructor(name: string) {
		super("radar", name);
	}
}

/**
 * BasicRadar
 */
export class BasicRadar extends DatavEChartsComponent {
	config = {
		global: {
			fontFamily: "Microsoft Yahei",
			center: ["50%", "50%"],
			radius: "75%",
			startAngle: 90,
			shape: "polygon",
			splitNumber: 4,
			axisLine: {
				show: true,
				lineStyle: {
					color: "rgba(211, 253, 250, 0.8)"
				}
			},
			axisName: {
				show: true,
				color: "rgba(211, 253, 250, 0.8)"
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: ["rgba(211, 253, 250, 0.8)"]
				}
			},
			splitArea: {
				show: true,
				areaStyle: {
					color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]
				}
			},
			symbolSize: 2,
			areaStyle: {
				opacity: 0.1
			}
		},
		label: {
			show: false,
			position: "top",
			textStyle: {
				fontSize: 10,
				color: "rgba(255, 255, 255, 0.6)",
				fontWeight: "normal"
			},
			formatter: ""
		},
		legend: {
			show: false,
			position: "top-center",
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
			show: false,
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
		color: ["#0a73ff", "#43ccff", "#3dabff", "#a0a7e6", "#c4ebad", "#96dee8"],
		series: [new BasicRadarSeries("series1")],
		animation: {
			enabled: true,
			duration: 1000,
			easing: "cubicOut",
			delay: 0
		}
	};

	apis: Partial<ApiConfigMap>;
	apiData: Partial<ApiDataConfigMap>;

	events: Record<string, any>;

	actions: Record<string, any>;

	constructor() {
		super("BasicRadar", { w: 500, h: 300 });

		this.initData();
	}

	initData() {
		this.apis = initApiConfig({
			description: "基本雷达图接口"
		});

		this.apiData = initApiData(this.id);

		this.events = {
			click: {
				description: "当点击数据项时",
				fields: Object.assign({})
			}
		};

		this.actions = {};
		return this;
	}

	async loadData() {
		const path = "radar/basic-radar";
		const res = await getStaticData(this.id, path);
		this.apiData.source.config.data = JSON.stringify(res.data);
	}
}

export default BasicRadar;
