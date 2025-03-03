<template>
	<BaseConfig :widgetConfig="widgetConfig" />
	<el-form ref="formRef" :model="widgetConfig" label-width="120px" label-position="top">
		<el-form-item label="居中">
			<el-switch v-model="widgetConfig.center" />
		</el-form-item>
		<el-form-item label="内容">
			<el-input v-model="widgetConfig.text" />
		</el-form-item>
		<el-form-item label="字间距">
			<el-input-number v-model="widgetConfig.space" />
		</el-form-item>
		<el-form-item label="删除线">
			<el-switch v-model="widgetConfig.strikeThrough" />
		</el-form-item>
		<el-form-item label="颜色">
			<g-color-picker v-model="widgetConfig.color" :show-alpha="false" />
		</el-form-item>
		<el-form-item label="字体">
			<el-select v-model="widgetConfig.fontName" placeholder="请选择">
				<el-option v-for="item in fontList" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
		</el-form-item>
		<el-form-item label="字号">
			<el-input-number v-model="widgetConfig.fontSize" />
		</el-form-item>
		<el-form-item label="行高">
			<el-input-number v-model="widgetConfig.lineHeight" />
		</el-form-item>
		<el-form-item label="旋转">
			<el-input-number v-model="widgetConfig.rotate" />
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts" name="TextConfig">
import { PropType } from "vue";
import { TextWidget } from "@/views/poster/editor/widget/text/textWidget";
import BaseConfig from "../common/BaseConfig.vue";

defineProps({
	widgetConfig: {
		type: Object as PropType<TextWidget>,
		required: true
	}
});
const fontList = [
	{
		value: "Alibaba-PuHuiTi-Light",
		label: "阿里巴巴普惠体Light"
	},
	{
		value: "Alibaba-PuHuiTi-Bold",
		label: "阿里巴巴普惠体Bold"
	},
	{
		value: "Alibaba-PuHuiTi-Heavy",
		label: "阿里巴巴普惠体Heavy"
	},
	{
		value: "Alibaba-PuHuiTi-Medium",
		label: "阿里巴巴普惠体Medium"
	},
	{
		value: "Alibaba-PuHuiTi-Regular",
		label: "阿里巴巴普惠体Regular"
	}
];
</script>

<style scoped lang="scss"></style>
