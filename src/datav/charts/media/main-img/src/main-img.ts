import { DatavComponent } from "@/datav/types/datav-component";
import { ApiConfigMap, ApiDataConfigMap } from "@/datav/types/data-source";
import { getStaticData } from "@/api/modules/data";

/**
 * MainImg
 */
const baseUrl = window.location.origin;
export class MainImg extends DatavComponent {
	config = {
		imageType: "bitmap",
		backgroundImage: `${baseUrl}/datav/main-img.png`,
		vectorImage: `${baseUrl}/datav/datav-vue-logo.svg`,
		vectorFill: "#38ae70",
		repeat: "no-repeat",
		radius: 1,
		urlConfig: {
			url: "",
			ifBlank: false
		},
		cursor: true
	};

	apis: Partial<ApiConfigMap>;
	apiData: Partial<ApiDataConfigMap>;

	events: Record<string, any>;

	actions: Record<string, any>;

	constructor() {
		super("MainImg", { w: 300, h: 180 });

		this.initData();
	}

	initData() {
		this.apis = {};
		this.apiData = {};
		this.events = {};
		this.actions = {};

		return this;
	}

	async loadData() {
		try {
			// 组件静态数据来源，当前项目统一管理目录：public/data/*
			// 如：public/data/demo/data.json 简写为 => demo/data
			const path = "";
			const res = await getStaticData(this.id, path);
			this.apiData.source.config.data = JSON.stringify(res.data);
		} catch (error) {
			throw error;
		}
	}
}

export default MainImg;
