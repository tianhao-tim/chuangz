import { generateId } from "@/utils";
import { ApiConfigMap, ApiDataConfigMap } from "@/datav/types/data-source";
import { GlobalThemeJsonType } from "@/views/dashboard/components/chartThemes";

/**
 * 组件属性
 */
export class ComponentAttr {
	// x轴坐标
	x: number;
	// y轴坐标
	y: number;
	// 宽度
	w: number;
	// 高度
	h: number;
	// 顺序
	i: number;
}

export abstract class DashboardComponent extends ComponentAttr {
	/**
	 * 组件id
	 */
	id: string;
	/**
	 * 组件名称
	 */
	name?: string;
	/**
	 * 组件名称
	 */
	componentName: string;
	/**
	 * 组件类型
	 */
	componentType: ComponentType = ComponentType.ECHARTS;

	/**
	 * 通用基础配置
	 */
	basicConfig: Partial<BasicConfig> = {
		backgroundColor: "#FFFFFF"
	};
	/**
	 * 组件配置
	 */
	abstract config: Record<string, any> | GlobalThemeJsonType;

	abstract apis: Partial<ApiConfigMap>;
	abstract apiData: Partial<ApiDataConfigMap>;

	/**
	 * 事件
	 */
	abstract events: Record<string, any>;

	/**
	 * 初始化数据
	 */
	abstract initData(): this;

	protected constructor(componentName: string, attr: ComponentAttr) {
		super();
		this.id = generateId(componentName);
		this.componentName = componentName;
		this.x = attr.x;
		this.y = attr.y;
		this.w = attr.w;
		this.h = attr.h;
		this.i = attr.i;
	}
}

export type BasicConfig = {
	/**
	 * 背景颜色
	 */
	backgroundColor: string;
};

export enum ComponentType {
	/**
	 * 图标组件
	 */
	ECHARTS = "charts",
	/**
	 * 基础组件
	 */
	BASIC = "basic",
	/**
	 * 布局
	 */
	LAYOUT = "layout",
	/**
	 * 数据
	 */
	DATA = "data",
	/**
	 * 主业
	 */
	HOME = "home"
}
