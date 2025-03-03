import type { App } from "vue";
import type { SFCWithInstall } from "@/utils/types";
import { loadAsyncComponent } from "@/utils/asyncComponent";
import NumberTitleFlop from "./src/index.vue";

NumberTitleFlop.install = (app: App): void => {
	app.component(NumberTitleFlop.name, NumberTitleFlop);
	app.component(
		"VNumberTitleFlopProp",
		loadAsyncComponent(() => import("./src/config.vue"))
	);
};

export default NumberTitleFlop as SFCWithInstall<typeof NumberTitleFlop>;
