import { PosterWidget, PosterWidgetType } from "@/views/poster/editor/types/poster";

export class QrcodeWidget extends PosterWidget {
	/**
	 * 二维码内容
	 */
	url: string;
	/**
	 * 背景颜色
	 */
	bgColor: string;
	/**
	 * 前景颜色
	 */
	fgColor: string;
	/**
	 * 二维码大小
	 */
	size: number;
	/**
	 * 二维码边距
	 */
	margin: number;
	/**
	 * 二维码等级
	 */
	level: string;
}

export const qrcodeWidgetConfig: QrcodeWidget = {
	bgColor: "#ffffff",
	fgColor: "#000000",
	level: "H",
	margin: 0,
	size: 100,
	url: "https://pro.tduckcloud.com/",
	center: false,
	height: 100,
	width: 100,
	x: 10,
	y: 10,
	type: PosterWidgetType.QRCODE,
	id: "",
	name: "二维码",
	alpha: 1,
	active: true
};
