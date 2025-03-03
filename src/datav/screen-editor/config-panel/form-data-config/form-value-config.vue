<template>
	<div>
		<el-form-item label="指标">
			<el-select clearable filterable @change="handleFormItemChange" v-model="selectVal" placeholder="请先选择表单">
				<el-option v-for="item in props.allFormItemList" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
		</el-form-item>
		<div v-if="selectVal">
			<el-form-item label="聚合类型">
				<el-radio-group v-model="firstIndex.aggregateType" @change="handleChangeAggsType">
					<el-radio-button label="SUM">求和</el-radio-button>
					<el-radio-button label="AVG">平均值</el-radio-button>
					<el-radio-button label="MAX">最大值</el-radio-button>
					<el-radio-button label="MIN">最小值</el-radio-button>
					<el-radio-button label="COUNT">计数</el-radio-button>
					<!--					<el-radio-button label="SPECIFIED">指定</el-radio-button>-->
				</el-radio-group>
			</el-form-item>
			<el-form-item label="目标值" v-if="firstIndex.aggregateType === 'SPECIFIED'">
				<el-select clearable v-model="firstIndex.value" filterable placeholder="选择目标值">
					<el-option v-for="val in fieldValues" :key="val" :label="val" :value="val" />
				</el-select>
			</el-form-item>
		</div>
	</div>
</template>

<script lang="ts" setup name="FormEchartConfig">
import { ComputedRef, ref, inject, computed } from "vue";
import { ApiDataConfig } from "@/datav/types/data-source";
import { getFieldDistinct } from "@/api/modules/form";

const apiDataConfig = inject("apiDataConfig") as ComputedRef<ApiDataConfig>;
const form = apiDataConfig.value.config.formConfig;

const selectVal = ref(null);

const firstIndex = computed(() => form.index[0]);

const fieldValues = ref([] as Array<string>);

const props = defineProps<{
	allFormItemList: any[];
	indexName: string;
}>();

const handleChangeAggsType = (val: string) => {
	if (val === "SPECIFIED") {
		getFieldDistinct(props.indexName, selectVal.value).then(res => {
			fieldValues.value = res.data;
		});
	}
};

const handleFormItemChange = (val: string) => {
	let item = {
		id: val,
		label: props.allFormItemList.find(item => item.value === val)?.label,
		aggregateType: "COUNT"
	};
	if (form.index.length) {
		form.index[0] = item;
	} else {
		form.index.push(item);
	}
};
</script>

<style lang="scss" scoped></style>
