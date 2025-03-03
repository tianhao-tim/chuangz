import _ from "lodash-es";

/**
 * 是否是具有label值得组件
 */
const isLabelTag = (key: string) => {
	return !!(
		_.startsWith(key, "radio") ||
		_.startsWith(key, "checkbox") ||
		_.startsWith(key, "select") ||
		_.startsWith(key, "image_select") ||
		_.startsWith(key, "cascader")
	);
};

// 获取组件的完整Id
export const getLabelId = (val: string) => {
	return isLabelTag(val) ? val + "label" : val;
};

// 数据过滤类型
export const dataFilterTypeConstant = [
	{
		label: "等于",
		value: "EQ"
	},
	{
		label: "不等于",
		value: "NE"
	},
	{
		label: "大于",
		value: "GT"
	},
	{
		label: "小于",
		value: "LT"
	},
	{
		label: "大于等于",
		value: "GE"
	},
	{
		label: "小于等于",
		value: "LE"
	},
	{
		label: "包含",
		value: "INCLUDE"
	},
	{
		label: "不包含",
		value: "NOT_INCLUDE"
	},
	{
		label: "为空",
		value: "IS_NULL"
	},
	{
		label: "不为空",
		value: "NOT_NULL"
	}
];
