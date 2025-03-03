<template>
	<div class="setting-panel-gui">
		<g-field-collapse label="地图">
			<!--			<g-field :level="2" label="地图区域">-->
			<!--				<g-select v-model="mapRegion.adcode" :data="mapRegionOptions" />-->
			<!--			</g-field>-->
			<g-field :level="2" label="0%区域">
				<g-color-picker v-model="seriesList[1].itemStyle.areaColor.colorStops[0].color" />
			</g-field>
			<g-field :level="2" label="100%区域">
				<g-color-picker v-model="seriesList[1].itemStyle.areaColor.colorStops[1].color" />
			</g-field>
			<g-field :level="2" label="阴影颜色">
				<g-color-picker v-model="seriesList[1].itemStyle.shadowColor" />
			</g-field>
			<g-field :level="2" label="阴影模糊程度">
				<g-input-number v-model="seriesList[1].itemStyle.shadowBlur" :step="1" inline="inline" />
			</g-field>
			<g-field :level="2" label="阴影水平偏移">
				<g-input-number v-model="seriesList[1].itemStyle.shadowOffsetX" :step="1" inline="inline" />
			</g-field>
			<g-field :level="2" label="阴影垂直偏移">
				<g-input-number v-model="seriesList[1].itemStyle.shadowOffsetY" :step="1" inline="inline" />
			</g-field>
		</g-field-collapse>
		<g-field-collapse label="地理信息名称">
			<g-field :level="2" label="显示">
				<el-switch v-model="seriesList[1].label.show"></el-switch>
			</g-field>
			<g-field :level="2" label="字体颜色">
				<g-color-picker v-model="seriesList[1].label.color"></g-color-picker>
			</g-field>
			<g-field :level="2" label="字体大小">
				<g-input-number v-model="seriesList[1].label.fontSize" :min="1"></g-input-number>
			</g-field>
		</g-field-collapse>
		<g-field-collapse label="悬浮 ">
			<g-field :level="2" label="禁用">
				<el-switch v-model="seriesList[1].emphasis.disabled"></el-switch>
			</g-field>
			<g-field :level="2" label="颜色">
				<g-color-picker v-model="seriesList[1].emphasis.itemStyle.areaColor"></g-color-picker>
			</g-field>
			<g-field :level="2" label="字体大小">
				<g-input-number v-model="seriesList[1].emphasis.label.fontSize" :min="1"></g-input-number>
			</g-field>
			<g-field :level="2" label="阴影">
				<g-color-picker :modes="['hex']" v-model="seriesList[1].emphasis.itemStyle.shadowColor"></g-color-picker>
			</g-field>
			<g-field :level="2" label="边框大小">
				<g-input-number v-model="seriesList[1].emphasis.itemStyle.borderWidth" :min="1"></g-input-number>
			</g-field>
			<g-field :level="2" label="文字颜色">
				<g-color-picker v-model="seriesList[1].emphasis.label.color"></g-color-picker>
			</g-field>
		</g-field-collapse>

		<g-field-collapse label="悬浮弹窗">
			<g-field :level="2" label="显示">
				<el-switch v-model="seriesList[1].tooltip.show"></el-switch>
			</g-field>
			<g-field :level="2" label="字体大小">
				<g-input-number v-model="seriesList[1].tooltip.textStyle.fontSize" :min="1"></g-input-number>
			</g-field>
			<g-field :level="2" label="字体颜色">
				<g-color-picker :modes="['hex']" v-model="seriesList[1].tooltip.textStyle.color"></g-color-picker>
			</g-field>
			<g-field :level="2" label="背景颜色">
				<g-color-picker :modes="['hex']" v-model="seriesList[1].tooltip.backgroundColor"></g-color-picker>
			</g-field>
		</g-field-collapse>
		<g-field-collapse label="区域边框">
			<g-field :level="2" label="颜色">
				<g-color-picker :modes="['hex']" v-model="seriesList[1].itemStyle.borderColor"></g-color-picker>
			</g-field>
			<g-field :level="2" label="宽度大小">
				<g-input-number v-model="seriesList[1].itemStyle.borderWidth" :min="1"></g-input-number>
			</g-field>
		</g-field-collapse>
		<g-field-collapse label="其他" v-if="(mapRegion.adcode = 'china')">
			<g-field :level="2" label="显示南海群岛"> <el-switch v-model="mapRegion.showHainanIsLands"></el-switch> </g-field>
		</g-field-collapse>
		<g-field-collapse label="标记" :expanded="true">
			<g-field-collapse label="样式">
				<g-field :level="2" label="大小">
					<g-input-number v-model="seriesList[0].symbolSize" :min="0"></g-input-number>
				</g-field>
				<g-field :level="2" label="颜色">
					<g-color-picker v-model="seriesList[0].itemStyle.color"></g-color-picker>
				</g-field>
			</g-field-collapse>

			<g-field-collapse label="文本">
				<g-field :level="2" label="显示">
					<el-switch v-model="seriesList[0].label.show"></el-switch>
				</g-field>
				<g-field :level="2" label="字体大小">
					<g-input-number v-model="seriesList[0].label.fontSize" :min="0"></g-input-number>
				</g-field>
				<g-field :level="2" label="字体颜色">
					<g-color-picker v-model="seriesList[0].label.color"></g-color-picker>
				</g-field>
			</g-field-collapse>

			<g-field-collapse label="涟漪">
				<g-field :level="2" label="涟漪大小">
					<g-input-number v-model="seriesList[0].rippleEffect.scale" :min="1"></g-input-number>
				</g-field>
				<g-field :level="2" label="涟漪颜色">
					<g-color-picker :modes="['hex']" v-model="seriesList[0].rippleEffect.color"></g-color-picker>
				</g-field>
				<g-field :level="2" label="绘制方式">
					<g-select v-model="seriesList[0].rippleEffect.brushType" :data="rippleEffectOptions" />
				</g-field>
			</g-field-collapse>
		</g-field-collapse>
	</div>
</template>

<script lang="ts" setup name="VBasicMapProp">
import { PropType, computed, ref } from "vue";
import { BasicMap } from "./basic-map";

import mapChinaJson from "./mapGeojson/china.json";

const mapRegionOptions = ref([
	{
		id: "china",
		value: "中国"
	}
]);

const rippleEffectOptions = ref([
	{
		id: "fill",
		value: "实心"
	},
	{
		id: "stroke",
		value: "空心"
	}
]);
const props = defineProps({
	com: {
		type: Object as PropType<BasicMap>,
		required: true
	}
});

// const config = toRef(props.com, "config");

const initMapRegionOptions = () => {
	mapChinaJson.features.forEach((element: any) => {
		if (element.properties.name) {
			mapRegionOptions.value.push({ id: element?.properties.adcode, value: element?.properties.name });
		}
	});
};
initMapRegionOptions();

const seriesList = computed(() => {
	return props.com.config.series;
});

const mapRegion = computed(() => {
	return props.com.config.mapRegion;
});
</script>
