import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";

import Marquee from "./src/index.vue";
import { loadAsyncComponent } from "@/utils/asyncComponent";

Marquee.install = (app: App): void => {
	app.component(Marquee.name, Marquee);
	app.component(
		"VMarqueeProp",
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default Marquee as SFCWithInstall<typeof Marquee>;
