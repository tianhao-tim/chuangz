import { RouteRecordRaw } from "vue-router";

// 首页模块
const dashboardRouter: Array<RouteRecordRaw> = [
	{
		path: "/dashboard/",
		name: "Dashboard",
		component: () => import("@/views/home/index.vue"),
		children: [
			{
				path: "list",
				name: "DashboardManage",
				props: true,
				component: () => import("@/views/dashboard/manage/index.vue")
			}
		]
	},
	{
		path: "/dashboard/editor",
		name: "DashboardEditor",
		props: true,
		component: () => import("@/views/dashboard/editor/index.vue")
	},
	{
		path: "/dashboard/s/:shareKey",
		name: "DashboardShare",
		props: true,
		component: () => import("@/views/dashboard/share/index.vue")
	}
];

export default dashboardRouter;
