<template>
	<div class="widget-list-wrapper">
		<div class="widget-item" v-for="w in widgetList" :key="w.label" @click="handleAddWidget(w.type)">
			<i class="fa icon" :class="w.icon" aria-hidden="true"></i>
			<p class="label">{{ w.label }}</p>
		</div>
	</div>
</template>

<script setup lang="ts" name="WidgetList">
import { cloneDeep } from "lodash-es";
import { PosterWidget, PosterWidgetType } from "@/views/poster/editor/types/poster";
import { textWidgetConfig } from "@/views/poster/editor/widget/text/textWidget";
import { imageWidgetConfig } from "@/views/poster/editor/widget/image/imageWidget";
import { qrcodeWidgetConfig } from "@/views/poster/editor/widget/qrcode/qrcodeWidget";

import { generateId } from "@/utils";
import { MessageUtil } from "@/utils/messageUtil";
import { usePosterStore } from "@/store/modules/poster";
const widgetList = [
	{
		icon: "fa-font",
		label: "文字",
		type: PosterWidgetType.TEXT
	},
	{
		icon: "fa-picture-o",
		label: "图片",
		type: PosterWidgetType.IMAGE
	},
	{
		icon: "fa-qrcode",
		label: "二维码",
		type: PosterWidgetType.QRCODE
	}
];

const posterStore = usePosterStore();
const handleAddWidget = (type: PosterWidgetType) => {
	console.log(type);
	let widgetItem: PosterWidget = null;
	switch (type) {
		case PosterWidgetType.TEXT:
			widgetItem = textWidgetConfig;
			break;
		case PosterWidgetType.IMAGE:
			widgetItem = imageWidgetConfig;
			break;
		case PosterWidgetType.QRCODE:
			widgetItem = qrcodeWidgetConfig;
			break;
	}
	if (widgetItem) {
		widgetItem.id = generateId();
		posterStore.addPosterWidget(cloneDeep(widgetItem));
	} else {
		MessageUtil.warning("未知组件类型");
		return;
	}
};
</script>

<style scoped lang="scss">
.widget-list-wrapper {
	.widget-item {
		height: 55px;
		line-height: 55px;
		background-color: var(--el-fill-color-light);
		border-radius: 4px;
		margin: 5px;
		cursor: pointer;
		user-select: none;
		padding-left: 10px;
		.icon {
			margin: 0 10px;
			font-size: 20px;
			display: inline;
		}
		.label {
			color: var(--el-text-color-primary);
			font-size: var(--el-font-size-base);
			display: inline;
		}

		&:hover {
			background-color: var(--el-fill-color);
		}
	}
}
</style>
