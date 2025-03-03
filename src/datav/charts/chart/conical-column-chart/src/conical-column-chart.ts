import { DatavComponent } from "@/datav/types/datav-component";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { getStaticData } from "@/api/modules/data";

/**
 * 锥形柱图 # http://datav.jiaminghi.com/guide/conicalColumnChart.html#%E5%9F%BA%E6%9C%AC%E7%A4%BA%E4%BE%8B
 */
export class ConicalColumnChart extends DatavComponent {
	config = {
		img: [] as Array<String>,
		fontSize: 12,
		imgSideLength: 30,
		columnColor: "rgba(0, 194, 255, 0.4)",
		textColor: "#fff",
		showValue: true
	};

	apis: Partial<ApiConfigMap>;
	apiData: Partial<ApiDataConfigMap>;

	events: Record<string, any>;

	actions: Record<string, any>;

	constructor() {
		super("ConicalColumnChart", { w: 500, h: 300 });

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
			const path = "chart/conical-column-chart";
			const res = await getStaticData(this.id, path);
			this.apiData.source.config.data = JSON.stringify(res.data);
		} catch (error) {
			throw error;
		}
	}
}

export default ConicalColumnChart;
