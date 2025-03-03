import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";
import { loadAsyncComponent } from "@/utils/asyncComponent";
import MainImg from "./src/index.vue";

MainImg.install = (app: App): void => {
	app.component(MainImg.name, MainImg);
	app.component(
		"VMainImgProp",
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default MainImg as SFCWithInstall<typeof MainImg>;
