import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";

import Paragraph from "./src/index.vue";
import { loadAsyncComponent } from "@/utils/asyncComponent";

Paragraph.install = (app: App): void => {
	app.component(Paragraph.name, Paragraph);
	app.component(
		"VParagraphProp",
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default Paragraph as SFCWithInstall<typeof Paragraph>;
