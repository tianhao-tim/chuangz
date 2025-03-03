import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";

import BasicArea from "./src/index.vue";
import { loadAsyncComponent } from "@/utils/asyncComponent";

BasicArea.install = (app: App): void => {
	app.component("VBasicArea", BasicArea);
	app.component(
		"VBasicAreaProp",
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default BasicArea as SFCWithInstall<typeof BasicArea>;
