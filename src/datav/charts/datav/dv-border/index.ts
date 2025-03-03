import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";
import { loadAsyncComponent } from "@/utils/asyncComponent";
import DvBorder from "./src/index.vue";

DvBorder.install = (app: App): void => {
	app.component("VDvBorder", DvBorder);
	app.component(
		"VDvBorderProp",
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default DvBorder as SFCWithInstall<typeof DvBorder>;
