import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";

import GaugeChart from "./src/index.vue";
import { loadAsyncComponent } from "@/utils/asyncComponent";

GaugeChart.install = (app: App): void => {
	app.component(GaugeChart.name, GaugeChart);
	app.component(
		`${GaugeChart.name}Prop`,
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default GaugeChart as SFCWithInstall<typeof GaugeChart>;
