import { DatavComponent } from "@/datav/types/datav-component";
import { ApiConfigMap, ApiDataConfigMap } from "@/datav/types/data-source";
// import { DataEventConfig } from '@/datav/types/data-event'
import { getStaticData } from "@/api/modules/data";

/**
 * Timer
 */
export class Timer extends DatavComponent {
	config = {
		iconStyle: {
			show: true,
			size: 1.2,
			color: "rgba(93,245,244,1)",
			marginRight: 6
		},
		time: {
			textStyle: {
				fontFamily: "Microsoft Yahei",
				fontSize: 18,
				color: "#fff",
				fontWeight: "normal"
			},
			format: "YYYY-MM-DD HH:mm:ss",
			duration: 1000,
			horizontal: "center",
			vertical: "center"
		}
	};

	apis: Partial<ApiConfigMap>;
	apiData: Partial<ApiDataConfigMap>;

	events: Record<string, any>;

	actions: Record<string, any>;

	constructor() {
		super("Timer", { w: 300, h: 56 });

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

export default Timer;
