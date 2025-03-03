import { DatavComponent } from "@/datav/types/datav-component";
import { ApiConfigMap, ApiDataConfigMap } from "@/datav/types/data-source";
import { getStaticData } from "@/api/modules/data";

/**
 * MainVideo
 */
const baseUrl = window.location.origin;
export class MainVideo extends DatavComponent {
	config = {
		videoSrc: baseUrl + "/datav/mov_bbb.mp4",
		// 循环
		loop: true,
		muted: true,
		objectFit: "fill"
	};

	apis: Partial<ApiConfigMap>;
	apiData: Partial<ApiDataConfigMap>;

	events: Record<string, any>;

	actions: Record<string, any>;

	constructor() {
		super("MainVideo", { w: 300, h: 180 });

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

export default MainVideo;
