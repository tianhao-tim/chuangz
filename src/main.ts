import { createApp } from "vue";
import router from "./routers";
import App from "./App.vue";
import { Ion } from "cesium";
import "cesium/Widgets/widgets.css";

Ion.defaultAccessToken =
	 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZGNiYTQ2NS00MWUzLTQyMWQtYmYxNi0yYTIxZmQyNGM4NjMiLCJpZCI6MjQ3MDEyLCJpYXQiOjE3Mjg1MjIxNjZ9.baFLM5qDLTUMULTUgB52uEHnf8kfZnKvXHtwObEK8-s"
//按需导入部分样式不生效 如message等 重新导入一次
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/assets/styles/index.scss";

// element plus
import ElementPlus from "element-plus";
// element icons
import * as Icons from "@element-plus/icons-vue";
// pinia store
import pinia from "@/store/index";
import GUI from "@/components/UI";
import DatavCharts from "@/datav/charts/index";
// Custom directives
import directives from "@/directives/index";
// GridLayout
import GridLayout from "vue3-drr-grid-layout";
import "vue3-drr-grid-layout/dist/style.css";

const app = createApp(App);
// 注册element Icons组件
Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons]);
});
app.use(GUI);
app.use(DatavCharts);
app.use(directives);
app.use(pinia);
app.use(router);
app.use(GridLayout);
app.use(ElementPlus);

app.mount("#app");
