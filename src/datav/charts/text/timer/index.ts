import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";

import Timer from "./src/index.vue";
import { loadAsyncComponent } from "@/utils/asyncComponent";

Timer.install = (app: App): void => {
	app.component(Timer.name, Timer);
	app.component(
		"VTimerProp",
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default Timer as SFCWithInstall<typeof Timer>;
