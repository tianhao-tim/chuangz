import { RouteRecordRaw } from "vue-router";

// 首页模块
const datavRouter: Array<RouteRecordRaw> = [
	{
		path: "/datav/screen/",
		name: "DatavScreen",
		component: () => import("@/views/home/index.vue"),
		children: [
			{
				path: "list",
				name: "ScreenManage",
				props: true,
				component: () => import("@/views/datav/manage/index.vue")
			},
			{
				path: "group",
				name: "ScreenManageGroup",
				props: true,
				component: () => import("@/views/datav/group/index.vue")
			}
		]
	},
	{
		path: "/design/screen/:screenKey",
		name: "DesignScreen",
		props: true,
		component: () => import("@/datav/screen-editor/index.vue")
	},
	{
		path: "/screen/:screenKey",
		name: "Screen",
		props: true,
		component: () => import("@/datav/screen/index.vue")
	}
];

export default datavRouter;
