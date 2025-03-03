import http from "@/api/index";
import { Screen, ScreenGroup } from "@/datav/types/project";
import { ReqPage, ResPage } from "../interface";
import { getBasePath } from "@/utils/url";

export interface ReqScreensParams extends ReqPage {
	name: string;
	groupId: number;
	sortColumn: string;
}

/**
 * 获取大屏列表
 */
export function getScreens(params: ReqScreensParams) {
	return http.get<ResPage<Screen>>("/datav/screen/page", params);
}

/**
 * 获取大屏详情
 * @param id
 */
export function getScreen(id: number): any {
	return http.get(`/datav/screen/${id}`);
}

/**
 * 获取大屏详情
 * @param key
 */
export function getScreenByKey(key: string): any {
	return http.get(`/datav/screen/key/${key}`);
}

/**
 * 保存大屏
 * @param data
 */
export function saveScreen(data: any) {
	return http.post<Screen>("/datav/screen/save", data);
}

/**
 * 删除大屏
 * @param id
 */
export function deleteScreen(id: number) {
	return http.post(`/datav/screen/delete/${id}`);
}

/**
 * 获取是否有密码
 * @param shareKey
 */
export function hasPassword(shareKey: string) {
	return http.get(`/datav/screen/hasPassword`, { shareKey });
}

/**
 * 检查密码是否正确
 * @param shareKey
 */
export function checkPassword(shareKey: string, password: string) {
	return http.post(`/datav/screen/checkPassword`, { shareKey, password });
}

/**
 * 获取是否有密码
 * @param shareKey
 */
export function viewScreen(shareKey: string) {
	return http.get<Screen>(`/datav/screen/view/${shareKey}`);
}

/**
 * 检查是否有密码
 * @param id
 */
export function copyScreen(id: number) {
	return http.post(`/datav/screen/${id}/copy`);
}

/**
 * 获取大屏分组列表
 */
export function getScreenGroups() {
	return http.get<ScreenGroup[]>("/datav/screen/group/list");
}

/**
 * 获取发布信息
 * @param id
 */
export function getPublishInfo(key: string) {
	return http.get<Screen>(`/datav/screen/${key}/publish`);
}

export function publishApp(id: number, data: any) {
	return http.post(`/datav/screen/${id}/publish`, data);
}

export function getShareUrl(key: string) {
	return `${getBasePath()}screen/${key}`;
}
