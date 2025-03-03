import { PosterWidget, PosterWidgetType } from "@/views/poster/editor/types/poster";

export class ImageWidget extends PosterWidget {
	/**
	 * 图片地址
	 */
	imgUrl: string;
	/**
	 * 圆角大小
	 */
	roundCorner: number;
	/**
	 * 缩放模式
	 */
	zoomMode: ZoomMode;
	/**
	 * 旋转
	 */
	rotate: number;
	/**
	 * 模糊
	 */
	blur: number;
}

export enum ZoomMode {
	/**
	 * 原始比例，不缩放
	 */
	Origin,
	/**
	 * 指定宽度，高度按比例自动计算
	 */
	Width,
	/**
	 * 指定高度，宽度按比例自动计算
	 */
	Height,
	/**
	 * 指定高度和宽度，强制缩放
	 */
	WidthHeight
}

export const imageWidgetConfig: ImageWidget = {
	center: false,
	blur: 0,
	imgUrl:
		"data:image/png;base64,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",
	roundCorner: 0,
	rotate: null,
	zoomMode: ZoomMode.Origin,
	height: 100,
	width: 100,
	x: 10,
	y: 10,
	type: PosterWidgetType.IMAGE,
	id: "",
	alpha: 1,
	name: "图片",
	active: true
};
