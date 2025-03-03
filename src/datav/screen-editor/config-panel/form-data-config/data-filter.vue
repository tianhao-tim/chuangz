<template>
	<div>
		<span>筛选出符合以下</span>
		<el-select v-model="data.filterParams.rel" placeholder="请选择">
			<el-option v-for="item in data.relList" :key="item.value" :label="item.label" :value="item.value" />
		</el-select>
		<span>条件的数据</span>
		<div>
			<el-link :underline="false" type="primary" @click="addConditionHandle"><i class="el-icon-plus" />添加过滤条件</el-link>
		</div>
		<div v-if="data.filterParams.conditionList.length">
			<el-row
				v-for="(item, index) in data.filterParams.conditionList"
				:key="index"
				:gutter="10"
				align="middle"
				class="mt5"
				justify="center"
				type="flex"
			>
				<el-col :span="7">
					<el-select
						v-model="item.formItemId"
						filterable
						placeholder="请选择"
						@change="
							val => {
								handleConditionChange(val, item);
							}
						"
					>
						<el-option v-for="field in fields" :key="field.value" :label="field.label" :value="field.value" />
					</el-select>
				</el-col>
				<el-col :span="6">
					<el-select v-model="item.method" placeholder="请选择条件">
						<el-option v-for="c in getConditionRuleList(item)" :key="c.value" :label="c.label" :value="c.value" />
					</el-select>
				</el-col>
				<el-col :span="8">
					<el-select
						v-if="
							['SELECT', 'CHECKBOX', 'RADIO'].includes(getFiledType(item.formItemId)) && ['INCLUDE', 'NOT_INCLUDE', 'EQ', 'NE'].includes(item.method)
						"
						v-model="item.value"
						:multiple="['INCLUDE', 'NOT_INCLUDE'].includes(item.method)"
						allow-create
						clearable
						default-first-option
						filterable
						placeholder="请选择选项"
					>
						<el-option
							v-for="option in getFieldScheme(item.formItemId).config.options"
							:key="option.value"
							:label="option.label"
							:value="option.label"
						/>
					</el-select>
					<el-date-picker
						v-else-if="['DATE'].includes(getFiledType(item.formItemId)) && item.method !== 'TIME_RANGE'"
						v-model="item.value"
						:disabled="['IS_NULL', 'NOT_NULL'].includes(item.method)"
						:format="getObjValue(getFieldScheme(item.formItemId), 'format', data.defaultDateTimeFormat)"
						:type="getObjValue(getFieldScheme(item.formItemId), 'type', 'datetime')"
						:value-format="getObjValue(getFieldScheme(item.formItemId), 'value-format', data.defaultDateTimeFormat)"
						placeholder="请选择选择日期"
					/>
					<el-select
						v-else-if="['DATE'].includes(getFiledType(item.formItemId)) && item.method === 'TIME_RANGE'"
						v-model="item.value"
						filterable
						collapse-tags
						placeholder="请选择范围"
					>
						<el-option v-for="tr in timeRanges" :key="tr.value" :label="tr.label" :value="tr.value" />
					</el-select>
					<el-select
						v-else-if="['USER'].includes(getFiledType(item.formItemId))"
						v-model="item.value"
						filterable
						collapse-tags
						multiple
						placeholder="请选择目标用户"
					>
						<el-option v-for="user in data.userList" :key="user.userName" :label="user.nickName" :value="user.userName" />
					</el-select>
					<el-input v-else v-model="item.value" :disabled="['IS_NULL', 'NOT_NULL'].includes(item.method)" placeholder="请输入条件值" />
				</el-col>
				<el-col :span="1">
					<el-icon @click="removeConditionHandle(index)"><DeleteFilled /></el-icon>
				</el-col>
			</el-row>
		</div>
		<el-empty v-else description="暂无条件" />
	</div>
</template>

<script lang="ts" setup name="FormDataFilter">
import { reactive, watch } from "vue";
import _ from "lodash-es";

const props = defineProps<{
	fields: any[];
	formDataFilter: object;
}>();

const timeRanges = [
	{
		label: "今天",
		value: "TODAY"
	},
	{
		label: "昨天",
		value: "YESTERDAY"
	},
	{
		label: "本周",
		value: "WEEK"
	},
	{
		label: "上周",
		value: "LAST_WEEK"
	},
	{
		label: "本月",
		value: "MONTH"
	},
	{
		label: "上月",
		value: "LAST_MONTH"
	},
	{
		label: "本季度",
		value: "QUARTER"
	},
	{
		label: "上季度",
		value: "LAST_QUARTER"
	},
	{
		label: "本年",
		value: "YEAR"
	},
	{
		label: "上年",
		value: "LAST_YEAR"
	}
];

