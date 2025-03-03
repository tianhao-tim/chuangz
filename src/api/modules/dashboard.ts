import http from "@/api/index";
import { ReqPage, ResPage } from "../interface";

export interface ReqDashboardParams extends ReqPage {
	name: string;
}

export interface DashboardPage {
	id: number;
	userId: number;
	shareKey: string;
	name: string;
	status: number;
	publishStatus: number;
	componentList: any[];
	pageConfig: any;
	createTime: string;
	updateTime: string;
}

/**
 * 获取仪表盘列表
 */
export function getDashboards(params: ReqDashboardParams) {
	return http.get<ResPage<DashboardPage>>("/dashboard/manage/page", params);
}

/**
 * 获取仪表盘详情
 * @param id
 */
export function getDashboard(id: number): any {
	return http.get(`/dashboard/manage/${id}`);
}

/**
 * 获取仪表盘详情
 * @param key
 */
export function getDashboardByKey(key: string): any {
	return http.get(`/dashboard/manage/key/${key}`);
}

/**
 * 修改仪表盘
 * @param data
 */
export function updateDashboard(data: any) {
	return http.post("/dashboard/manage/update", data);
}

/**
 * 保存仪表盘
 * @param data
 */
export function saveDashboard(data: any) {
	return http.post<DashboardPage>("/dashboard/manage/save", data);
}

/**
 * 删除仪表盘
 * @param id
 */
export function deleteDashboard(id: number) {
	return http.post(`/dashboard/manage/delete/${id}`);
}

/**
 * 复制仪表盘分组
 * @param id
 */
export function copyDashboard(id: number) {
	return http.post(`/dashboard/manage/${id}/copy`);
}

/**
 * 获取仪表盘详情
 * @param key
 */
export function getPublishInfo(key: string): any {
	return http.get(`/dashboard/manage/${key}/publishInfo`);
}

/**
 * 是否有密码
 * @param shareKey
 */
export function hasPassword(shareKey: string): any {
	return http.get(`/dashboard/manage/hasPassword`, { shareKey });
}

/**
 * 检查密码是否正确
 * @param shareKey
 * @param password
 */
export function checkPassword(shareKey: string, password: string): any {
	return http.post(`dashboard/manage/checkPassword`, { shareKey, password });
}
