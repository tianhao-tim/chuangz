<template>
	<div class="text-box" :style="{ justifyContent: textAlign }">
		<div class="content" :style="contentStyle">
			<span style="cursor: pointer" v-if="link" @click="click">{{ option.dataset.text }}</span>
			<span v-else>{{ option.dataset.text }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { shallowReactive, watch, PropType, toRefs, computed } from "vue";
import { DashboardComponent } from "@/views/dashboard/components/types";
import { useChartDataFetch } from "@/views/dashboard/components/useChartDataFetch";
import { option as configOption } from "./config";

const props = defineProps({
	themeColor: {
		type: Object,
		required: true
	},
	chartConfig: {
		type: Object as PropType<DashboardComponent>,
		required: true
	}
});

const {
	linkHead,
	link,
	fontColor,
	fontSize,
	letterSpacing,
	paddingY,
	paddingX,
	textAlign,
	borderWidth,
	borderColor,
	borderRadius,
	writingMode,
	backgroundColor,
	fontWeight
} = toRefs(props.chartConfig.config);

const option = shallowReactive({
	dataset: configOption.dataset
});

// 手动更新
watch(
	() => props.chartConfig.config.dataset,
	(newData: any) => {
		option.dataset = newData;
	},
	{
		immediate: true,
		deep: false
	}
);

const contentStyle = computed(() => {
	return {
		color: fontColor.value,
		fontSize: fontSize.value + "px",
		letterSpacing: letterSpacing.value + "px",
		padding: paddingY.value + "px " + paddingX.value + "px",
		borderWidth: borderWidth.value + "px",
		borderColor: borderColor.value,
		borderRadius: borderRadius.value + "px",
		writingMode: writingMode.value,
		backgroundColor: backgroundColor.value,
		fontWeight: fontWeight.value
	};
});

// 预览更新
useChartDataFetch(props.chartConfig);

//打开链接
const click = () => {
	window.open(linkHead.value + link.value);
};
</script>
<style lang="scss" scoped>
.text-box {
	display: flex;
	align-items: center;
	justify-content: v-bind("textAlign");

	.content {
		color: v-bind("fontColor");
		padding: v-bind("`${paddingY}px ${paddingX}px`");
		font-size: v-bind('fontSize + "px"');
		letter-spacing: v-bind('letterSpacing + "px"');
		writing-mode: v-bind("writingMode");
		font-weight: v-bind("fontWeight");
		border-style: solid;
		border-width: v-bind('borderWidth + "px"');
		border-radius: v-bind('borderRadius + "px"');
		border-color: v-bind("borderColor");

		background-color: v-bind("backgroundColor");
	}
}
</style>
