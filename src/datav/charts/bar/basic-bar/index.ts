import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";
import BasicBar from "./src/index.vue";
import { loadAsyncComponent } from "@/utils/asyncComponent";

BasicBar.install = (app: App): void => {
	app.component(BasicBar.name, BasicBar);
	app.component(
		"VBasicBarProp",
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default BasicBar as SFCWithInstall<typeof BasicBar>;
