import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// * 导入所有router
const metaRouters = import.meta.glob("./modules/*.ts", { eager: true }) as any;

// * 处理路由
export const routerArray: RouteRecordRaw[] = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key: any) => {
		routerArray.push(...metaRouters[item][key]);
	});
});

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: { name: "home" }
	},
	{
		path: "/user/login",
		name: "login",
		component: () => import("@/views/login/index.vue"),
		meta: {
			requiresAuth: false,
			title: "登录页"
		}
	},
	{
		path: "/test",
		name: "test",
		component: () => import("@/views/test/test01.vue"),
		meta: {
			requiresAuth: false,
			title: "测试"
		}
	},
	{
		path: "/home",
		name: "home",
		component: () => import("@/views/home/index.vue"),
		meta: {
			requiresAuth: false,
			title: "主页"
		}
	},
	...routerArray,
	{
		// 找不到路由重定向到404页面
		path: "/:pathMatch(.*)",
		redirect: { name: "404" }
	}
];

const baseUrl = import.meta.env.VITE_ROUTER_BAE_PATH || "/";

const router = createRouter({
	history: createWebHistory(baseUrl),
	routes,
	strict: false,
	// 切换页面，滚动到最顶部
	scrollBehavior: () => ({ left: 0, top: 0 })
});

export default router;
