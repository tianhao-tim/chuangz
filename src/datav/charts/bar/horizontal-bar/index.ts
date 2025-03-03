import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";
import VHorizontalBar from "./src/index.vue";
import VHorizontalBarProp from "./src/config.vue";
import { loadAsyncComponent } from "@/utils/asyncComponent";

VHorizontalBar.install = (app: App): void => {
	app.component(VHorizontalBar.name, VHorizontalBar);
	app.component(
		VHorizontalBarProp.name,
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default VHorizontalBar as SFCWithInstall<typeof VHorizontalBar>;
