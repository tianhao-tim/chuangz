import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";

import PercentPond from "./src/index.vue";
import { loadAsyncComponent } from "@/utils/asyncComponent";

PercentPond.install = (app: App): void => {
	app.component(PercentPond.name, PercentPond);
	app.component(
		`${PercentPond.name}Prop`,
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default PercentPond as SFCWithInstall<typeof PercentPond>;
