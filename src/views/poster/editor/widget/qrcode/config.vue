<template>
	<BaseConfig :widgetConfig="widgetConfig" />
	<el-form ref="formRef" :model="widgetConfig" label-width="120px" label-position="top">
		<el-form-item label="二维码链接">
			<el-input v-model="widgetConfig.url" />
		</el-form-item>
		<el-form-item label="尺寸">
			<el-input-number v-model="widgetConfig.size" />
		</el-form-item>
		<el-form-item label="背景色">
			<g-color-picker v-model="widgetConfig.bgColor" :show-alpha="false" />
		</el-form-item>
		<el-form-item label="背景色">
			<g-color-picker v-model="widgetConfig.fgColor" :show-alpha="false" />
		</el-form-item>
		<el-form-item label="边距">
			<el-input-number v-model="widgetConfig.margin" />
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts" name="QrcodeConfig">
import { PropType } from "vue";
import BaseConfig from "../common/BaseConfig.vue";
import { QrcodeWidget } from "@/views/poster/editor/widget/qrcode/qrcodeWidget";
import GColorPicker from "@/components/UI/color-picker/src/index.vue";

defineProps({
	widgetConfig: {
		type: Object as PropType<QrcodeWidget>,
		required: true
	}
});
</script>

<style scoped lang="scss"></style>
