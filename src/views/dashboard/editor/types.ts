import { DashboardComponent } from "@/views/dashboard/components/types";

export interface DashboardPage {
	id: number;
	pageConfig?: {
		// 名称
		name: string;
		// 背景颜色
		bgColor?: string;
		bgImage?: string;
		// 主题风格
		themeStyle?: string;
		waterMarkText?: string;
	};
	publishStatus?: 0;
	componentList: DashboardComponent[];
}

export enum LayoutMode {
	PC,
	Mobile,
	Pad
}
