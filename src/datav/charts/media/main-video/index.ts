import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";
import { loadAsyncComponent } from "@/utils/asyncComponent";
import VMainVideo from "./src/index.vue";

VMainVideo.install = (app: App): void => {
	app.component(VMainVideo.name, VMainVideo);
	app.component(
		"VMainVideoProp",
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default VMainVideo as SFCWithInstall<typeof VMainVideo>;
