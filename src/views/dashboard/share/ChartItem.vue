<template>
	<div class="chart-item-wrapper">
		<component
			:is="chartsComponent"
			:chartConfig="chartConfig"
			:themeSetting="themeSetting"
			:themeColor="themeColor"
			class="chart-component"
		></component>
	</div>
</template>

<script setup lang="ts" name="DashboardChartItem">
import { PropType, computed } from "vue";
import { DashboardComponent } from "@/views/dashboard/components/types";

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

// 动态导入组件
const modules = import.meta.glob("../components/**/**/index.vue", { eager: true }) as any;
console.log(modules);

const chartsComponent = computed(() => {
	return modules[`../components/${props.chartConfig.componentType}/${props.chartConfig.componentName}/index.vue`]?.default;
});
</script>

<style scoped lang="scss">
.chart-item-wrapper {
	height: 100%;
	width: 100%;
	overflow: hidden;
}
</style>
