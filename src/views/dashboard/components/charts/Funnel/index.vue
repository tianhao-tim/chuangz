<template>
	<v-chart ref="vChartRef" :theme="themeColor" :option="option" autoresize></v-chart>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { FunnelChart } from "echarts/charts";
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent, TitleComponent } from "echarts/components";
import { includes } from "./config";
import { DashboardComponent } from "@/views/dashboard/components/types";
import { mergeTheme } from "@/views/dashboard/components/chart";
import { useChartDataFetch } from "@/views/dashboard/components/useChartDataFetch";

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

use([DatasetComponent, CanvasRenderer, FunnelChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent]);

const option = computed(() => {
	return mergeTheme(props.chartConfig.config, props.themeSetting, includes);
});

const { vChartRef } = useChartDataFetch(props.chartConfig);
</script>
