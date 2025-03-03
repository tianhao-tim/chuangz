export enum ZoomMode {
	/**
	 * 全屏铺满
	 */
	auto,
	/**
	 * 等比缩放宽度铺满
	 */
	width,
	/**
	 * 等比缩放高度铺满
	 */
	height,
	/**
	 * 等比缩放高度铺满并且可以左右移动
	 */
	full,
	/**
	 * 不缩放
	 */
	disabled
}

export interface PageVariable {
	/**
	 * 定义事件中 emit 出的变量
	 */
	componentsView: {
		[key: string]: {
			[key: string]: {
				enable: boolean;
				fields: Record<string, string>;
			};
		};
	};
	/**
	 * 发布事件的组件
	 *
	 * 形如: { [变量名]: [组件id, ...] }
	 */
	publishersView: Record<string, string[]>;
	/**
	 * 订阅事件的组件
	 *
	 * 形如: { [变量名]: [组件id, ...] }
	 */
	subscribersView: Record<string, string[]>;
}

export interface PageConfig {
	width: number;
	height: number;
	bgcolor: string;
	bgimage: string;
	grid: number;
	screenshot: string;
	zoomMode: ZoomMode;
	useWatermark: boolean;
}
export enum MoveType {
	up,
	down,
	top,
	bottom
}
