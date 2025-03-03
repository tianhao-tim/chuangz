<template>
	<div :style="textStyle" class="text">
		{{ widgetConfig.text }}
	</div>
</template>

<script setup lang="ts" name="TextWidget">
import { computed, PropType } from "vue";
import { TextWidget } from "@/views/poster/editor/widget/text/textWidget";

const props = defineProps({
	widgetConfig: {
		type: Object as PropType<TextWidget>,
		required: true
	}
});

const textStyle = computed(() => {
	return {
		width: props.widgetConfig.width + "px",
		height: props.widgetConfig.height + "px",
		textAlign: props.widgetConfig.center ? "center" : "left",
		color: props.widgetConfig.color,
		fontSize: props.widgetConfig.fontSize + "px",
		lineHeight: props.widgetConfig.lineHeight + "px",
		letterSpacing: props.widgetConfig.space + "px",
		fontFamily: props.widgetConfig.fontName,
		textDecoration: props.widgetConfig.strikeThrough ? "line-through" : "none"
	};
});
</script>

<style scoped lang="scss">
@import "fonts.css";
.text {
	user-select: none;
}
</style>
