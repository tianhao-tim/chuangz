import http from "@/api/index";
import { ReqPage, ResPage } from "../../interface";

export interface DataSource {
	id: number;
	sourceName: string;
	sourceDesc: string;
	sourceType: number;
	sourceConfig: SourceConfig;
	createBy: string;
	createTime: string;
	updateBy: string;
	updateTime: string;
}

export interface SourceConfig {
	url: string;
	username: string;
	password: string;
}

export interface ReqDataSourceParams extends ReqPage {
	name: string;
}

/**
 * 获取分组列表
 */
export function getDataSources(params: ReqDataSourceParams) {
	return http.get<ResPage<DataSource>>("/data/dataSource/page", params);
}

/**
 * 获取全部
 */
export function getDataSourceAllList() {
	return http.get<DataSource[]>("/data/dataSource/list");
}

/**
 * 获取分组详情
 * @param id
 */
export function getDataSource(id: number): any {
	return http.get(`/data/dataSource/${id}`);
}

/**
 * 创建分组
 * @param data
 */
export function createDataSource(data: any) {
	return http.post("/data/dataSource/add", data);
}

/**
 * 修改分组
 * @param data
 */
export function updateDataSource(data: any) {
	return http.post<DataSource>("/data/dataSource/update", data);
}

/**
 * 删除分组
 * @param id
 */
export function deleteDataSource(id: number) {
	return http.post(`/data/dataSource/delete/${id}`);
}

/**
 * 测试连接
 */
export function testConnection(data: any) {
	return http.post("/data/dataSource/testConnection", data);
}
