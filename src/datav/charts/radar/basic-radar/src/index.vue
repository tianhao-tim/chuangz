<template>
	<div class="datav-wrapper" :style="wrapperStyle">
		<v-chart :option="option" autoresize @click="onClick" v-if="dv_data" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRef } from "vue";
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { RadarChart } from "echarts/charts";
import { GridComponent, LegendComponent, TooltipComponent } from "echarts/components";
import { useDataCenter } from "@/datav/mixins/useDataCenter";
import { useApiStore } from "@/store/modules/api";
import { BasicRadar } from "./basic-radar";

use([CanvasRenderer, RadarChart, GridComponent, TooltipComponent, LegendComponent]);

export default defineComponent({
	name: "VBasicRadar",
	components: {
		VChart
	},
	props: {
		com: {
			type: Object as PropType<BasicRadar>,
			required: true
		}
	},
	setup(props) {
		const apiStore = useApiStore();
		const { datavEmit } = useDataCenter(props.com);

		const dv_data = computed(() => {
			return apiStore.dataMap[props.com.id]?.source ?? {};
		});

		const config = toRef(props.com, "config");
		const attr = toRef(props.com, "attr");

		const wrapperStyle = computed(() => {
			return {
				width: `${attr.value.w}px`,
				height: `${attr.value.h}px`
			};
		});

		const getSeries = () => {
			const { global, label } = config.value;
			const { series } = dv_data.value;
			return series?.map((item: any, index: number) => {
				return {
					type: "radar",
					name: item.name ?? `系列${index + 1}`,
					symbolSize: global.symbolSize,
					label: {
						show: label.show,
						position: label.position,
						...label.textStyle,
						formatter: label.formatter || "{c}"
					},
					areaStyle: {
						opacity: global.areaStyle.opacity
					},
					data: item.data
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
				radar: {
					indicator: dv_data.value?.indicator,
					startAngle: global.startAngle,
					shape: global.shape,
					splitNumber: global.splitNumber,
					center: global.center,
					radius: global.radius,
					splitLine: {
						show: global.splitLine.show,
						lineStyle: {
							color: global.splitLine.lineStyle.color
						}
					},
					splitArea: {
						show: global.splitArea.show,
						areaStyle: { ...global.splitArea.areaStyle }
					},
					axisLine: {
						show: global.axisLine.show,
						lineStyle: {
							color: global.axisLine.lineStyle.color
						}
					},
					axisName: {
						show: global.axisName.show,
						color: global.axisName.color
					}
				},
				series: getSeries(),
				color: config.value.color,
				animation: animation.enabled,
				animationDuration: animation.duration,
				animationEasing: animation.easing as any,
				animationDelay: animation.delay
			};
		});

		const onClick = (params: any) => {
			datavEmit("click", {
				...params.data.dataRef,
				x: params.name,
				y: params.value
			});
		};

		return {
			wrapperStyle,
			option,
			dv_data,
			onClick
		};
	}
});
</script>
