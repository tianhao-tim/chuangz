<template>
	<div>
		<el-form-item label="词云字段">
			<el-select v-model="selectVals" placeholder="请选择字段" @change="handleFormItemChange" style="width: 100%">
				<el-option v-for="item in props.allFormItemList" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
		</el-form-item>
		<el-form-item label="限制条数" class="mt10">
			<el-input-number v-model="form.limit" :min="1" :max="100" label="显示条数" />
		</el-form-item>
	</div>
</template>

<script lang="ts" setup name="FormEChartConfig">
import { ComputedRef, inject, ref } from "vue";
import { ApiDataConfig } from "@/datav/types/data-source";

const apiDataConfig = inject("apiDataConfig") as ComputedRef<ApiDataConfig>;

const form = apiDataConfig.value.config.formConfig;

const selectVals = ref([]);

const props = defineProps<{
	allFormItemList: any[];
}>();

const handleFormItemChange = val => {
	form.index = [
		{
			id: val,
			label: props.allFormItemList.find(i => i.value === val)?.label
		}
	];
};
</script>

<style lang="scss" scoped></style>
