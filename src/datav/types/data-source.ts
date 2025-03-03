import { generateId } from "@/utils";

/**
 * 数据类型
 */
export enum ApiType {
	/**
	 * 静态数据
	 */
	static = "static",
	/**
	 * api
	 */
	api = "api",

	/**
	 * 表单数据
	 */
	form = "form",

	/**
	 * 数据集 sql之类
	 */
	dataset = "dataset"
}

export enum ApiStatus {
	loading = "loading",
	success = "success",
	failed = "failed",
	completed = "completed",
	incomplete = "incomplete"
}

export enum ApiRequestMethod {
	GET = "GET",
	POST = "POST"
}

export interface ApiConfig {
	description: string;
	useAutoUpdate: boolean;
	autoUpdate: number;
}

export interface ApiConfigMap {
	source: ApiConfig;
}

export type ApiKeyName = keyof ApiConfigMap;

export interface ApiDataConfig {
	id: string;
	comId: string;
	type: ApiType;
	config: {
		// 暂时不用
		useFilter: boolean;
		// 源数据
		data: any;
		// 请求
		api?: string;
		apiMethod?: ApiRequestMethod;
		apiHeaders?: string;
		apiBody?: string;
		local?: boolean;
		cookie?: boolean;
		// 不支持表单数据
		notSupportForm?: boolean;
		//  如果是表单
		formConfig?: FormConfig;
		// sql查询
		datasetConfig?: DatasetConfig;
	};
}

export interface DatasetConfig {
	// sql
	sql: string;
	// 数据源Id
	dataSourceId: string;
}

/**
 * 从表单数据获取数据源结构定义
 */
export interface FormConfig {
	// 表单唯一标识
	formKey: string;
	// 索引名称
	indexName: string;
	//指标
	index: any[];
	// 维度
	dimension: any[];
	// 排序
	sorts: any[];
	// 过滤条件
	filter: FilterType;
	// 关联条件
	linkageFilter: FilterType;
	// 限制数量
	limit: number;
	// 数据类型
	dataSourceType: string;
}

export class FilterType {
	rel: string;
	conditionList: Array<{ formItemId: string; method: string; value: string }>;
}

export interface ApiDataConfigMap {
	source: ApiDataConfig;
}

/**
 * 初始化数据接口配置
 */
export function initApiConfig(options: Partial<ApiConfigMap["source"]>) {
	const config: Partial<ApiConfigMap> = {
		source: {
			description: "",
			useAutoUpdate: false,
			autoUpdate: 60,
			...options
		}
	};

	return config;
}

/**
 * 初始化源数据
 */
export function initApiData(comId: string) {
	const config: Partial<ApiDataConfigMap> = {
		source: {
			comId,
			id: generateId(),
			type: ApiType.static,
			config: {
				useFilter: false,
				data: "",
				datasetConfig: {
					sql: "",
					dataSourceId: null
				},
				formConfig: {
					formKey: "",
					indexName: "",
					index: [],
					dimension: [],
					sorts: [],
					filter: {
						rel: "AND",
						conditionList: []
					},
					linkageFilter: {
						rel: "AND",
						conditionList: []
					},
					limit: null,
					dataSourceType: "MyForm"
				}
			}
		}
	};

	return config;
}

export function createDataSources() {
	return {
		[ApiType.static]: "静态数据",
		[ApiType.form]: "表单数据",
		[ApiType.api]: "API",
		[ApiType.dataset]: "数据库"
	};
}

export function createDataConfigForApi(config: ApiDataConfig["config"]) {
	if (config.api === undefined) {
		Object.assign(config, {
			api: "",
			apiMethod: ApiRequestMethod.GET,
			apiHeaders: "{}",
			apiBody: "{}",
			cookie: false,
			local: false
		});
	}
}
