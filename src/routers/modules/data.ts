import { RouteRecordRaw } from "vue-router";

// 首页模块
const dashboardRouter: Array<RouteRecordRaw> = [
	{
		path: "/data/",
		name: "Data",
		component: () => import("@/views/home/index.vue"),
		children: [
			{
				path: "dataSource",
				name: "DataSourceManage",
				props: true,
				component: () => import("@/views/data/datasource/index.vue")
			},
			{
				path: "form",
				name: "formDataManage",
				props: true,
				component: () => import("@/views/data/form/index.vue")
			}
		]
	}
];

export default dashboardRouter;
