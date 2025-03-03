import { DatavEChartsComponent, DatavChartSeries } from "@/datav/types/datav-component";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { getStaticData } from "@/api/modules/data";

export class ArcBarSeries extends DatavChartSeries {
	constructor(name: string) {
		super("bar", name);
	}

	color = {
		type: "solid",
		value: "#00baff",
		from: "#fff",
		to: "#000"
	};
}

/**
 * ArcBar
 */
export class ArcBar extends DatavEChartsComponent {
	config = {
		global: {
			fontFamily: "Microsoft Yahei",
			margin: {
				top: 40,
				bottom: 50,
				left: 50,
				right: 10
			},
			innerPadding: 20,
			outerPadding: 30,
			barWidth: "auto",
			background: {
				show: true,
				color: "rgba(255, 255, 255, 0.1)"
			}
		},
		label: {
			show: false,
			position: "top",
			textStyle: {
				fontSize: 12,
				color: "rgba(255, 255, 255, 0.6)",
				fontWeight: "normal"
			},
			offsetX: 0,
			offsetY: 0
		},
		tooltip: {
			show: true,
			textStyle: {
				fontSize: 14,
				color: "#fff",
				fontWeight: "normal"
			},
			background: {
				padding: {
					h: 5,
					v: 5
				},
				color: "rgba(0, 0, 0, 0.65)"
			},
			pointer: {
				show: true,
				line: {
					type: "dashed",
					width: 1,
					color: "#f5dc69",
					dashedLength: 4,
					dashedSpace: 4
				}
			}
		},
		legend: {
			show: true,
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
			},
			page: {
				enabled: false,
				size: {
					width: 100,
					height: 100
				},
				button: {
					size: 15,
					color: "#000",
					inactiveColor: "#000"
				},
				pageNumColor: "#90a0ae"
			}
		},
		angleAxis: {
			// 不显示经度线
			show: false,
			min: function () {
				return 0;
			},
			max: function (value: any) {
				return (value.max * 4) / 3;
			}
		},
		radiusAxis: {
			type: "category",
			axisLabel: {
				interval: 0,
				color: "#FFF",
				fontSize: 18
			},
			axisLine: {
				show: false
			},
			axisTick: {
				show: false,
				alignWithLabel: true
			},
			splitLine: {
				show: false,
				lineStyle: {
					color: "rgba(17, 51, 68, 0.8)"
				}
			}
		},
		polar: {
			show: 0,
			center: ["50%", "50%"]
		},
		series: [new ArcBarSeries("系列1")],
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
		super("ArcBar", { w: 500, h: 300 });

		this.initData();
	}

	initData() {
		this.apis = initApiConfig({
			description: "玉玦图接口"
		});

		this.apiData = initApiData(this.id);

		this.events = {
			click: {
				description: "当点击数据项时",
				fields: null
			}
		};

		this.actions = {};
		return this;
	}

	async loadData() {
		const path = "bar/arc-bar";
		const res = await getStaticData(this.id, path);
		this.apiData.source.config.data = JSON.stringify(res.data);
	}
}

export default ArcBar;
