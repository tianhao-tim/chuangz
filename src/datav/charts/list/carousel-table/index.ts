import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";

import CarouselTable from "./src/index.vue";
import { loadAsyncComponent } from "@/utils/asyncComponent";

CarouselTable.install = (app: App): void => {
	app.component(CarouselTable.name, CarouselTable);
	app.component(
		`${CarouselTable.name}Prop`,
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default CarouselTable as SFCWithInstall<typeof CarouselTable>;
