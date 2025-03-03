import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";
import { loadAsyncComponent } from "@/utils/asyncComponent";
import Decoration from "./src/index.vue";

Decoration.install = (app: App): void => {
	app.component(Decoration.name, Decoration);
	app.component(
		"VDecorationProp",
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default Decoration as SFCWithInstall<typeof Decoration>;
