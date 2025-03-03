import { defineAsyncComponent, AsyncComponentLoader } from "vue";
import AsyncLoading from "@/components/UI/loading/src/async-loading.vue";

export const loadAsyncComponent = (loader: AsyncComponentLoader<any>) =>
	defineAsyncComponent({
		loader,
		loadingComponent: AsyncLoading,
		delay: 20
	});
