import { generateId } from "@/utils";
import { findComByName } from "@/datav/datav-components";
import { ApiConfigMap, ApiDataConfigMap } from "./data-source";

//图标组件定义结构
export enum ComType {
	com = "com",
	subCom = "subCom",
	layer = "layer"
}

export interface ComponentAttr {
	x: number;
	y: number;
	w: number;
	h: number;
	deg: number;
	opacity: number;
	filpV: boolean;
	filpH: boolean;
}

export abstract class DatavComponent {
	id: string;
	name: string;
	readonly type: ComType;

	alias: string;
	icon: string;
	img: string;

	locked = false;
	hided = false;

	// 以下几个状态可以不进行持久化，为了操作方便在此声明
	selected = false;
	hovered = false;
	renameing = false;

	attr: ComponentAttr = {
		x: 0,
		y: 0,
		w: 100,
		h: 100,
		deg: 0,
		opacity: 1,
		filpV: false,
		filpH: false
	};

	projectId = 0;
	parentId?: string;
	// children: DatavComponent[] | null = null

	abstract config: Record<string, any>;

	abstract apis: Partial<ApiConfigMap>;
	abstract apiData: Partial<ApiDataConfigMap>;

	/**
	 * 事件
	 */
	abstract events: Record<string, any>;

	/**
	 * 动作
	 */
	abstract actions: Record<string, any>;

	constructor(name: string, attr: Partial<ComponentAttr>, type = ComType.com) {
		this.id = generateId(name);
		this.name = `V${name}`;
		this.type = type;
		console.log(this.name)
		const obj = findComByName(this.name)!;
		this.alias = obj.com.alias;
		this.icon = obj.category.icon;
		this.img = obj.com.thum;

		this.attr = { ...this.attr, ...attr };
	}
	/**
	 * 初始化数据
	 */
	abstract initData(): this;

	/**
	 * 将静态数据和配置分离 减少 bundle size
	 */
	abstract loadData(): Promise<void>;
}

export abstract class DatavChartSeries {
	readonly type: string;
	id: string;
	name: string;

	protected constructor(type: string, name: string) {
		this.type = type;
		this.id = generateId(name);
		this.name = name;
	}
}

/**
 * echarts图表组件
 */
export abstract class DatavEChartsComponent extends DatavComponent {
	abstract config: Record<string, any> & {
		legend?: Record<string, any>;
		tooltip?: Record<string, any>;
		series: DatavChartSeries | DatavChartSeries[];
		animation: {
			enabled: boolean;
			duration?: number;
			easing?: string;
			delay?: number;
			threshold?: number;
			durationUpdate?: number;
			easingUpdate?: string;
			delayUpdate?: number;
		};
	};
}
