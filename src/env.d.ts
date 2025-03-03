/// <reference types="vite/client" />

declare module "*.vue" {
	import type { DefineComponent } from "vue";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

// 声明文件，定义全局变量。其它 app.config.globalProperties.xxx，使用 getCurrentInstance() 来获取
interface Window {
	nextLoading: boolean;
	tinymce: any;
}
