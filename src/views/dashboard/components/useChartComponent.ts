import { useDashboardStore } from "@/store/modules/dashboard";
import { useRoute } from "vue-router";

const dashboardStore = useDashboardStore();

/**
 * 编辑器选中这个组件
 * @param item
 */
export const handleItemClick = (item: any) => {
	console.log("handleItemClick", item);
	dashboardStore.selectComponent(item);
};

// 在设计模式下面 获取当前路由 判断是否包含editor
export const isDesignMode = () => {
	const route = useRoute();
	return route.path.includes("editor");
};
