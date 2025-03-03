import { DatavComponent } from "@/datav/types/datav-component";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { getStaticData } from "@/api/modules/data";

/**
 * 油量表 # http://datav.jiaminghi.com/guide/charts.html
 */
export class GaugeChart extends DatavComponent {
	config = {
		title: {
			text: "剩余油量表",
			style: {
				fill: "#fff"
			}
		},
		series: {
			type: "gauge",
			data: [{ name: "itemA", value: 55 }],
			center: ["50%", "55%"],
			axisLabel: {
				formatter: "{value}%",
				style: {
					fill: "#fff"
				}
			},
			axisTick: {
				style: {
					stroke: "#fff"
				}
			},
			animationCurve: "easeInOutBack"
		}
	};

	apis: Partial<ApiConfigMap>;
	apiData: Partial<ApiDataConfigMap>;

	events: Record<string, any>;

	actions: Record<string, any>;

	constructor() {
		super("GaugeChart", { w: 300, h: 250 });

		this.initData();
	}

	initData() {
		this.apis = initApiConfig({
			description: ""
		});

		this.apiData = initApiData(this.id);

		this.events = {
			click: {
				description: "当点击数据项时"
			}
		};
		this.actions = {};
		return this;
	}

	async loadData() {
		try {
			// 组件静态数据来源，当前项目统一管理目录：public/data/*
			// 如：public/data/demo/data.json 简写为 => demo/data
			const path = "chart/gauge-chart";
			const res = await getStaticData(this.id, path);
			this.apiData.source.config.data = JSON.stringify(res.data);
		} catch (error) {
			throw error;
		}
	}
}

export default GaugeChart;
