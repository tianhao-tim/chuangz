import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";

import BasicMap from "./src/index.vue";
import { loadAsyncComponent } from "@/utils/asyncComponent";

BasicMap.install = (app: App): void => {
	app.component("VBasicMap", BasicMap);
	app.component(
		"VBasicMapProp",
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default BasicMap as SFCWithInstall<typeof BasicMap>;
