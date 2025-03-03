import router from "@/routers/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useGlobalStore } from "@/store";
import { NextLoading } from "@/utils/loading";
import { AxiosCanceler } from "@/api/helper/axiosCancel";

const axiosCanceler = new AxiosCanceler();

NProgress.configure({
	easing: "ease", // 动画方式
	speed: 500, // 递增进度条的速度
	showSpinner: true, // 是否显示加载ico
	trickleSpeed: 200, // 自动递增间隔
	minimum: 0.3 // 初始化时的最小百分比
});

// 界面 loading 动画开始执行
if (window.nextLoading === undefined) NextLoading.start();

// * 路由拦截
router.beforeEach((to, from, next) => {
	NProgress.start();
	// * 在跳转路由之前，清除所有的请求
	axiosCanceler.removeAllPending();

	// * 判断当前路由是否需要访问权限
	if (!to.matched.some(record => record.meta.requiresAuth)) return next();

	// * 判断是否有Token
	const globalStore = useGlobalStore();
	if (!globalStore.token) {
		next({
			path: "/user/login"
		});
		NProgress.done();
		return;
	}
});

router.afterEach(() => {
	NProgress.done();
	NextLoading.done();
});

export default router;
