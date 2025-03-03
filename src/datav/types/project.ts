/**
 * 大屏
 */
export interface Screen {
	id: number;
	name: string;
	shareKey: string;
	status: number;
	thumbnail?: string;
	groupId: number;
	createTime: string;
	updateTime: string;
	password: string;
	config?: any;
}

/**
 * 项目组
 */
export class ScreenGroup {
	id: number;
	name: string;
	createTime: string;
	updateTime: string;
}

export interface ProjectTemplate {
	id: number;
	name: string;
	description: string;
	size: String[];
	snapshot: string;
	thumbnail: string;
	config: any;
}
