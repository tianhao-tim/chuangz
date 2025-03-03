<template>
	<el-tabs v-bind="config" class="h-full tabs-wrapper">
		<el-tab-pane v-for="tab in config.tabList" :key="tab.id" :label="tab.label" class="h-full">
			<template #label>
				<span class="custom-tabs-label">
					<i class="el-icon mr2" :class="tab.icon" />
					<span>{{ tab.label }}</span>
				</span>
			</template>
			<add-component @add="com => handleAddComponent(com, tab)" v-if="!tab.componentList || tab.componentList.length === 0" />
			<div v-else class="h-full">
				<chart-item
					v-for="(com, index) in tab.componentList"
					:key="com.id"
					:chart-config="com"
					:theme-color="themeColor"
					:theme-setting="themeSetting"
					@delete="handleDeleteTabComponent(tab, index)"
					@selected="selectCom => handleItemClick(selectCom)"
				/>
			</div>
		</el-tab-pane>
	</el-tabs>
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

const handleAddComponent = (com: any, tab: any) => {
	tab.componentList.push(com);
};
const handleDeleteTabComponent = (tab: any, index: number) => {
	tab.componentList.splice(index);
};

useChartDataFetch(props.chartConfig);
</script>
<style lang="scss" scoped>
.tabs-wrapper {
	:deep(.el-tabs__header) {
		margin: 0;
	}

	:deep(.el-tabs__content) {
		height: calc(100% - 40px);
	}
}
</style>
