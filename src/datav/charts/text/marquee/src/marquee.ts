import { DatavComponent } from "@/datav/types/datav-component";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { getStaticData } from "@/api/modules/data";

/**
 * Marquee
 */
export class Marquee extends DatavComponent {
	config = {
		textStyle: {
			fontFamily: "Microsoft Yahei",
			fontSize: 18,
			color: "#fff",
			fontWeight: "normal"
		},
		loop: true,
		ifSpeed: false,
		duration: 8000,
		speed: 1000,
		timeout: 1000
	};

	apis: Partial<ApiConfigMap>;
	apiData: Partial<ApiDataConfigMap>;

	events: Record<string, any>;

	actions: Record<string, any>;

	constructor() {
		super("Marquee", { w: 300, h: 56 });

		this.initData();
	}

	initData() {
		// const fields = [
		//   createField('value', { description: '值' }),
		// ]

		this.apis = initApiConfig({
			// fields: Object.assign({}, ...fields),
			description: "跑马灯接口"
		});

		this.apiData = initApiData(this.id);
		this.apiData.source.config.notSupportForm = true;
		this.events = {};
		this.actions = {};

		return this;
	}

	async loadData() {
		try {
			const path = "text/marquee";
			const res = await getStaticData(this.id, path);
			this.apiData.source.config.data = JSON.stringify(res.data);
		} catch (error) {
			throw error;
		}
	}
}

export default Marquee;
