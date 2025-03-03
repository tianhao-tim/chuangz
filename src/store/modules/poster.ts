import { defineStore } from "pinia";
import { Poster, PosterFileType, PosterWidget } from "@/views/poster/editor/types/poster";
import { generateId } from "@/utils";
import { getPosterByKey } from "@/api/modules/poster";

export interface EditorPosterState {
	/**
	 * 海报配置
	 */
	posterConfig: Poster;
	/**
	 * 组件列表
	 */
	posterWidgetList: PosterWidget[];
	/**
	 * 缩放大小
	 */
	zoomSize: number;
	/**
	 * 选中的组件
	 */
	selectedWidget: PosterWidget;
}

export const usePosterStore = defineStore("poster", {
	state: (): EditorPosterState => ({
		posterConfig: {
			id: null,
			name: "",
			posterBgColor: "#FFFFFF",
			posterBgImage: "",
			posterFileType: PosterFileType.PNG,
			width: 750,
			height: 1334,
			posterKey: ""
		},
		/**
		 * 组件列表
		 */
		posterWidgetList: [],
		zoomSize: 50,
		selectedWidget: null
	}),
	actions: {
		/**
		 * 加载海报数据
		 * @param posterKey  海报唯一标识
		 */
		async loadPoster(posterKey: string) {
			const { data } = await getPosterByKey(posterKey);
			let { posterConfig, posterWidgetList } = data;
			if (posterConfig) {
				this.posterConfig = { ...this.posterConfig, ...posterConfig, ...data };
			}
			this.posterWidgetList = posterWidgetList || [];
			console.log(this.posterConfig);
		},
		/*
		/**
		 * 增加海报组件
		 */
		addPosterWidget(posterWidget: PosterWidget) {
			this.posterWidgetList.push(posterWidget);
		},
		/**
		 * 选中组件
		 */
		activePosterWidget(widget: PosterWidget) {
			if (widget) {
				// 取消之前选中的组件
				this.posterWidgetList.filter(item => item.active && item.id !== widget.id).forEach(item => (item.active = false));
			}
			this.selectedWidget = widget;
		},
		/**
		 * 取消选中组件
		 */
		cancelActivePosterWidget() {
			this.posterWidgetList.filter(item => item.active).forEach(item => (item.active = false));
			this.selectedWidget = null;
		},
		/***
		 * 删除组件
		 */
		deletePosterWidget(widget: PosterWidget) {
			this.posterWidgetList = this.posterWidgetList.filter(item => item.id !== widget.id);
		},
		/**
		 * 复制组件
		 */
		copyPosterWidget(widget: PosterWidget) {
			const newWidget = JSON.parse(JSON.stringify(widget));
			newWidget.id = generateId();
			newWidget.x += 100;
			newWidget.y += 100;
			this.posterWidgetList.push(newWidget);
		}
	}
});
