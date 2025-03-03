import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";
import { loadAsyncComponent } from "@/utils/asyncComponent";
import BgBox from "./src/index.vue";

BgBox.install = (app: App): void => {
	app.component(BgBox.name, BgBox);
	app.component(
		"VBgBoxProp",
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default BgBox as SFCWithInstall<typeof BgBox>;
