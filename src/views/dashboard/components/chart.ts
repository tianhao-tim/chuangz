/**
 * * 合并 color 和全局配置项
 * @param option 配置
 * @param themeSetting 设置
 * @param excludes 排除元素
 * @returns object
 */
import { merge, pick } from "lodash-es";
import { globalThemeJson } from "@/views/dashboard/components/chartThemes";

export const mergeTheme = <T, U>(option: T, themeSetting: U, includes: string[]) => {
	return (option = merge({}, pick(themeSetting, includes), option));
};

/**
 * * ECharts option 统一前置处理
 * @param option
 * @return option
 */
export const eChartOptionPrefixHandle = (option: any, includes: string[]) => {
	option["backgroundColor"] = "rgba(0,0,0,0)";
	return mergeTheme(option, globalThemeJson, includes);
};
