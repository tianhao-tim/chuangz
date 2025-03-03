<template>
	<BaseConfig :widgetConfig="widgetConfig" />
	<el-form ref="formRef" :model="widgetConfig" label-width="120px" label-position="top">
		<el-form-item label="图片链接">
			<g-upload-image v-model="widgetConfig.imgUrl" />
		</el-form-item>
		<el-form-item label="缩放模式">
			<el-select v-model="widgetConfig.zoomMode" placeholder="请选择">
				<el-option label="原始比例" :value="ZoomMode.Origin" />
				<el-option label="宽度比例" :value="ZoomMode.Width" />
				<el-option label="强制缩放" :value="ZoomMode.WidthHeight" />
			</el-select>
		</el-form-item>
		<el-form-item label="模糊">
			<el-input-number v-model="widgetConfig.blur" />
		</el-form-item>
		<el-form-item label="旋转">
			<el-input-number v-model="widgetConfig.rotate" />
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts" name="ImageConfig">
import { PropType } from "vue";
import BaseConfig from "../common/BaseConfig.vue";
import { ImageWidget, ZoomMode } from "@/views/poster/editor/widget/image/imageWidget";

defineProps({
	widgetConfig: {
		type: Object as PropType<ImageWidget>,
		required: true
	}
});
</script>

<style scoped lang="scss"></style>
