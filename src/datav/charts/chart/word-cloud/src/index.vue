<template>
	<div class="datav-wrapper" :style="wrapperStyle">
		<v-chart ref="chartRef" :option="option" autoresize v-if="dv_data.data" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, toRef, ref, onMounted, watch } from "vue";
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import "echarts-wordcloud";
import { GridComponent, TooltipComponent } from "echarts/components";
import { useDataCenter } from "@/datav/mixins/useDataCenter";
import { WordCloud } from "./word-cloud";
import { useApiStore } from "@/store/modules/api";

use([CanvasRenderer, GridComponent, TooltipComponent]);

export default defineComponent({
	name: "VWordCloud",
	components: {
		VChart
	},
	props: {
		com: {
			type: Object as PropType<WordCloud>,
			required: true
		}
	},
	setup(props) {
		const apiStore = useApiStore();

		useDataCenter(props.com);

		const dv_data = computed(() => {
			return apiStore.dataMap[props.com.id]?.source ?? {};
		});

		const config = toRef(props.com, "config");
		const attr = toRef(props.com, "attr");

		const chartRef = ref(null);

		const wrapperStyle = computed(() => {
			return {
				width: `${attr.value.w}px`,
				height: `${attr.value.h}px`
			};
		});

		const maskImage = new Image();
		maskImage.crossOrigin = "*";
		maskImage.onload = () => {
			if (chartRef.value) {
				chartRef.value.setOption({
					series: {
						maskImage: config.value.global.drawType === "image" ? maskImage : null
					}
				});
			}
		};

		const option = computed(() => {
			const { global, series, tooltip, animation } = config.value;
			return {
				tooltip: {
					show: tooltip.show,
					borderWidth: 0,
					padding: 10,
					textStyle: {
						...tooltip.textStyle
					},
					backgroundColor: tooltip.backgroundColor
				},
				series: {
					type: "wordCloud",
					shape: global.shape,
					// maskImage: maskImage,
					left: "left",
					top: "top",
					right: null,
					bottom: null,
					width: "100%",
					height: "100%",
					sizeRange: [global.min, global.max],
					rotationRange: [global.rotationRange.min, global.rotationRange.max],
					rotationStep: global.rotate,
					gridSize: 8,
					drawOutOfBound: false,
					layoutAnimation: animation.enabled,
					textStyle: {
						fontFamily: global.fontFamily,
						color: (w: any) => {
							const c = series?.find(m => m.name == w.data.s);
							return c ? c.color : "#fff";
						}
					},
					data: dv_data.value?.data?.map((m: any) => ({
						name: m.name,
						value: m.value,
						s: m.type
					}))
				}
			};
		});

		const loadImg = () => {
			const { global } = config.value;
			maskImage.src = global.drawType === "image" ? global.image : "";
		};

		watch(
			() => ({
				drawType: config.value.global.drawType,
				image: config.value.global.image
			}),
			() => {
				loadImg();
			}
		);

		onMounted(() => {
			loadImg();
		});

		return {
			chartRef,
			wrapperStyle,
			option,
			dv_data
		};
	}
});
</script>
