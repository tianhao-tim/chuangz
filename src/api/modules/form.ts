import http from "@/api/index";
import { ReqPage, ResPage } from "../interface";

export interface ReqFormParams extends ReqPage {
	name: string;
	formKey: string;
}

export interface Form {
	formKey: number;
	sourceName: string;
}

export interface FormItem {
	id: number;
	label: string;
}

export interface FormField {
	value: number;
	label: string;
}
/**
 * 获取表单列表
 */
export function getFormList() {
	return http.get<Form[]>("/form/dataSource/list");
}

/**
 * 分页获取表单列表
 */
export function getFormPageList(params: ReqFormParams) {
	return http.get<ResPage<Form>>("/form/dataSource/list", params);
}

/**
 * 获取表单项列表
 */
export function getFormItemList(formKey: string) {
	return http.get<FormItem[]>("/form/item/list", { formKey });
}

/**
 * 获取表单项列表
 */
export function getFormFieldList(formKey: string) {
	return http.get<FormField[]>("/form/dataSource/fields", { formKey });
}
/**
 * 获取表单字段值去重列表
 */
export function getFieldDistinct(indexName: string, fieldId: string) {
	return http.get<string[]>("/datav/chart/field/distinct", { indexName, fieldId });
}
