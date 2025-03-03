<template>
	<g-field-collapse label="标题文本" toggle v-model="title.show">
		<g-field-collapse label="标题">
			<g-field :level="2" label="文本">
				<g-input v-model="title.text" />
			</g-field>
			<g-field :level="2" label="颜色">
				<g-color-picker v-model="title.textStyle.color" size="small"></g-color-picker>
			</g-field>
			<g-field :level="2" label="大小">
				<g-input-number v-model="title.textStyle.fontSize" :min="1" size="small"></g-input-number>
			</g-field>
			<g-field :level="2" label="粗细">
				<g-select v-model="title.textStyle.fontWeight" :data="fontWeights" size="small" />
			</g-field>
			<g-field :level="2" label="链接">
				<g-input v-model="title.link" size="small" />
			</g-field>
		</g-field-collapse>
		<g-field-collapse label="副标题">
			<g-field :level="2" label="文本">
				<g-input v-model="title.subtext" />
			</g-field>
			<g-field :level="2" label="颜色">
				<g-color-picker size="small" v-model="title.subtextStyle.color"></g-color-picker>
			</g-field>
			<g-field :level="2" label="大小">
				<g-input-number v-model="title.subtextStyle.fontSize" :min="1" size="small"></g-input-number>
			</g-field>
			<g-field :level="2" label="粗细">
				<g-select v-model="title.subtextStyle.fontWeight" :data="fontWeights" />
			</g-field>
			<g-field :level="2" label="链接">
				<g-input v-model="title.sublink" />
			</g-field>
		</g-field-collapse>
	</g-field-collapse>

	<g-field-collapse v-if="xAxis" label="X轴" toggle v-model="xAxis.show">
		<g-field-collapse label="单位">
			<g-field :level="2" label="名称">
				<g-input v-model="xAxis.name" size="small"></g-input>
			</g-field>
			<g-field :level="2" label="颜色">
				<g-color-picker size="small" v-model="xAxis.nameTextStyle.color"></g-color-picker>
			</g-field>
			<g-field :level="2" label="大小">
				<g-input-number v-model="xAxis.nameTextStyle.fontSize" :min="12" size="small"></g-input-number>
			</g-field>
			<g-field :level="2" label="偏移量">
				<g-input-number v-model="xAxis.nameGap" :min="5" size="small"></g-input-number>
			</g-field>
		</g-field-collapse>
		<g-field-collapse label="标签">
			<g-field :level="2" label="展示">
				<el-space>
					<el-switch v-model="xAxis.axisLabel.show" size="small"></el-switch>
				</el-space>
			</g-field>
			<g-field :level="2" label="颜色">
				<g-color-picker size="small" v-model="xAxis.axisLabel.color"></g-color-picker>
			</g-field>
			<g-field :level="2" label="大小">
				<g-input-number v-model="xAxis.axisLabel.fontSize" :min="8" size="small"></g-input-number>
			</g-field>
		</g-field-collapse>
		<g-field-collapse label="轴线">
			<g-field :level="2" label="展示">
				<el-space>
					<el-switch v-model="xAxis.axisLine.show" size="small"></el-switch>
				</el-space>
			</g-field>
			<g-field :level="2" label="颜色">
				<g-color-picker v-model="xAxis.axisLine.lineStyle.color" size="small"></g-color-picker>
			</g-field>
			<g-field :level="2" label="粗细">
				<g-input-number v-model="xAxis.axisLine.lineStyle.width" :min="1" size="small"></g-input-number>
			</g-field>
			<g-field :level="2" label="位置">
				<g-select v-model="xAxis.position" size="small" :data="axisConfig.xposition"></g-select>
			</g-field>
			<g-field :level="2" label="对齐零">
				<el-space>
					<el-switch v-model="xAxis.axisLine.onZero" size="small"></el-switch>
				</el-space>
			</g-field>
			<g-field :level="2" label="反向">
				<el-space>
					<el-switch v-model="xAxis.inverse" size="small"></el-switch>
				</el-space>
			</g-field>
		</g-field-collapse>
		<g-field-collapse label="刻度">
			<g-field :level="2" label="展示">
				<el-space>
					<el-switch v-model="xAxis.axisTick.show" size="small"></el-switch>
				</el-space>
			</g-field>
			<g-field :level="2" label="长度">
				<g-input-number v-model="xAxis.axisTick.length" :min="1" size="small"></g-input-number>
			</g-field>
		</g-field-collapse>
		<g-field-collapse label="分割线">
			<g-field :level="2" label="展示">
				<el-space>
					<el-switch v-model="xAxis.splitLine.show" size="small"></el-switch>
				</el-space>
			</g-field>
			<g-field :level="2" label="颜色">
				<g-color-picker v-model="xAxis.splitLine.lineStyle.color" size="small"></g-color-picker>
			</g-field>
			<g-field :level="2" label="粗细">
				<g-input-number v-model="xAxis.splitLine.lineStyle.width" :min="1" size="small"></g-input-number>
			</g-field>
			<g-field :level="2" label="类型">
				<g-select v-model="xAxis.splitLine.lineStyle.type" size="small" :data="axisConfig.splitLint.lineStyle.type"></g-select>
			</g-field>
		</g-field-collapse>
	</g-field-collapse>

	<g-field-collapse v-if="yAxis" label="Y轴" toggle v-model="yAxis.show">
		<g-field-collapse label="单位">
			<g-field :level="2" label="名称">
				<g-input v-model="yAxis.name" size="small"></g-input>
			</g-field>
			<g-field :level="2" label="颜色">
				<g-color-picker size="small" v-model="yAxis.nameTextStyle.color"></g-color-picker>
			</g-field>
			<g-field :level="2" label="大小">
				<g-input-number v-model="yAxis.nameTextStyle.fontSize" :min="8" size="small"></g-input-number>
			</g-field>
			<g-field :level="2" label="偏移量">
				<g-input-number v-model="yAxis.nameGap" :min="5" size="small"></g-input-number>
			</g-field>
		</g-field-collapse>
		<g-field-collapse label="标签">
			<g-field :level="2" label="展示">
				<el-space>
					<el-switch v-model="yAxis.axisLabel.show" size="small"></el-switch>
				</el-space>
			</g-field>
			<g-field :level="2" label="颜色">
				<g-color-picker size="small" v-model="yAxis.axisLabel.color"></g-color-picker>
			</g-field>
			<g-field :level="2" label="大小">
				<g-input-number v-model="yAxis.axisLabel.fontSize" :min="8" size="small"></g-input-number>
			</g-field>
		</g-field-collapse>
		<g-field-collapse label="轴线">
			<g-field :level="2" label="展示">
				<el-space>
					<el-switch v-model="yAxis.axisLine.show" size="small"></el-switch>
				</el-space>
			</g-field>
			<g-field :level="2" label="颜色">
				<g-color-picker v-model="yAxis.axisLine.lineStyle.color" size="small"></g-color-picker>
			</g-field>
			<g-field :level="2" label="粗细">
				<g-input-number v-model="yAxis.axisLine.lineStyle.width" :min="1" size="small"></g-input-number>
			</g-field>
			<g-field :level="2" label="位置">
				<g-select v-model="yAxis.position" size="small" :data="axisConfig.yposition"></g-select>
			</g-field>
			<g-field :level="2" label="对齐零">
				<el-space>
					<el-switch v-model="yAxis.axisLine.onZero" size="small"></el-switch>
				</el-space>
			</g-field>
			<g-field :level="2" label="反向">
				<el-space>
					<el-switch v-model="yAxis.inverse" size="small"></el-switch>
				</el-space>
			</g-field>
		</g-field-collapse>
		<g-field-collapse label="刻度">
			<g-field :level="2" label="展示">
				<el-space>
					<el-switch v-model="yAxis.axisTick.show" size="small"></el-switch>
				</el-space>
			</g-field>
			<g-field :level="2" label="长度">
				<g-input-number v-model="yAxis.axisTick.length" :min="1" size="small"></g-input-number>
			</g-field>
		</g-field-collapse>
		<g-field-collapse label="分割线">
			<g-field :level="2" label="展示">
				<el-space>
					<el-switch v-model="yAxis.splitLine.show" size="small"></el-switch>
				</el-space>
			</g-field>
			<g-field :level="2" label="颜色">
				<g-color-picker v-model="yAxis.splitLine.lineStyle.color" size="small"></g-color-picker>
			</g-field>
			<g-field :level="2" label="粗细">
				<g-input-number v-model="yAxis.splitLine.lineStyle.width" :min="1" size="small"></g-input-number>
			</g-field>
			<g-field :level="2" label="类型">
				<g-select v-model="yAxis.splitLine.lineStyle.type" size="small" :data="axisConfig.splitLint.lineStyle.type"></g-select>
			</g-field>
		</g-field-collapse>
	</g-field-collapse>

	<g-field-collapse v-if="legend" label="图例" toggle v-model="legend.show">
		<g-field :level="2" label="图例文字">
			<g-color-picker size="small" v-model="legend.textStyle.color"></g-color-picker>
		</g-field>
	</g-field-collapse>
	<g-field-collapse v-if="visualMap" label="视觉映射" toggle v-model="visualMap.show">
		<g-field-collapse label="范围">
			<g-field :level="2" label="最小值">
				<g-input-number v-model="visualMap.min" size="small"></g-input-number>
			</g-field>
			<g-field :level="2" label="最大值">
				<g-input-number v-model="visualMap.max" size="small"></g-input-number>
			</g-field>
		</g-field-collapse>

		<g-field-collapse label="颜色">
			<g-field :label="`层级-${index + 1}`" v-for="(item, index) in visualMap.inRange.color" :key="index">
				<g-color-picker v-model="visualMap.inRange.color[index]" size="small"></g-color-picker>
			</g-field>
		</g-field-collapse>

		<g-field-collapse label="控制块">
			<g-field :level="2" label="放置方向">
				<g-select v-model="visualMap.orient" size="small" :data="axisConfig.visualMap.orient"></g-select>
			</g-field>
			<g-field :level="2" label="宽度">
				<g-input-number v-model="visualMap.itemWidth" :min="5" size="small"></g-input-number>
			</g-field>
			<g-field :level="2" label="高度">
				<g-input-number v-model="visualMap.itemHeight" :min="5" size="small"></g-input-number>
			</g-field>
			<g-field :level="2" label="反转">
				<el-space>
					<el-switch v-model="visualMap.inverse" size="small"></el-switch>
				</el-space>
			</g-field>
			<g-field :level="2" label="拖拽组件实时更新">
				<el-space>
					<el-switch v-model="visualMap.realtime" size="small"></el-switch>
				</el-space>
			</g-field>
		</g-field-collapse>
	</g-field-collapse>
</template>

<script setup lang="ts" name="GlobalSetting">
import { PropType, computed } from "vue";
import { GlobalThemeJsonType } from "../../chartThemes/index";
import { axisConfig } from "./SettingConfig/index";
import { fontWeights } from "@/datav/charts/select-options";

const props = defineProps({
	optionData: {
		type: Object as PropType<GlobalThemeJsonType>,
		required: true
	}
});

const title = computed(() => {
	return props.optionData.title;
});

const xAxis = computed(() => {
	return props.optionData.xAxis;
});

const yAxis = computed(() => {
	return props.optionData.yAxis;
});

const legend = computed(() => {
	return props.optionData.legend;
});

const visualMap = computed(() => {
	return props.optionData?.visualMap;
});
</script>
