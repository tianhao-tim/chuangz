<template>
	<div>
		<el-form-item label="显示字段">
			<el-select v-model="selectVals" multiple placeholder="请选择字段" @change="handleFormItemChange" style="width: 100%">
				<el-option v-for="item in props.allFormItemList" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
		</el-form-item>
		<el-form-item label="限制条数" class="mt10">
			<el-input-number v-model="form.limit" :min="1" :max="100" label="显示条数" />
		</el-form-item>
	</div>
</template>

<script lang="ts" setup name="FormEchartConfig">
import { ComputedRef, inject, ref } from "vue";
import { ApiDataConfig } from "@/datav/types/data-source";

const apiDataConfig = inject("apiDataConfig") as ComputedRef<ApiDataConfig>;

const form = apiDataConfig.value.config.formConfig;

const selectVals = ref([]);

const props = defineProps<{
	allFormItemList: any[];
}>();

const handleFormItemChange = (val: string[]) => {
	form.index = val.map(item => {
		return {
			id: item,
			label: props.allFormItemList.find(i => i.value === item)?.label
		};
	});
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
