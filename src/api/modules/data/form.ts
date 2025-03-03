import http from "@/api/index";
import { ReqPage, ResPage } from "../../interface";

export interface FormDataSource {
	id: number;
	sourceName: string;
	sourceDesc: string;
	formKey: string;
	fields: any;
	createTime: string;
	updateTime: string;
}

export interface ReqFormDataSourceParams extends ReqPage {
	sourceName: string;
}

/**
 * 获取表单列表
 */
export function getFormDataSources(params: ReqFormDataSourceParams) {
	return http.get<ResPage<FormDataSource>>("/form/dataSource/page", params);
}

/**
 * 获取全部
 */
export function getFormDataSourceAllList() {
	return http.get<FormDataSource[]>("/form/dataSource/list");
}

/**
 * 获取表单详情
 * @param id
 */
export function getFormDataSource(id: number): any {
	return http.get(`/form/dataSource/${id}`);
}

/**
 * 创建表单
 * @param data
 */
export function createFormDataSource(data: any) {
	return http.post("/form/dataSource/add", data);
}

/**
 * 修改表单
 * @param data
 */
export function updateFormDataSource(data: any) {
	return http.post<FormDataSource>("/form/dataSource/update", data);
}

/**
 * 删除表单
 * @param id
 */
export function deleteFormDataSource(id: number) {
	return http.post(`/form/dataSource/delete/${id}`);
}

/**
 * 同步表单
 */
export function syncFormDataSource(id: number, url: string) {
	return http.post(`/form/dataSource/syncData?id=${id}&url=${url}`);
}
/**
 * 同步表单
 */
export function syncFormFieldsSource(id: number, url: string) {
	return http.post(`/form/dataSource/syncFields?id=${id}&url=${url}`);
}
