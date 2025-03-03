<template>
	<div>
		<el-form label-position="left" label-width="150px">
			<el-form-item label="数据来源">
				<el-radio-group v-model="form.dataSourceType">
					<el-radio-button label="MyForm" name="MyForm">我的表单</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="数据表">
				<el-select-v2
					filterable
					v-model="form.indexName"
					:options="formList"
					:props="{ label: 'sourceName', value: 'formKey' }"
					@change="handleFormChange"
				/>
			</el-form-item>
			<el-divider />
			<div v-if="isEchartsType()">
				<form-echarts-config :allFormItemList="allFormItemList" />
			</div>
			<div v-if="isPercentageType()">
				<form-value-config :allFormItemList="allFormItemList" :index-name="form.indexName" />
			</div>
			<div v-if="isTableType()">
				<form-table-config :allFormItemList="allFormItemList" :index-name="form.indexName" />
			</div>
			<div v-if="isWordCloudType()">
				<form-wordcloud-config :allFormItemList="allFormItemList" :index-name="form.indexName" />
			</div>
			<div v-if="isMapType()">
				<form-map-config :allFormItemList="allFormItemList" :index-name="form.indexName" />
			</div>
			<el-form-item label="过滤条件">
				<el-button @click="handleOpenFilterDialog()" v-if="form.filter && form.filter.conditionList.length" type="primary">查看过滤条件</el-button>
				<el-button @click="handleOpenFilterDialog()" v-else>设置过滤</el-button>
			</el-form-item>
		</el-form>
		<el-dialog v-model="filterDialogVisible" title="设置图表过滤条件" width="40%">
			<data-filter :fields="allFormItemList" v-model:formDataFilter="formDataFilter" />
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="filterDialogVisible = false">取消</el-button>
					<el-button type="primary" @click="handleFilterSave">确认</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup name="DsFormEditor">
import { onMounted, ref, ComputedRef, inject, watchEffect, computed } from "vue";
import { cloneDeep } from "lodash-es";
import { ApiDataConfig } from "@/datav/types/data-source";
import { getFormFieldList, getFormList } from "@/api/modules/form";
import FormEchartsConfig from "../../form-data-config/form-echart-config.vue";
import FormValueConfig from "../../form-data-config/form-value-config.vue";
import FormTableConfig from "../../form-data-config/form-table-config.vue";
import DataFilter from "@/datav/screen-editor/config-panel/form-data-config/data-filter.vue";
import FormWordcloudConfig from "@/datav/screen-editor/config-panel/form-data-config/form-wordcloud-config.vue";
import FormMapConfig from "@/datav/screen-editor/config-panel/form-data-config/form-map-config.vue";

const apiDataConfig = inject("apiDataConfig") as ComputedRef<ApiDataConfig>;

const form = apiDataConfig.value.config.formConfig;

const formList = ref([]);
const allFormItemList = ref([]);

const formDataFilter = ref({});

const filterDialogVisible = ref(false);

onMounted(() => {
	getFormListData();
});

watchEffect(async () => {
	if (!form.indexName) {
		return;
	}
	let res = await getFormFieldList(form.indexName);
	allFormItemList.value = res.data;
});

const getFormListData = async () => {
	const res = await getFormList();
	formList.value = res.data;
};

const handleFormChange = () => {
	form.index = [];
	form.dimension = [];
};

const handleOpenFilterDialog = () => {
	filterDialogVisible.value = true;
	formDataFilter.value = cloneDeep(form.filter);
};

const handleFilterSave = () => {
	filterDialogVisible.value = false;
	console.log(formDataFilter.value);
	let filterData = cloneDeep(formDataFilter.value) as any;
	filterData.conditionList = filterData?.conditionList.filter((item: any) => item.formItemId && item.method);
	form.filter = filterData;
};

const typeName = computed(() => {
	return apiDataConfig.value.comId.split("_")[0];
});

// 计数百分比类型的组件
const isPercentageType = () => {
	// 截取第一个_前的字符串
	let typeName = apiDataConfig.value.comId.split("_")[0];
	return ["PieOneValue", "PercentPond", "WaterLevelPond", "GaugeChart", "NumberTitleFlop"].includes(typeName);
};
// 有维度的组件
const isEchartsType = () => {
	// 截取第一个_前的字符串
	let typeName = apiDataConfig.value.comId.split("_")[0];
	return [
		"BasicBar",
		"ArcBar",
		"HorizontalBar",
		"BasicLine",
		"BasicRadar",
		"BasicArea",
		"BasicPie",
		"BasicRing",
		"Funnel",
		"TableBar",
		"ConicalColumnChart"
	].includes(typeName);
};

const isTableType = () => {
	// 截取第一个_前的字符串
	let typeName = apiDataConfig.value.comId.split("_")[0];
	return ["CarouselTable", "Table", "List"].includes(typeName);
};

const isWordCloudType = () => {
	return typeName.value === "WordCloud";
};
const isMapType = () => {
	return typeName.value === "BasicMap";
};
</script>

<style lang="scss" scoped>
.option-wrapper {
	border: var(--el-border);
	min-height: 24px;
	line-height: 24px;
	padding: 2px 10px;
	margin-top: 10px;
	border-radius: 4px;
	display: flex;
	flex: 24;
	align-items: center;

	.el-icon {
		cursor: pointer;
		flex: 1;
	}

	.icon-disabled {
		color: var(--el-disabled-text-color);
	}

	.title {
		display: inline-block;
		width: 30px;
		flex: 2;
	}

	.field-list {
		flex: 22;
	}
}

.dimension-field-list {
	margin-left: 10px;
}

.dimension-dropdown {
	margin: 2px 5px;
}
</style>
