import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";

import BasicRing from "./src/index.vue";
import { loadAsyncComponent } from "@/utils/asyncComponent";

BasicRing.install = (app: App): void => {
	app.component(BasicRing.name, BasicRing);
	app.component(
		`${BasicRing.name}Prop`,
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default BasicRing as SFCWithInstall<typeof BasicRing>;
