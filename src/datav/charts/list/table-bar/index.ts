import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";

import TableBar from "./src/index.vue";
import { loadAsyncComponent } from "@/utils/asyncComponent";

TableBar.install = (app: App): void => {
	app.component(TableBar.name, TableBar);
	app.component(
		`${TableBar.name}Prop`,
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default TableBar as SFCWithInstall<typeof TableBar>;
