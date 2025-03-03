import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";

import BasicLine from "./src/index.vue";
import { loadAsyncComponent } from "@/utils/asyncComponent";

BasicLine.install = (app: App): void => {
	app.component("VBasicLine", BasicLine);
	app.component(
		"VBasicLineProp",
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default BasicLine as SFCWithInstall<typeof BasicLine>;
