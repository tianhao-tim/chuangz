<template>
	<div class="row-wrapper">
		<el-row class="h-full">
			<el-col :span="col.span" v-for="col in config.colList" :key="col.id" class="col-wrapper">
				<add-component @add="com => handleAddComponent(com, col)" v-if="!col.component" />
				<chart-item
					v-else
					:chart-config="col.component"
					:theme-color="themeColor"
					:theme-setting="themeSetting"
					@delete="handleDeleteComponent(col)"
					@selected="selectCom => handleItemClick(selectCom)"
				/>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { DashboardComponent } from "@/views/dashboard/components/types";
import { useChartDataFetch } from "@/views/dashboard/components/useChartDataFetch";
import { handleItemClick } from "@/views/dashboard/components/useChartComponent";
import { otpion } from "./config";
import AddComponent from "@/views/dashboard/components/layout/Tabs/AddComponent.vue";
import ChartItem from "@/views/dashboard/editor/main/ChartItem.vue";

const props = defineProps({
	themeSetting: {
		type: Object,
		required: true
	},
	themeColor: {
		type: Object,
		required: true
	},
	chartConfig: {
		type: Object as PropType<DashboardComponent>,
		required: true
	}
});
const config = computed<typeof otpion>(() => {
	return props.chartConfig.config as typeof otpion;
});

const handleAddComponent = (com: any, col: any) => {
	col.component = com;
};
const handleDeleteComponent = (col: any) => {
	col.component = null;
};

useChartDataFetch(props.chartConfig);
</script>
<style lang="scss" scoped>
.row-wrapper {
	height: 100%;
	.col-wrapper {
		border: 1px solid #e4e7ed;
		height: 100%;
	}
}
</style>
