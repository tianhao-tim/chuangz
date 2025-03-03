import http from "@/api/index";
import { ReqPage, ResPage } from "../../interface";

export interface DataSet {
	id: number;
	setType: number;
	setName: String;
	setDesc: String;
	dataSourceId: number;
	sourceType: String;
	sourceId: number;
	userId: number;
	dynSentence: String;
	caseResult: String;
	createTime: string;
	updateTime: string;
}

export interface ReqDataSetParams extends ReqPage {
	name: string;
}

/**
 * 获取分组列表
 */
export function getDataSets(params: ReqDataSetParams) {
	return http.get<ResPage<DataSet>>("/data/dataSet/page", params);
}

/**
 * 获取分组详情
 * @param id
 */
export function getDataSet(id: number): any {
	return http.get(`/data/dataSet/${id}`);
}

/**
 * 创建分组
 * @param data
 */
export function createDataSet(data: any) {
	return http.post("/data/dataSet/save", data);
}

/**
 * 修改分组
 * @param data
 */
export function updateDataSet(data: any) {
	return http.post<DataSet>("/data/dataSet/update", data);
}

/**
 * 删除分组
 * @param id
 */
export function deleteDataSet(id: number) {
	return http.post(`/data/dataSet/delete/${id}`);
}
