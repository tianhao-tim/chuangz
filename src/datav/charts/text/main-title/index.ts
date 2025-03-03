import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";

import MainTitle from "./src/index.vue";
import { loadAsyncComponent } from "@/utils/asyncComponent";

MainTitle.install = (app: App) => {
	app.component(MainTitle.name, MainTitle);
	app.component(
		"VMainTitleProp",
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default MainTitle as SFCWithInstall<typeof MainTitle>;
