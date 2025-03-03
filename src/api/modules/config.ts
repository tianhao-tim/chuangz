import { request } from "../index";

// 查询参数列表
export function listConfig(query: any) {
	return request({
		url: "/system/config/page",
		method: "get",
		params: query
	});
}

// 查询参数详细
export function getConfig(configId: number) {
	return request({
		url: "/system/config/" + configId,
		method: "get"
	});
}

// 根据参数键名查询参数值
export function getConfigValue(configKey: string) {
	return request({
		url: `/system/config/${configKey}/configValue`,
		method: "get"
	});
}

// 根据参数键名查询参数值
export function getConfigByKey(configKey: string) {
	return request({
		url: `/system/config/${configKey}/obj`,
		method: "get"
	});
}

// 新增参数配置
export function addConfig(data: any) {
	return request({
		url: "/system/config",
		method: "post",
		data: data
	});
}

// 修改参数配置
export function updateConfig(data: any) {
	return request({
		url: "/system/config",
		method: "put",
		data: data
	});
}

// 删除参数配置
export function delConfig(configId: number) {
	return request({
		url: "/system/config/" + configId,
		method: "delete"
	});
}

// 刷新参数缓存
export function refreshCache() {
	return request({
		url: "/system/config/refreshCache",
		method: "delete"
	});
}

// 导出参数
export function exportConfig(query: any) {
	return request({
		url: "/system/config/export",
		method: "get",
		responseType: "blob",
		params: query
	});
}

// 获取系统配置
export function getEnvConfig(key: string) {
	return request({
		url: "/system/env/config/" + key,
		method: "get"
	});
}

export function getEnvConfigValue(key: string) {
	return request({
		url: "/system/env/config/value/" + key,
		method: "get"
	});
}

export function getSystemInfoConfig() {
	return request({
		url: "/public/systemInfoConfig",
		method: "get"
	});
}

// 保存系统配置
export function saveEnvConfig(data: any) {
	return request({
		url: "/system/env/config/save",
		method: "post",
		data: data
	});
}
