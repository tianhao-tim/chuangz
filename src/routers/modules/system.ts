import { RouteRecordRaw } from "vue-router";

// 首页模块
const posterRouter: Array<RouteRecordRaw> = [
	{
		path: "/sys",
		name: "System",
		component: () => import("@/views/home/index.vue"),
		children: [
			{
				path: "profile",
				name: "SystemProfile",
				props: true,
				component: () => import("@/views/system/user/profile/index.vue")
			},
			{
				path: "ossconfig",
				name: "OssConfig",
				props: true,
				component: () => import("@/views/system/config/OssConfig.vue")
			}
		]
	}
];

export default posterRouter;
