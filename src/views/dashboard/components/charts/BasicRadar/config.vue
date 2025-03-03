<template>
	<GlobalSetting :optionData="chartConfig.config" v-if="chartConfig" />

	<g-field-collapse label="雷达" :expanded="true">
		<g-field-collapse label="样式">
			<g-field :level="2" label="背景" v-model="radarConfig.splitArea.show" toggle> </g-field>
			<g-field :level="2" label="分割线" v-model="radarConfig.splitLine.show" toggle> </g-field>
			<g-field :level="2" label="分割线">
				<g-select v-model="radarConfig.shape" size="small" :data="RadarShapeEnumList" placeholder="选择形状" />
			</g-field>
		</g-field-collapse>

		<g-field-collapse label="坐标轴">
			<g-field :level="2" label="轴线" v-model="radarConfig.axisLine.show" toggle> </g-field>
			<g-field :level="2" label="刻度" v-model="radarConfig.axisTick.show" toggle> </g-field>
		</g-field-collapse>

		<g-field-collapse label="范围">
			<g-field :level="2" :label="`最小值：%`">
				<g-input-number v-model="radarProp.radius[0]" :min="0" :max="100" @change="updateRadius0"></g-input-number>
			</g-field>
			<g-field :label="`最大值：%`">
				<g-input-number v-model="radarProp.radius[1]" :min="0" :max="100" @change="updateRadius1"></g-input-number>
			</g-field>
		</g-field-collapse>

		<g-field-collapse label="偏移">
			<g-field :label="`X 轴值：%`">
				<g-input-number v-model="radarProp.center[0]" :min="0" :max="100" @change="updateCenter0"></g-input-number>
			</g-field>
			<g-field :label="`Y 轴值：%`">
				<g-input-number v-model="radarProp.center[1]" :min="0" :max="100" @change="updateCenter1"></g-input-number>
			</g-field>
		</g-field-collapse>

		<g-field-collapse label="指示器">
			<g-field label="颜色">
				<g-color-picker size="small" :modes="['hex']" v-model="radarConfig.axisName.color"></g-color-picker>
			</g-field>
			<g-field label="大小">
				<g-input-number v-model="radarConfig.axisName.fontSize" size="small" :min="9"></g-input-number>
			</g-field>
			<g-field :level="2" label="文字标签" v-model="radarConfig.axisName.show" toggle> </g-field>
		</g-field-collapse>

		<g-field-collapse label="系列" :alone="true">
			<g-field :level="2" label="背景透明度">
				<g-input-number v-model="chartConfig.config.series[0].areaStyle.opacity" size="small" :min="0" :max="1" :step="0.1"></g-input-number>
			</g-field>
		</g-field-collapse>
	</g-field-collapse>
</template>

<script setup lang="ts" name="BasicRadarConfig">
import { PropType, computed, reactive } from "vue";
import { DashboardComponent } from "@/views/dashboard/components/types";
import GlobalSetting from "@/views/dashboard/components/charts/common/GlobalSetting.vue";
import { option, RadarShapeEnumList } from "./config";

const props = defineProps({
	chartConfig: {
		type: Object as PropType<DashboardComponent>,
		required: true
	}
});

const radarConfig = computed<typeof option.radar>(() => {
	return props.chartConfig.config.radar;
});

const radarProp = reactive({
	radius: [0, 60],
	center: [50, 50]
});

// 更新处理
const updateRadius0 = (value: number) => {
	props.chartConfig.config.radar.radius[0] = `${value}%`;
};

const updateRadius1 = (value: number) => {
	props.chartConfig.config.radar.radius[1] = `${value}%`;
};

// 更新处理
const updateCenter0 = (value: number) => {
	props.chartConfig.config.radar.center[0] = `${value}%`;
};

const updateCenter1 = (value: number) => {
	props.chartConfig.config.radar.center[1] = `${value}%`;
};
</script>
<style scoped lang="scss"></style>
