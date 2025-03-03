import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";

import WaterLevelPond from "./src/index.vue";
import { loadAsyncComponent } from "@/utils/asyncComponent";

WaterLevelPond.install = (app: App): void => {
	app.component(WaterLevelPond.name, WaterLevelPond);
	app.component(
		`${WaterLevelPond.name}Prop`,
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default WaterLevelPond as SFCWithInstall<typeof WaterLevelPond>;
