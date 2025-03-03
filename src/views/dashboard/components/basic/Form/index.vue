<template>
	<div class="form-wrapper">
		<el-form :inline="true" :model="formData" class="demo-form-inline">
			<el-form-item :label="item.label" v-for="item in formItemList" :key="item.key" :required="item.required">
				<el-input v-model="formData[item.vModel]" :placeholder="item.placeholder" v-if="item.type === FormItemType.INPUT" />
				<el-select v-model="formData[item.vModel]" :placeholder="item.placeholder" v-if="item.type === FormItemType.SELECT">
					<el-option v-for="op in item.options" :key="op.value" :label="op.label" :value="op.value" />
				</el-select>
				<el-date-picker v-if="item.type === FormItemType.DATE_PICKER" v-model="formData[item.vModel]" type="date" :placeholder="item.placeholder" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleSubmit">{{ config.submitBtnText }}</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType, ref, toRefs } from "vue";
import { DashboardComponent } from "@/views/dashboard/components/types";
import { useChartDataFetch } from "@/views/dashboard/components/useChartDataFetch";
import { option, FormItemType } from "./config";
import emitter from "@/utils/mitt";

const formData = ref({});

const props = defineProps({
	themeColor: {
		type: Object,
		required: true
	},
	chartConfig: {
		type: Object as PropType<DashboardComponent>,
		required: true
	}
});

const { formItemList } = toRefs(props.chartConfig.config);

const handleSubmit = () => {
	emitter.emit("chart-form-query", {
		chartConfig: props.chartConfig,
		formData: formData.value
	});
};

const config = computed(() => {
	return props.chartConfig.config as typeof option;
});

useChartDataFetch(props.chartConfig);
</script>
<style lang="scss" scoped>
.form-wrapper {
	padding: 5px;
}
</style>