const data = reactive({
	relList: [
		{
			label: "所有",
			value: "AND"
		},
		{
			label: "任一",
			value: "OR"
		}
	],
	// 每个组件类型包含的筛选方法
	typeIncludeMethods: {
		INPUT: ["EQ", "NE", "GT", "LT", "GE", "LE", "INCLUDE", "NOT_INCLUDE", "IS_NULL", "NOT_NULL"],
		TEXTAREA: ["EQ", "NE", "GT", "LT", "GE", "LE", "INCLUDE", "NOT_INCLUDE", "IS_NULL", "NOT_NULL"],
		NUMBER: ["EQ", "NE", "GT", "LT", "GE", "LE", "IS_NULL", "NOT_NULL"],
		SELECT: ["EQ", "NE", "INCLUDE", "NOT_INCLUDE", "IS_NULL", "NOT_NULL"],
		RADIO: ["EQ", "NE", "INCLUDE", "NOT_INCLUDE", "IS_NULL", "NOT_NULL"],
		CHECKBOX: ["EQ", "NE", "INCLUDE", "NOT_INCLUDE", "IS_NULL", "NOT_NULL"],
		DATE: ["EQ", "NE", "GT", "LT", "GE", "LE", "IS_NULL", "NOT_NULL", "TIME_RANGE"],
		PROVINCE_CITY: ["INCLUDE", "NOT_INCLUDE", "IS_NULL", "NOT_NULL"],
		USER: ["INCLUDE", "IS_NULL", "NOT_NULL"]
	},
	// 全部类型
	conditionRuleOptions: [
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
		},
		{
			label: "时间范围",
			value: "TIME_RANGE"
		}
	],
	filterParams: props.formDataFilter || {
		rel: "AND",
		conditionList: []
	},
	// 可选择用户列表
	userList: [],
	defaultDateTimeFormat: "YYYY-MM-DD HH:mm:ss"
});

const emits = defineEmits(["update:formDataFilter", "confirm"]);

watch(
	() => data.filterParams,
	val => {
		emits("update:formDataFilter", val);
	},
	{ deep: true }
);

const getFiledType = (id: string) => {
	if ("createBy" === id) {
		return "USER";
	} else if (["createTime", "updateTime"].includes(id)) {
		return "DATE";
	}
	return id.replace("label", "").replace(/\d+./g, "").replace("-", "").toUpperCase();
};

const getFieldScheme = (id: string) => {
	return props.fields.find(item => item.value === id)?.scheme;
};
/**
 * 从obj获取值 如果是undefined返回defaultValue
 * @param obj
 * @param key
 * @param defaultValue
 */
const getObjValue = (obj: object, key: string, defaultValue: string) => {
	return _.get(obj, key, defaultValue);
};

const handleConditionChange = (value: string, item: any) => {
	let field = props.fields.find(field => field.value === value);
	item.field = field;
	// 获取默认值
	if (field && field.scheme && field.scheme.config && field.scheme.config.defaultValue) {
		item.defaultValueType = Array.isArray(field.scheme.config.defaultValue) ? "ARRAY" : "STRING";
	} else {
		item.defaultValueType = "USER" == field.type ? "ARRAY" : "STRING";
	}
};
const getConditionRuleList = (item: any) => {
	if (!item && !item.formItemId) {
		return [];
	}
	let field = props.fields.find((field: any) => field.value === item.formItemId);
	let type = field && field.type;
	let typeIncludeMethod = _.get(data.typeIncludeMethods, type, null);
	if (!type || !typeIncludeMethod) {
		typeIncludeMethod = ["IS_NULL", "NOT_NULL"];
	}
	return data.conditionRuleOptions.filter((item: any) => typeIncludeMethod.includes(item.value));
};
const removeConditionHandle = (index: number) => {
	data.filterParams.conditionList.splice(index, 1);
};
const addConditionHandle = () => {
	if (!data.filterParams.conditionList) {
		data.filterParams.conditionList = [];
	}
	data.filterParams.conditionList.push({
		formItemId: "",
		method: "",
		value: ""
	});
};
</script>

<style scoped></style>
