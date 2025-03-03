import { DatavComponent } from "@/datav/types/datav-component";
import { ApiConfigMap, ApiDataConfigMap } from "@/datav/types/data-source";

/**
 * DvBorder
 */
export class DvBorder extends DatavComponent {
	config = {
		number: 0
	};

	apis: Partial<ApiConfigMap>;
	apiData: Partial<ApiDataConfigMap>;

	events: Record<string, any>;

	actions: Record<string, any>;

	constructor(number: number) {
		super("DvBorder" + number, { w: 300, h: 180 });
		this.config.number = number;
		this.name = `VDvBorder`;
		this.initData();
	}

	initData() {
		this.apis = {};
		this.apiData = {};
		this.events = {};
		this.actions = {};

		return this;
	}

	async loadData() {}
}

export default DvBorder;
