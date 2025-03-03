import { PosterWidget, PosterWidgetType } from "@/views/poster/editor/types/poster";

export class TextWidget extends PosterWidget {
	/**
	 * 文本
	 */
	text: string;
	/**
	 * 字体大小
	 */
	fontSize: number;
	/**
	 * 字体名称
	 */
	fontName: string;
	/**
	 * 字体颜色
	 */
	color: string;
	/**
	 * 旋转
	 */
	rotate: number;
	/**
	 * 对齐方式
	 */
	lineAlign: string;
	/**
	 * 字间距
	 */
	space: number;
	/**
	 * 删除线
	 */
	strikeThrough: boolean;
	/**
	 * 行高
	 */
	lineHeight: number;
}

export const textWidgetConfig: TextWidget = {
	center: false,
	color: "#000000",
	fontName: "Alibaba-PuHuiTi-Regular",
	fontSize: 30,
	lineAlign: "",
	lineHeight: 20,
	rotate: 0,
	space: 0,
	strikeThrough: false,
	text: "我是文本",
	height: 40,
	width: 120,
	x: 10,
	y: 10,
	type: PosterWidgetType.TEXT,
	id: "",
	name: "文本",
	alpha: 1,
	active: true
};
