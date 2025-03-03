import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";

import ConicalColumnChart from "./src/index.vue";
import { loadAsyncComponent } from "@/utils/asyncComponent";

ConicalColumnChart.install = (app: App): void => {
	app.component(ConicalColumnChart.name, ConicalColumnChart);
	app.component(
		`${ConicalColumnChart.name}Prop`,
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default ConicalColumnChart as SFCWithInstall<typeof ConicalColumnChart>;
