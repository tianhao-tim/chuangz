import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";

import PieOneValue from "./src/index.vue";
import { loadAsyncComponent } from "@/utils/asyncComponent";

PieOneValue.install = (app: App): void => {
	app.component(PieOneValue.name, PieOneValue);
	app.component(
		`${PieOneValue.name}Prop`,
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default PieOneValue as SFCWithInstall<typeof PieOneValue>;
