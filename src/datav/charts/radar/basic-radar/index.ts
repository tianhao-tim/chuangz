import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";

import BasicRadar from "./src/index.vue";
import { loadAsyncComponent } from "@/utils/asyncComponent";

BasicRadar.install = (app: App): void => {
	app.component(BasicRadar.name, BasicRadar);
	app.component(
		"VBasicRadarProp",
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default BasicRadar as SFCWithInstall<typeof BasicRadar>;
