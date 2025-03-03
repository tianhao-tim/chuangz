import { DatavComponent } from "@/datav/types/datav-component";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { getStaticData } from "@/api/modules/data";

/**
 * 水位图 # https://datav-vue3.netlify.app/#/components/WaterLevelPond
 */
export class WaterLevelPond extends DatavComponent {
	config = {
		data: [] as Array<Number>,
		shape: "rect",
		colors: [] as Array<String>,
		waveNum: 3,
		waveHeight: 40,
		waveOpacity: 0.4
	};

	apis: Partial<ApiConfigMap>;
	apiData: Partial<ApiDataConfigMap>;

	events: Record<string, any>;

	actions: Record<string, any>;

	constructor() {
		super("WaterLevelPond", { w: 155, h: 175 });

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
			const path = "chart/water-level-pond";
			const res = await getStaticData(this.id, path);
			this.apiData.source.config.data = JSON.stringify(res.data);
		} catch (error) {
			throw error;
		}
	}
}

export default WaterLevelPond;
