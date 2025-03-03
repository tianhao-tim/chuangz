import { DatavComponent } from "@/datav/types/datav-component";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { getStaticData } from "@/api/modules/data";

/**
 * 轮播表 # https://datav-vue3.netlify.app/#/components/ScrollBoard
 */
export class CarouselTable extends DatavComponent {
	config = {
		header: [] as string[],
		data: [] as Object[],
		rowNum: 5,
		headerBGC: "#00BAFF",
		oddRowBGC: "#003B51",
		evenRowBGC: "#0A2732",
		waitTime: 2000,
		headerHeight: 35,
		columnWidth: [] as Array<Number>,
		align: [] as Array<String>,
		index: false,
		indexHeader: "#",
		carousel: "single",
		hoverPause: true,
		indexWidth: 50, // 行号宽度
		indexAlign: "center" // 行号对齐
	};

	apis: Partial<ApiConfigMap>;
	apiData: Partial<ApiDataConfigMap>;

	events: Record<string, any>;

	actions: Record<string, any>;

	constructor() {
		super("CarouselTable", { w: 500, h: 300 });

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
			const path = "list/carousel-table";
			const res = await getStaticData(this.id, path);
			this.apiData.source.config.data = JSON.stringify(res.data);
		} catch (error) {
			throw error;
		}
	}
}

export default CarouselTable;
