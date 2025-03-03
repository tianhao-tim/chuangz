<template>
	<v-chart ref="vChartRef" :theme="themeColor" :option="option" autoresize></v-chart>
</template>

<script setup lang="ts">
import { computed, PropType, watch } from "vue";
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { RadarChart } from "echarts/charts";
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent, TitleComponent } from "echarts/components";
import { DashboardComponent } from "@/views/dashboard/components/types";
import { mergeTheme } from "@/views/dashboard/components/chart";
import { useChartDataFetch } from "@/views/dashboard/components/useChartDataFetch";
import { includes } from "./config";
import dataJson from "./data.json";
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

use([DatasetComponent, CanvasRenderer, RadarChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent]);

const dataSetHandle = (dataset: typeof dataJson) => {
	if (dataset.seriesData) {
		props.chartConfig.config.series[0].data = dataset.seriesData;
		props.chartConfig.config.legend.data = dataset.seriesData.map((i: { name: string }) => i.name);
	}
	if (dataset.radarIndicator) {
		props.chartConfig.config.radar.indicator = dataset.radarIndicator;
	}
	if (vChartRef.value) {
		vChartRef.value.setOption(props.chartConfig.config);
	}
};

watch(
	() => props.chartConfig.config.type,
	newData => {
		if (newData === "nomal") {
			props.chartConfig.config.series[0].radius = "70%";
			props.chartConfig.config.series[0].roseType = false;
		} else if (newData === "ring") {
			props.chartConfig.config.series[0].radius = ["40%", "65%"];
			props.chartConfig.config.series[0].roseType = false;
		} else {
			props.chartConfig.config.series[0].radius = "70%";
			props.chartConfig.config.series[0].roseType = true;
		}
	},
	{ deep: false, immediate: true }
);

// dataset 无法变更条数的补丁
watch(
	() => props.chartConfig.config.dataset,
	newData => {
		dataSetHandle(newData);
	}
);

const option = computed(() => {
	return mergeTheme(props.chartConfig.config, props.themeSetting, includes);
});

const { vChartRef } = useChartDataFetch(props.chartConfig, (newData: typeof dataJson) => {
	dataSetHandle(newData);
});
</script>
