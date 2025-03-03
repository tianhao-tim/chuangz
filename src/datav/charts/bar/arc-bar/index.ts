import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";
import { loadAsyncComponent } from "@/utils/asyncComponent";
import VAcrBar from "./src/index.vue";

VAcrBar.install = (app: App): void => {
	app.component(VAcrBar.name, VAcrBar);
	app.component(
		"VArcBarProp",
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default VAcrBar as SFCWithInstall<typeof VAcrBar>;
