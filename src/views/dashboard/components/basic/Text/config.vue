<template>
	<g-field-collapse label="文字" expand>
		<g-field :level="2" label="内容">
			<g-input v-model="optionData.dataset.text" size="small"></g-input>
		</g-field>
		<g-field :level="2" label="跳转连接">
			<g-input v-model="optionData.link" size="small"></g-input>
		</g-field>
	</g-field-collapse>
	<g-field-collapse label="样式">
		<g-field-collapse label="文字">
			<g-field :level="2" label="颜色">
				<g-color-picker size="small" :modes="['hex']" v-model="optionData.fontColor"></g-color-picker>
			</g-field>
			<g-field :level="2" label="字体大小">
				<g-input-number v-model="optionData.fontSize" size="small" placeholder="字体大小"></g-input-number>
			</g-field>
			<g-field :level="2" label="字体粗细">
				<g-select v-model="optionData.fontWeight" size="small" :data="fontWeightOptions" />
			</g-field>
			<g-field :level="2" label="X轴内边距">
				<g-input-number v-model="optionData.paddingX" size="small" placeholder="输入内边距"></g-input-number>
			</g-field>
			<g-field :level="2" label="Y轴内边距">
				<g-input-number v-model="optionData.paddingY" size="small" placeholder="输入内边距"></g-input-number>
			</g-field>

			<g-field :level="2" label="水平对齐">
				<g-select v-model="optionData.textAlign" size="small" :data="textAlignOptions" />
			</g-field>
			<g-field :level="2" label="文本方向">
				<g-select v-model="optionData.writingMode" size="small" :data="verticalOptions" />
			</g-field>

			<g-field :level="2" label="字间距">
				<g-input-number v-model="optionData.letterSpacing" size="small" placeholder="输入字间距"></g-input-number>
			</g-field>
		</g-field-collapse>

		<g-field-collapse label="边框">
			<g-field :level="2" label="宽度">
				<g-input-number v-model="optionData.borderWidth" size="small" :min="0" placeholder="宽度"></g-input-number>
			</g-field>
			<g-field :level="2" label="颜色">
				<g-color-picker size="small" :modes="['hex']" v-model="optionData.borderColor"></g-color-picker>
			</g-field>
			<g-field :level="2" label="圆角">
				<g-input-number v-model="optionData.borderRadius" size="small" :min="0" placeholder="圆角"></g-input-number>
			</g-field>
		</g-field-collapse>

		<g-field-collapse label="背景" :alone="true">
			<g-field :level="2" label="背景颜色">
				<g-color-picker size="small" :modes="['hex']" v-model="optionData.backgroundColor"></g-color-picker>
			</g-field>
		</g-field-collapse>
	</g-field-collapse>
</template>

<script setup lang="ts" name="TextConfig">
import { PropType, computed } from "vue";
import { DashboardComponent } from "@/views/dashboard/components/types";
import { WritingModeEnum, WritingModeObject, FontWeightEnum, FontWeightObject } from "./config";

const props = defineProps({
	chartConfig: {
		type: Object as PropType<DashboardComponent>,
		required: true
	}
});

const optionData = computed(() => {
	return props.chartConfig.config;
});

const textAlignOptions = [
	{ value: "左对齐", id: "start" },
	{ value: "居中", id: "center" },
	{ value: "右对齐", id: "end" }
];

const verticalOptions = [
	{
		value: WritingModeEnum.HORIZONTAL,
		id: WritingModeObject[WritingModeEnum.HORIZONTAL]
	},
	{
		value: WritingModeEnum.VERTICAL,
		id: WritingModeObject[WritingModeEnum.VERTICAL]
	}
];
const fontWeightOptions = [
	{
		value: FontWeightEnum.NORMAL,
		id: FontWeightObject[FontWeightEnum.NORMAL]
	},
	{
		value: FontWeightEnum.BOLD,
		id: FontWeightObject[FontWeightEnum.BOLD]
	}
];
</script>
<style scoped lang="scss"></style>
