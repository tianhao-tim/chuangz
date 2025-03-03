import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";

import WordCloud from "./src/index.vue";
import { loadAsyncComponent } from "@/utils/asyncComponent";

WordCloud.install = (app: App): void => {
	app.component(WordCloud.name, WordCloud);
	app.component(
		"VWordCloudProp",
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default WordCloud as SFCWithInstall<typeof WordCloud>;
