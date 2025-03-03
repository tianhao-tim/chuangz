import http from "@/api/index";
import { ReqPage, ResPage } from "../interface";

export interface ReqPosterParams extends ReqPage {
	name: string;
}

export interface PosterPage {
	id: number;
	userId: number;
	posterKey: string;
	name: string;
	posterWidgetList: any[];
	posterConfig: any;
	createTime: string;
	updateTime: string;
}

export interface PosterFormLink {
	id: number;
	userId: number;
	formKey: string;
	posterKey: string;
	name: string;
	fields: [];
	createTime: string;
	updateTime: string;
}

export interface PosterTemplate {
	id: number;
	userId: number;
	name: string;
	createTime: string;
	updateTime: string;
}

/**
 * 获取海报列表
 */
export function getPosters(params: ReqPosterParams) {
	return http.get<ResPage<PosterPage>>("/poster/page", params);
}

/**
 * 获取海报详情
 * @param id
 */
export function getPoster(id: number): any {
	return http.get(`/poster/${id}`);
}

/**
 * 获取海报详情
 * @param key
 */
export function getPosterByKey(key: string): any {
	return http.get(`/poster/key/${key}`);
}

/**
 * 修改海报
 * @param data
 */
export function updatePoster(data: any) {
	return http.post("/poster/update", data);
}

/**
 * 保存海报
 * @param data
 */
export function savePoster(data: any) {
	return http.post<PosterPage>("/poster/save", data);
}

/**
 * 删除海报
 * @param id
 */
export function deletePoster(id: number) {
	return http.post(`/poster/delete/${id}`);
}
/**
 * 预览海报
 * @param data
 */
export function previewPosterImage(data: any) {
	return http.post("/poster/preview", data);
}

/**
 * 海报表单关联表
 */
export function getPosterFormLinkList(params: { posterKey: string }) {
	return http.get<PosterFormLink[]>("/poster/form/link/list", params);
}
/**
 * 保存海报表单关联表
 * @param data
 */
export function savePosterFormLink(data: any) {
	return http.post<PosterFormLink>("/poster/form/link/save", data);
}
/**
 * 删除海报
 * @param id
 */
export function deletePosterFormLink(id: number) {
	return http.post(`/poster/form/link/delete/${id}`);
}

/**
 * 根据表单数据生成海报
 * @param linkKey
 * @param dataId
 */
export function generateFormDataPoster(linkKey: string, dataId: number) {
	return http.post(`/poster/generate/${linkKey}/${dataId}`);
}

/**
 * 海报模板列表
 */
export function getPosterTemplateList() {
	return http.get<PosterTemplate[]>("/poster/template/list");
}

/**
 * 保存海报模板
 */
export function savePosterTemplate(data: any) {
	return http.post<PosterTemplate>("/poster/template/save", data);
}

/**
 * 删除海报模板
 */
export function deletePosterTemplate(id: number) {
	return http.post(`/poster/template/delete/${id}`);
}

/**
 *  使用模板
 */
export function useTemplateToPoster(id: number, posterKey: string) {
	return http.post(`/poster/template/useTemplateToPoster`, { id, posterKey });
}
