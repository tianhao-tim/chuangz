<template>
	<div class="datav-wrapper" :style="wrapperStyle">
		<v-chart :option="option" autoresize @click="onClick" ref="vChartRef" />
	</div>
</template>
<script lang="ts" setup name="VBasicMap">
import { computed, PropType, ref, toRef, nextTick, watch, reactive } from "vue";
import VChart from "vue-echarts";
import { use, registerMap } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { EffectScatterChart, MapChart } from "echarts/charts";
import { DatasetComponent, GridComponent, TooltipComponent, GeoComponent, VisualMapComponent } from "echarts/components";
import mapJsonWithoutHainanIsLands from "./mapWithoutHainanIsLands.json";
import { useDataCenter } from "@/datav/mixins/useDataCenter";
import { useApiStore } from "@/store/modules/api";
import { BasicMap } from "./basic-map";

use([MapChart, DatasetComponent, CanvasRenderer, GridComponent, TooltipComponent, GeoComponent, EffectScatterChart, VisualMapComponent]);

const props = defineProps({
	com: {
		type: Object as PropType<BasicMap>,
		required: true
	}
});
const vChartRef = ref<typeof VChart>();

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

//动态获取json注册地图
const getGeojson = (regionId: string) => {
	return new Promise<boolean>(resolve => {
		import(`./mapGeojson/${regionId}.json`).then(data => {
			registerMap(regionId, { geoJSON: data.default as any, specialAreas: {} });
			resolve(true);
		});
	});
};

//异步时先注册空的 保证初始化不报错
registerMap(props.com.config.mapRegion.adcode, { geoJSON: {} as any, specialAreas: {} });

// 进行更换初始化地图 如果为china 单独处理
const registerMapInitAsync = async () => {
	await nextTick();
	if (props.com.config.mapRegion.adcode != "china") {
		await getGeojson(props.com.config.mapRegion.adcode);
	} else {
		await hainanLandsHandle(props.com.config.mapRegion.showHainanIsLands);
	}
	vEchartsSetOption();
};
registerMapInitAsync();

// 手动触发渲染
const vEchartsSetOption = () => {
	vChartRef.value?.setOption(option);
};

// 更新数据处理
const dataSetHandle = async (dataset: any) => {
	props.com.config.series.forEach((item: any) => {
		if (item.type === "effectScatter" && dataset.point) item.data = dataset.point;
		else if (item.type === "map" && dataset.map) item.data = dataset.map;
	});
	if (dataset.pieces) props.com.config.visualMap.pieces = dataset.pieces;

	vEchartsSetOption();
};
// 处理海南群岛
const hainanLandsHandle = async (newData: boolean) => {
	if (newData) {
		await getGeojson("china");
	} else {
		registerMap("china", { geoJSON: mapJsonWithoutHainanIsLands as any, specialAreas: {} });
	}
};

//监听 dataset 数据发生变化
watch(
	dv_data,
	(newData: any) => {
		dataSetHandle(newData);
	},
	{
		immediate: true,
		deep: false
	}
);

//监听是否显示南海群岛
watch(
	() => props.com.config.mapRegion.showHainanIsLands,
	async (newData: any) => {
		await hainanLandsHandle(newData);
		vEchartsSetOption();
	},
	{
		deep: false
	}
);

//监听地图展示区域发生变化
watch(
	() => props.com.config.mapRegion.adcode,
	async newData => {
		debugger;
		await getGeojson(newData);
		props.com.config.geo.map = newData;
		props.com.config.series.forEach((item: any) => {
			if (item.type === "map") item.map = newData;
		});
		vEchartsSetOption();
	},
	{
		deep: false
	}
);
const option = reactive({
	textStyle: {
		fontFamily: config.value.global.fontFamily
	},
	tooltip: config.value.tooltip,
	visualMap: config.value.visualMap,
	geo: config.value.geo,
	animation: config.value.animation.enabled,
	animationDuration: config.value.animation.duration,
	animationEasing: config.value.animation.easing,
	animationDelay: config.value.animation.delay,
	series: config.value?.series
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
