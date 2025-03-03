export class Poster {
	id: number;
	/**
	 * 海报名称
	 */
	name: string;
	/**
	 * 标识
	 */
	posterKey: string;
	/**
	 * 图片格式
	 */
	posterFileType: PosterFileType;
	/**
	 * 背景颜色
	 */
	posterBgColor: string;
	/**
	 * 背景图片
	 */
	posterBgImage: string;
	/**
	 * 宽度
	 */
	width: number;
	/**
	 * 高度
	 */
	height: number;
}

/**
 * 文件格式
 */
export enum PosterFileType {
	PNG = "PNG",
	JPG = "JPG",
	JPEG = "JPEG",
	BPM = "BPM"
}

export enum PosterWidgetType {
	IMAGE = "IMAGE",
	TEXT = "TEXT",
	QRCODE = "QRCODE"
}

/**
 * 基础组件
 */
export class PosterWidget {
	id: string;

	name: string;
	/**
	 * x
	 */
	x: number;
	/**
	 * y
	 */
	y: number;
	/**
	 * 宽度
	 */
	width: number;
	/**
	 * 高度
	 */
	height: number;
	/**
	 * 是否居中
	 */
	center: boolean;
	/**
	 * 透明度
	 */
	alpha: number;
	/***
	 *  是否选中
	 */
	active: boolean;
	/**
	 * 类型
	 */
	type: PosterWidgetType;
}
