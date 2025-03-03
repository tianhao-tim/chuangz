import { DatavComponent } from "@/datav/types/datav-component";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";

/**
 * BasicMap
 */
export class BasicMap extends DatavComponent {
	constructor() {
		super("cesiumMap", { w: 500, h: 300 });
	}
}

export default BasicMap;
