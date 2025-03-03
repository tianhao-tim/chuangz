import { defineStore } from "pinia";
import { debounce } from "lodash-es";
import { Screen } from "@/datav/types/project";
import { MoveType, PageConfig } from "@/datav/types/editor";
import { DatavComponent } from "@/datav/types/datav-component";
import { calcIntersectingLines } from "@/utils/intersectingLine";
import { findComIndex, useComStore } from "./com";
// import {useEventStore} from './event'
import { getScreenByKey } from "@/api/modules/screen";

/**
 * 对齐线
 */
export interface AlignLine {
	top: number;
	bottom: number;
	left: number;
	right: number;
	vertical: number;
	horizontal: number;
	enable: boolean;
	show: boolean;
}

export interface IEditorState {
	editMode: boolean;
	screen: Partial<Screen>;
	pageConfig: PageConfig;
	canvas: {
		scale: number;
		width: number;
		height: number;
	};
	guideLine: {
		h: number[];
		v: number[];
	};
	referLine: {
		enable: boolean;
	};
	alignLine: AlignLine;
	contextMenu: {
		show: boolean;
	};
	isNormalResizeMode: boolean;
}

export const useEditorStore = defineStore("editor", {
	state: (): IEditorState => ({
		editMode: false,
		screen: {
			id: 0,
			name: "",
			status: 0,
			thumbnail: "",
			groupId: null
		},
		pageConfig: {
			width: 1920,
			height: 1080,
			bgimage: window.location.origin + "/datav/bj.png",
			bgcolor: "",
			grid: 8,
			screenshot: "",
			zoomMode: 1,
			useWatermark: true
		},
		canvas: {
			scale: 0.2,
			width: 1920,
			height: 1080
		},
		guideLine: {
			h: [],
			v: []
		},
		referLine: {
			enable: true
		},
		alignLine: {
			enable: false,
			show: false,
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			vertical: 0,
			horizontal: 0
		},
		contextMenu: {
			show: false
		},
		isNormalResizeMode: true
	}),
	actions: {
		setEditMode() {
			this.editMode = true;
		},
		calcAlignLine(com: DatavComponent) {
			if (!this.alignLine.enable) {
				return;
			}

			const comStore = useComStore();
			const attr = calcIntersectingLines(com, comStore.coms, this.canvas.scale);
			this.alignLine = { ...this.alignLine, ...attr, show: true };
		},
		hideAlignLine(id: string) {
			if (!this.alignLine.enable) {
				return;
			}

			const comStore = useComStore();
			if (this.alignLine.show) {
				this.alignLine.show = false;
				comStore.selectCom(id);
			}
		},
		moveCom(id: string, moveType: MoveType) {
			const comStore = useComStore();
			const i = findComIndex(comStore.coms, id);
			if (moveType === MoveType.up) {
				if (i + 1 < comStore.coms.length) {
					comStore.coms.splice(i + 1, 0, ...comStore.coms.splice(i, 1));
				}
			} else if (moveType === MoveType.down) {
				if (i > 0) {
					comStore.coms.splice(i - 1, 0, ...comStore.coms.splice(i, 1));
				}
			} else if (moveType === MoveType.top) {
				if (i + 1 < comStore.coms.length) {
					comStore.coms.push(...comStore.coms.splice(i, 1));
				}
			} else if (moveType === MoveType.bottom) {
				if (i > 0) {
					comStore.coms.unshift(...comStore.coms.splice(i, 1));
				}
			}
		},
		setEditorOption(payload: {
			screen?: Partial<Screen>;
			config?: Partial<PageConfig>;
			guideLine?: {
				h: number[];
				v: number[];
			};
		}) {
			if (payload.screen) {
				this.screen = { ...this.screen, ...payload.screen };
			}

			if (payload.config) {
				this.pageConfig = { ...this.pageConfig, ...payload.config };
			}

			if (payload.guideLine) {
				this.guideLine = { ...payload.guideLine };
			}
		},
		async autoCanvasScale(payload: () => { offsetX: number; offsetY: number }) {
			const resize = debounce(() => {
				const offset = payload();
				const width = document.documentElement.clientWidth - offset.offsetX;
				const height = document.documentElement.clientHeight - 42 - 32 - offset.offsetY;

				const a = (width - 120) / this.pageConfig.width;
				const b = (height - 140) / this.pageConfig.height;
				const scale = parseFloat((a > b ? b : a).toFixed(6)) * 100;

				this.setCanvasScale(scale, offset.offsetX, offset.offsetY);
			}, 200);

			window.onresize = resize;

			resize();
		},
		async setCanvasScale(scale: number, offsetX: number, offsetY: number) {
			let width = document.documentElement.clientWidth - offsetX;
			let height = document.documentElement.clientHeight - 42 - 32 - offsetY;
			const deltaS = Math.min(Math.max(scale, 10), 200) / 100;

			// 方便计算滚动条 和 标尺
			const deltaW = this.pageConfig.width * deltaS;
			const deltaH = this.pageConfig.height * deltaS;
			if (width < deltaW) {
				width = deltaW + 400;
			}

			if (height < deltaH) {
				height = deltaH + 400;
			}

			this.canvas = { scale: deltaS, width, height };
		},
		/**
		 * 加载大屏数据
		 * @param screenKey
		 */
		async loadScreen(screenKey: string) {
			const comStore = useComStore();
			const { data } = await getScreenByKey(screenKey);
			const { config } = data;
			this.setEditorOption({
				screen: {
					id: data.id,
					shareKey: data.shareKey,
					name: data.name
				},
				config: config
					? {
							bgcolor: config.bgcolor,
							width: config.width,
							height: config.height,
							bgimage: config.bgimage,
							screenshot: config.screenshot,
							zoomMode: config.zoomMode,
							useWatermark: config.useWatermark,
							grid: config.grid
					  }
					: null
			});
			comStore.setComs(data.coms || []);
			// const { componentsView, publishersView, subscribersView } = config.variables
			// eventStore.$patch({ componentsView, publishersView, subscribersView })
		}
	}
});
