<template>
	<div class="datav-wrapper" :style="wrapperStyle">
		<v-chart :option="option" autoresize @click="onClick" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "VPieOneValue"
});
</script>

<script lang="ts" setup>
import { computed, PropType, toRef } from "vue";
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { GridComponent, LegendComponent, TooltipComponent, TitleComponent } from "echarts/components";
import { useDataCenter } from "@/datav/mixins/useDataCenter";
import { useApiStore } from "@/store/modules/api";
import { PieOneValue } from "./pie-one-value";

use([CanvasRenderer, PieChart, GridComponent, TitleComponent, TooltipComponent, LegendComponent]);

const props = defineProps({
	com: {
		type: Object as PropType<PieOneValue>,
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
	const total = dv_data.value.total;
	const value = dv_data.value.value;
	const { global, label } = config.value;
	return [
		{
			type: "pie",
			name: "名称",
			radius: global.radius,
			hoverAnimation: false, // 鼠标hover高亮隐藏
			label: {
				normal: {
					position: "inner",
					show: false
				}
			},
			data: [
				{
					value: value,
					itemStyle: {
						normal: {},
						label: {
							show: false // 去掉指示线
						},
						labelLine: {
							show: false // 去掉指示线
						}
					}
				},
				{
					value: total - value,
					itemStyle: {
						normal: {
							color: "#292b2d"
						},
						label: {
							show: false // 去掉指示线
						},
						labelLine: {
							show: false // 去掉指示线
						}
					}
				}
			]
		}
	];
};

const option = computed(() => {
	const total = dv_data.value.label;
	const value = dv_data.value.value;

	const { global, tooltip, legend, animation, label } = config.value;
	const [legendTop, legendLeft] = legend.position.split("-");
	return {
		title: [
			{
				text: total,
				x: "center",
				y: "center",
				textStyle: {
					color: label.textStyle.color,
					fontSize: label.textStyle.fontSize
				}
			},
			{
				text: value,
				x: "center",
				y: "center",
				top: "55%",
				textStyle: {
					color: label.textStyle.color,
					fontSize: label.textStyle.fontSize,
					bottom: 100
				}
			}
		],
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
		series: getSeries(),
		color: config.value.colors,
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
