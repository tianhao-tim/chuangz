<template>
	<div class="datav-wrapper" :style="wrapperStyle">
		<v-chart :option="option" autoresize @click="onClick" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "VBasicArea"
});
</script>

<script lang="ts" setup>
import { computed, PropType, toRef } from "vue";
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { GridComponent, LegendComponent, TooltipComponent } from "echarts/components";
import { useDataCenter } from "@/datav/mixins/useDataCenter";
import { useApiStore } from "@/store/modules/api";
import { BasicPie } from "./basic-pie";

use([CanvasRenderer, PieChart, GridComponent, TooltipComponent, LegendComponent]);

const props = defineProps({
	com: {
		type: Object as PropType<BasicPie>,
		required: true
	}
});

const apiStore = useApiStore();
const { datavEmit } = useDataCenter(props.com);

const dv_data = computed(() => {
	return apiStore.dataMap[props.com.id]?.source ?? {};
});

const config = toRef(props.com, "config");
const attr = toRef(props.com, "attr");

const wrapperStyle = computed(() => {
	return {
		transform: "translateZ(0)",
		width: `${attr.value.w}px`,
		height: `${attr.value.h}px`
	};
});

const getSeries = () => {
	const series = dv_data.value.series;
	const { global, label } = config.value;
	return series?.map((item: any, idx: number) => {
		return {
			type: "pie",
			name: item.name,
			data: item.data,
			label: {
				show: label.show,
				position: label.position,
				...label.textStyle,
				formatter: label.formatter || "{b}",
				alignTo: label.alignTo,
				bleedMargin: label.bleedMargin,
				distanceToLabelLine: label.distanceToLabelLine
			},
			itemStyle: {
				borderRadius: global.borderRadius
			},
			center: global.center,
			radius: global.radius,
			roseType: global.roseType ? "area" : false
		};
	});
};

const option = computed(() => {
	const { global, tooltip, legend, animation } = config.value;
	const [legendTop, legendLeft] = legend.position.split("-");
	return {
		textStyle: { fontFamily: global.fontFamily },
		legend: {
			show: legend.show,
			top: legendTop,
			left: legendLeft,
			orient: legend.orient,
			textStyle: { ...legend.textStyle },
			icon: legend.symbol.show ? (legend.symbol.icon === "auto" ? null : legend.symbol.icon) : "none",
			itemWidth: legend.symbol.width,
			itemHeight: legend.symbol.height,
			itemGap: legend.symbol.gap
		},
		tooltip: {
			show: tooltip.show,
			textStyle: { ...tooltip.textStyle },
			padding: [tooltip.background.padding.v, tooltip.background.padding.h],
			backgroundColor: tooltip.background.color,
			trigger: "item",
			borderWidth: 0
		},
		color: config.value.colors.map((item: any) => item.color),
		series: getSeries(),
		animation: animation.enabled,
		animationDuration: animation.duration,
		animationEasing: animation.easing,
		animationDelay: animation.delay
	};
});

const onClick = (params: any) => {
	datavEmit("click", {
		...params.data.dataRef,
		x: params.name,
		y: params.value,
		s: params.seriesName
	});
};
</script>
