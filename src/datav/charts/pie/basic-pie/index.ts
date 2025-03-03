import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";

import BasicPie from "./src/index.vue";
import { loadAsyncComponent } from "@/utils/asyncComponent";

BasicPie.install = (app: App): void => {
	app.component("VBasicPie", BasicPie);
	app.component(
		"VBasicPieProp",
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default BasicPie as SFCWithInstall<typeof BasicPie>;
