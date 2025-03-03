import { DatavComponent } from "@/datav/types/datav-component";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { getStaticData } from "@/api/modules/data";

/**
 * 进度池 # https://datav-vue3.netlify.app/#/components/PercentPond
 */
export class PercentPond extends DatavComponent {
	config = {
		colors: ["#3DE7C9", "#00BAFF"] as Array<String>,
		borderWidth: 3,
		borderGap: 3,
		lineDash: [5, 1],
		textColor: "#fff",
		borderRadius: 5,
		localGradient: false,
		formatter: "{value}%"
	};

	apis: Partial<ApiConfigMap>;
	apiData: Partial<ApiDataConfigMap>;

	events: Record<string, any>;

	actions: Record<string, any>;

	constructor() {
		super("PercentPond", { w: 220, h: 120 });

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
			const path = "chart/percent-pond";
			const res = await getStaticData(this.id, path);
			this.apiData.source.config.data = JSON.stringify(res.data);
		} catch (error) {
			throw error;
		}
	}
}

export default PercentPond;
