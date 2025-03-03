import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";

import BasicMap from "./src/index.vue";
import { loadAsyncComponent } from "@/utils/asyncComponent";

BasicMap.install = (app: App): void => {
	app.component("VcesiumMap", BasicMap);
/*	app.component(
		"VcesiumMapProp",
		loadAsyncComponent(() => import("./src/config.vue"))
	);*/
};

export default BasicMap as SFCWithInstall<typeof BasicMap>;
