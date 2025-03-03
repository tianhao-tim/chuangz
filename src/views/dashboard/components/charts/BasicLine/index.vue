<template>
	<v-chart
		ref="vChartRef"
		:theme="themeColor"
		:option="option"
		:update-options="{
			replaceMerge: replaceMergeArr
		}"
		autoresize
	></v-chart>
</template>

<script setup lang="ts">
import { ref, computed, PropType, watch, nextTick } from "vue";
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent, TitleComponent } from "echarts/components";
import { DashboardComponent } from "@/views/dashboard/components/types";
import { mergeTheme } from "@/views/dashboard/components/chart";
import { includes, seriesItem } from "./config";
import { useChartDataFetch } from "@/views/dashboard/components/useChartDataFetch";
import { isObject } from "@vue/shared";
import { cloneDeep } from "lodash-es";

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

use([DatasetComponent, CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent]);

const replaceMergeArr = ref<string[]>();

// dataset 无法变更条数的补丁
watch(
	() => props.chartConfig.config.dataset,
	(newData: { dimensions: any }) => {
		try {
			if (!isObject(newData) || !("dimensions" in newData)) return;
			if (Array.isArray(newData?.dimensions)) {
				const seriesArr = [];
				for (let i = 0; i < newData.dimensions.length - 1; i++) {
					seriesArr.push(cloneDeep(seriesItem));
				}
				replaceMergeArr.value = ["series"];
				props.chartConfig.config.series = seriesArr;
				nextTick(() => {
					replaceMergeArr.value = [];
				});
			}
		} catch (error) {
			console.log(error);
		}
	},
	{
		deep: false
	}
);

const option = computed(() => {
	return mergeTheme(props.chartConfig.config, props.themeSetting, includes);
});

const { vChartRef } = useChartDataFetch(props.chartConfig);
</script>
