import { DatavComponent } from "@/datav/types/datav-component";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { getStaticData } from "@/api/modules/data";

/**
 * MainTitle
 */
export class MainTitle extends DatavComponent {
	config = {
		title: "我是标题数据",
		textStyle: {
			fontFamily: "Microsoft Yahei",
			fontSize: 24,
			color: "#fff",
			fontWeight: "normal"
		},
		textAlign: "center",
		writingMode: "horizontal-tb",
		letterSpacing: 0,
		backgroundStyle: {
			show: false,
			bgColor: "#008bff",
			borderRadius: 15,
			borderColor: "#fff",
			borderStyle: "solid",
			borderWidth: 1
		},
		ellipsis: false,
		urlConfig: {
			url: "",
			isBlank: false
		}
	};

	apis: Partial<ApiConfigMap>;
	apiData: Partial<ApiDataConfigMap>;

	events: Record<string, any>;

	actions: Record<string, any>;

	constructor() {
		super("MainTitle", { w: 300, h: 56 });
		this.initData();
	}

	initData() {
		// const fields = [
		//   createField('title', { description: '标题值', optional: true }),
		//   createField('url', { description: '超链接', optional: true }),
		// ]
		//
		this.apis = initApiConfig({});
		this.apiData = initApiData(this.id);
		this.apiData.source.config.notSupportForm = true;
		this.events = {};
		this.actions = {};

		return this;
	}

	async loadData() {
		try {
			const path = "text/main-title";
			const res = await getStaticData(this.id, path);
			this.apiData.source.config.data = JSON.stringify(res.data);
		} catch (error) {
			throw error;
		}
	}
}

export default MainTitle;
