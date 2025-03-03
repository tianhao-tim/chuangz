<template>
	<img :style="imageStyle" class="image" :src="widgetConfig.imgUrl" alt="" />
</template>

<script setup lang="ts" name="ImageWidget">
import { computed, PropType } from "vue";
import { ImageWidget, ZoomMode } from "@/views/poster/editor/widget/image/imageWidget";

const props = defineProps({
	widgetConfig: {
		type: Object as PropType<ImageWidget>,
		required: true
	}
});

const imageStyle = computed(() => {
	let objectFit = "none";
	switch (props.widgetConfig.zoomMode) {
		case ZoomMode.Origin:
			objectFit = "none";
			break;
		case ZoomMode.Height:
		case ZoomMode.Width:
			objectFit = "contain";
			break;
		case ZoomMode.WidthHeight:
			objectFit = "cover";
			break;
	}
	return {
		width: props.widgetConfig.width + "px",
		height: props.widgetConfig.height + "px",
		textAlign: props.widgetConfig.center ? "center" : "left",
		borderRadius: props.widgetConfig.roundCorner + "px",
		filter: `blur(${props.widgetConfig.blur}px`,
		objectFit: objectFit
	};
});
</script>

<style scoped lang="scss">
.image {
	user-select: none;
	height: 100%;
	width: 100%;
}
</style>
