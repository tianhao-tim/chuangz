<template>
	<div class="datav-wrapper" :style="wrapperStyle">
		<v-chart :option="option" autoresize @click="onClick" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "VBasicLine"
});
</script>

<script lang="ts" setup>
import { computed, PropType, toRef } from "vue";
import dayjs from "dayjs";
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { GridComponent, LegendComponent, TooltipComponent } from "echarts/components";
import { useDataCenter } from "@/datav/mixins/useDataCenter";
import { useApiStore } from "@/store/modules/api";
import { getAutoValue, getLimitValue, valueFormater } from "@/datav/charts/echarts-utils";
import { BasicLine } from "./basic-line";

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent]);

const props = defineProps({
	com: {
		type: Object as PropType<BasicLine>,
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
	const { global, yAxis } = config.value;
	const seriesConf = config.value.series;
	const series = dv_data.value.series;
	return series?.map((item: any, idx: number) => {
		let seriesStyle = {};
		const conf = seriesConf[idx];
		if (conf) {
			seriesStyle = {
				lineStyle: {
					color: conf.line.color,
					type: conf.line.style,
					width: conf.line.width,
					opacity: conf.line.opacity
				},
				smooth: conf.line.smooth,
				symbol: conf.point.icon,
				itemStyle: {
					...conf.point
				},
				label: {
					show: conf.label.show,
					...conf.label.textStyle,
					offset: [conf.label.offset.x, conf.label.offset.y],
					rotate: conf.label.rotate,
					textBorderColor: conf.label.stroke.color,
					textBorderWidth: conf.label.stroke.width,
					// formatter 函数变化时，并不会更新视图，所以平铺到 option 里
					field: conf.label.field,
					valueFormat: conf.label.valueFormat,
					prefix: conf.label.describe.prefix,
					suffix: conf.label.describe.suffix,
					formatter: (params: any) => {
						let val = params.data.dataRef[conf.label.field] ?? params.value;
						if (yAxis.type === "value") {
							val = valueFormater(val, conf.label.valueFormat);
						}
						return conf.label.describe.prefix + val + conf.label.describe.suffix;
					}
				}
			};
		}
		return {
			type: "line",
			name: item.name,
			connectNulls: global.connectNulls,
			...seriesStyle,
			data: item.data
		};
	});
};

const option = computed(() => {
	const { global, xAxis, yAxis, tooltip, legend, animation } = config.value;
	const [legendTop, legendLeft] = legend.position.split("-");
	const pointerLineStyle = {
		type: tooltip.pointer.line.type === "dashed" ? [tooltip.pointer.line.dashedLength, tooltip.pointer.line.dashedSpace] : tooltip.pointer.line.type,
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
			triggerOn: tooltip.triggerOn,
			trigger: tooltip.pointer.show ? "axis" : "item",
			axisPointer: {
				type: tooltip.pointer.show ? "cross" : "none",
				label: {
					show: false
				},
				lineStyle: pointerLineStyle,
				crossStyle: pointerLineStyle
			},
			borderWidth: tooltip.background.borderWidth,
			borderColor: tooltip.background.borderColor
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
		xAxis: {
			show: xAxis.show,
			type: xAxis.type,
			boundaryGap: xAxis.boundaryGap,
			name: xAxis.title.show ? xAxis.title.name : "",
			nameLocation: xAxis.title.location,
			nameRotate: xAxis.title.display.rotate,
			nameGap: xAxis.title.display.offset,
			nameTextStyle: {
				...xAxis.title.textStyle
			},
			axisLine: {
				show: xAxis.axisLine.show,
				lineStyle: {
					type: xAxis.axisLine.type,
					width: xAxis.axisLine.width,
					color: xAxis.axisLine.color
				}
			},
			axisTick: {
				show: xAxis.axisTick.show,
				lineStyle: {
					type: xAxis.axisTick.type,
					width: xAxis.axisTick.width,
					color: xAxis.axisTick.color
				},
				alignWithLabel: true
			},
			axisLabel: {
				show: xAxis.axisLabel.show,
				interval: getAutoValue(xAxis.axisLabel.interval),
				rotate: xAxis.axisLabel.display.rotate,
				margin: xAxis.axisLabel.display.margin,
				align: xAxis.axisLabel.align,
				...xAxis.axisLabel.textStyle,
				timeFormat: xAxis.axisLabel.timeFormat,
				valueFormat: xAxis.axisLabel.valueFormat,
				formatter: (val: string) => {
					if (xAxis.type === "time") {
						return dayjs(val).format(xAxis.axisLabel.timeFormat);
					} else if (xAxis.type === "value") {
						return valueFormater(val, xAxis.axisLabel.valueFormat);
					}
					return val;
				}
			},
			splitLine: {
				show: xAxis.grid.show,
				lineStyle: {
					type: xAxis.grid.line.type === "dashed" ? [xAxis.grid.line.dashedLength, xAxis.grid.line.dashedSpace] : xAxis.grid.line.type,
					width: xAxis.grid.line.width,
					color: xAxis.grid.line.color
				}
			},
			min: xAxis.type === "value" ? getLimitValue(xAxis.extent.min) : undefined,
			max: xAxis.type === "value" ? getLimitValue(xAxis.extent.max) : undefined,
			data: dv_data.value.categories
		},
		yAxis: {
			show: yAxis.show,
			type: yAxis.type,
			name: yAxis.title.show ? yAxis.title.name : "",
			nameLocation: yAxis.title.location,
			nameRotate: yAxis.title.display.rotate,
			nameGap: yAxis.title.display.offset,
			nameTextStyle: {
				...yAxis.title.textStyle
			},
			axisLine: {
				show: yAxis.axisLine.show,
				lineStyle: {
					type: yAxis.axisLine.type,
					width: yAxis.axisLine.width,
					color: yAxis.axisLine.color
				}
			},
			axisTick: {
				show: yAxis.axisTick.show,
				lineStyle: {
					type: yAxis.axisTick.type,
					width: yAxis.axisTick.width,
					color: yAxis.axisTick.color
				},
				alignWithLabel: true
			},
			boundaryGap: [`${yAxis.axisLabel.boundaryGap}%`, `${yAxis.axisLabel.boundaryGap}%`],
			axisLabel: {
				show: yAxis.axisLabel.show,
				rotate: yAxis.axisLabel.display.rotate,
				margin: yAxis.axisLabel.display.margin,
				align: yAxis.axisLabel.align,
				...yAxis.axisLabel.textStyle,
				timeFormat: yAxis.axisLabel.timeFormat,
				valueFormat: yAxis.axisLabel.valueFormat,
				formatter: (val: string) => {
					if (yAxis.type === "time") {
						return dayjs(val).format(yAxis.axisLabel.timeFormat);
					} else if (yAxis.type === "value") {
						return valueFormater(val, yAxis.axisLabel.valueFormat);
					}
					return val;
				}
			},
			splitLine: {
				show: yAxis.grid.show,
				lineStyle: {
					type: yAxis.grid.line.type === "dashed" ? [yAxis.grid.line.dashedLength, yAxis.grid.line.dashedSpace] : yAxis.grid.line.type,
					width: yAxis.grid.line.width,
					color: yAxis.grid.line.color
				}
			},
			min: yAxis.type === "value" ? getLimitValue(yAxis.extent.min) : undefined,
			max: yAxis.type === "value" ? getLimitValue(yAxis.extent.max) : undefined
		},
		animation: animation.enabled,
		animationDuration: animation.duration,
		animationEasing: animation.easing,
		animationDelay: animation.delay,
		series: getSeries()
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
