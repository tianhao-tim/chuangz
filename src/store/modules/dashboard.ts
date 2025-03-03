import { defineStore } from "pinia";
import { DashboardPage } from "@/views/dashboard/editor/types";
import { getDashboardByKey, updateDashboard } from "@/api/modules/dashboard";

interface EditorDashboardPage extends DashboardPage {
	/**
	 * 选中的组件
	 */
	selectedComponent?: any;
	/**
	 *选中组件Id
	 */
	selectedComponentId?: string;
	/**
	 * 是否编辑未保存
	 */
	isEditNoSave?: boolean;
}

const defaultPageConfig = {
	name: "",
	bgColor: "#FFFFFF",
	bgImage: "",
	waterMarkText: "",
	themeStyle: "dark"
};

export const useDashboardStore = defineStore("dashboard", {
	state: (): EditorDashboardPage => ({
		id: null,
		pageConfig: defaultPageConfig,
		componentList: [],
		selectedComponent: null,
		selectedComponentId: ""
	}),
	actions: {
		/**
		 * 加载仪表盘
		 * @param dashboardKey 仪表盘Id
		 */
		async loadDashboard(dashboardKey: string) {
			const { data } = await getDashboardByKey(dashboardKey);
			let { pageConfig, componentList } = data;
			if (!pageConfig) {
				pageConfig = { name: data.name, layoutMode: data.layoutMode };
			}
			this.id = data.id;
			this.pageConfig = { ...defaultPageConfig, ...pageConfig };
			this.componentList = componentList || [];
		},
		/**
		 * 保存仪表盘
		 */
		async saveDashboard() {
			let obj = {
				id: this.id,
				name: this.pageConfig.name,
				pageConfig: this.pageConfig,
				componentList: this.componentList
			};
			await updateDashboard(obj);
		},
		/**
		 *  添加组件
		 * @param component
		 */
		addComponent(component: any) {
			const lastGridItem = this.componentList[this.componentList.length - 1];
			// 最高Y轴的组件
			const maxYGridItem = this.componentList.length
				? this.componentList.reduce((prev, cur) => {
						return prev.y > cur.y ? prev : cur;
				  })
				: null;
			if (lastGridItem) {
				const newIndex = lastGridItem.i + 1;
				const { x } = lastGridItem;
				const { y } = maxYGridItem;
				// 一行12个格子
				// 计算最后一行已经使用多少个格子
				const usedColNum = this.componentList
					.filter(c => c.y >= y || c.y + c.h > y)
					.map(c => c.w)
					.reduce((a, b) => a + b);
				// 当前行是否满 累加大于12 把当前行的宽全部加起来 如果大于12 则换行 或者不足以放下新加入的组件
				const isFullLine = usedColNum >= 12 || usedColNum + component.w > 12;
				const newY = isFullLine ? y + component.h : y;
				let newX = isFullLine ? 0 : x + lastGridItem.w;
				// 如果最后一个不是最高的元素
				if (lastGridItem.i !== maxYGridItem.i) {
					newX = isFullLine ? 0 : maxYGridItem.x + maxYGridItem.w;
				}
				let newGridItem = { x: newX, y: newY, w: component.w, h: component.h, i: newIndex };
				component = { ...component, ...newGridItem };
			}
			this.componentList.push(component);
		},
		/**
		 * 删除组件
		 */
		deleteComponent(component: any) {
			const index = this.componentList.findIndex(c => c.id === component.id);
			this.componentList.splice(index, 1);
			if (this.selectedComponentId === component.id) {
				this.selectedComponentId = null;
				this.selectedComponent = null;
			}
		},
		/**
		 * 选择组件
		 */
		selectComponent(component: any) {
			this.selectedComponent = component;
			this.selectedComponentId = component ? component.id : null;
		}
	}
});
