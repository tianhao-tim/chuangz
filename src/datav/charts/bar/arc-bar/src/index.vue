<template>
	<div class="datav-wrapper" :style="wrapperStyle">
		<v-chart :option="option" autoresize @click="onClick" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRef } from "vue";
import VChart from "vue-echarts";
import { graphic, use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import { GridComponent, LegendComponent, PolarComponent, TooltipComponent } from "echarts/components";
import { useDataCenter } from "@/datav/mixins/useDataCenter";
import { useApiStore } from "@/store/modules/api";
import { ArcBar } from "./arc-bar";

use([CanvasRenderer, BarChart, PolarComponent, GridComponent, TooltipComponent, LegendComponent]);

export default defineComponent({
	name: "VArcBar",
	components: {
		VChart
	},
	props: {
		com: {
			type: Object as PropType<ArcBar>,
			required: true
		}
	},
	setup(props) {
		const apiStore = useApiStore();
		const { datavEmit } = useDataCenter(props.com);

		const dv_data = computed(() => {
			return apiStore.dataMap[props.com.id]?.source ?? [];
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
			const series = dv_data.value.series;
			return series?.map((item: any, idx: number) => {
				const color = config.value.series[idx]?.color;
				let itemStyle = {};
				if (color) {
					itemStyle = {
						color:
							color.type === "gradient"
								? new graphic.LinearGradient(0, 0, 0, 1, [
										{
											offset: 0,
											color: color.from
										},
										{
											offset: 1,
											color: color.to
										}
								  ])
								: color.value
					};
				}
				return {
					type: "bar",
					coordinateSystem: "polar",
					name: item.name,
					label: {
						show: label.show,
						position: label.position,
						...label.textStyle,
						offset: [label.offsetX, label.offsetY]
					},
					itemStyle: itemStyle,
					barGap: `${global.innerPadding}%`,
					barWidth: global.barWidth,
					barCategoryGap: `${global.outerPadding}%`,
					showBackground: global.background.show,
					backgroundStyle: {
						color: global.background.color
					},
					roundCap: true,
					data: item.data
				};
			});
		};

		const option = computed(() => {
			const { global, tooltip, legend, animation } = config.value;
			const [legendTop, legendLeft] = legend.position.split("-");
			const pointerLineStyle = {
				type:
					tooltip.pointer.line.type === "dashed" ? [tooltip.pointer.line.dashedLength, tooltip.pointer.line.dashedSpace] : tooltip.pointer.line.type,
				width: tooltip.pointer.line.width,
				color: tooltip.pointer.line.color
			};

			return {
				textStyle: {
					fontFamily: global.fontFamily
				},
				grid: {
					...global.margin
				},
				tooltip: {
					show: tooltip.show,
					textStyle: {
						...tooltip.textStyle
					},
					padding: [tooltip.background.padding.v, tooltip.background.padding.h],
					backgroundColor: tooltip.background.color,
					trigger: tooltip.pointer.show ? "axis" : "item",
					axisPointer: {
						type: tooltip.pointer.show ? "cross" : "none",
						label: {
							show: false
						},
						lineStyle: pointerLineStyle,
						crossStyle: pointerLineStyle
					},
					borderWidth: 0
				},
				legend: {
					show: legend.show,
					top: legendTop,
					left: legendLeft,
					orient: legend.orient,
					textStyle: {
						...legend.textStyle
					},
					icon: legend.symbol.show ? (legend.symbol.icon === "auto" ? null : legend.symbol.icon) : "none",
					itemWidth: legend.symbol.width,
					itemHeight: legend.symbol.height,
					itemGap: legend.symbol.gap,
					type: legend.page.enabled ? "scroll" : "plain",
					width: legend.page.enabled ? legend.page.size.width : "auto",
					height: legend.page.enabled ? legend.page.size.height : "auto",
					pageIconSize: legend.page.button.size,
					pageIconColor: legend.page.button.color,
					pageIconInactiveColor: legend.page.button.inactiveColor,
					pageTextStyle: {
						color: legend.page.pageNumColor
					}
				},
				angleAxis: {
					// 不显示经度线
					show: false,
					min: function () {
						return 0;
					},
					max: function (value: any) {
						return (value.max * 4) / 3;
					}
				},
				radiusAxis: {
					type: "category",
					axisLabel: {
						interval: 0,
						color: "#FFF",
						fontSize: 18
					},
					axisLine: {
						show: false
					},
					axisTick: {
						show: false,
						alignWithLabel: true
					},
					splitLine: {
						show: false,
						lineStyle: {
							color: "rgba(17, 51, 68, 0.8)"
						}
					},
					data: dv_data.value.categories
				},
				polar: {
					show: 0,
					center: ["50%", "50%"]
				},
				animation: animation.enabled,
				animationDuration: animation.duration,
				animationEasing: animation.easing as any,
				animationDelay: animation.delay,
				animationDurationUpdate: animation.easing as any,
				series: getSeries()
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
			onClick
		};
	}
});
</script>
