import http from "@/api/index";
import { Screen, ScreenGroup } from "@/datav/types/project";
import { ReqPage, ResPage } from "../interface";

export interface ReqScreensParams extends ReqPage {
	name: string;
	groupId: number;
	sortColumn: string;
}

/**
 * 获取分组列表
 */
export function getScreenGroups(params: ReqScreensParams) {
	return http.get<ResPage<ScreenGroup>>("/datav/screen/group/page", params);
}

/**
 * 获取分组详情
 * @param id
 */
export function getScreenGroup(id: number): any {
	return http.get(`/datav/screen/group/${id}`);
}

/**
 * 创建分组
 * @param data
 */
export function createScreenGroup(data: any) {
	return http.post("/datav/screen/group/save", data);
}

/**
 * 修改分组
 * @param data
 */
export function updateScreenGroup(data: any) {
	return http.post<Screen>("/datav/screen/group/update", data);
}

/**
 * 删除分组
 * @param id
 */
export function deleteScreenGroup(id: number) {
	return http.post(`/datav/screen/group/delete/${id}`);
}
