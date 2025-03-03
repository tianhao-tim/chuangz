import { RouteRecordRaw } from "vue-router";

// 首页模块
const posterRouter: Array<RouteRecordRaw> = [
	{
		path: "/poster/",
		name: "Poster",
		component: () => import("@/views/home/index.vue"),
		children: [
			{
				path: "list",
				name: "PosterManage",
				props: true,
				component: () => import("@/views/poster/manage/index.vue")
			}
		]
	},
	{
		path: "/poster/editor",
		name: "PosterEditor",
		props: true,
		component: () => import("@/views/poster/editor/index.vue")
	},
	{
		path: "/poster/gen/:linkKey",
		name: "DataPosterGen",
		props: true,
		meta: {
			requiresAuth: false
		},
		component: () => import("@/views/poster/generate/FormDataPoster.vue")
	}
];

export default posterRouter;
