import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";
import { loadAsyncComponent } from "@/utils/asyncComponent";
import DvDecoration from "./src/index.vue";

DvDecoration.install = (app: App): void => {
	app.component("VDvDecoration", DvDecoration);
	app.component(
		"VDvDecorationProp",
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default DvDecoration as SFCWithInstall<typeof DvDecoration>;
