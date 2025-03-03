<template>
	<div class="datav-wrapper" :style="wrapperStyle">
		<component :is="getDvBorderComponent[`border-box-${config.number}`]" v-if="reload"></component>
	</div>
</template>

<script lang="ts" setup name="VDvBorder">
import { computed, PropType, toRef, ref, watch, nextTick } from "vue";
import { DvBorder } from "./dv-border";
import {
	BorderBox1,
	BorderBox2,
	BorderBox3,
	BorderBox4,
	BorderBox5,
	BorderBox6,
	BorderBox7,
	BorderBox8,
	BorderBox9,
	BorderBox10,
	BorderBox11,
	BorderBox12,
	BorderBox13
} from "@kjgl77/datav-vue3";

const props = defineProps({
	com: {
		type: Object as PropType<DvBorder>,
		required: true
	}
});
const attr = toRef(props.com, "attr");
const config = toRef(props.com, "config");

const reload = ref(true);

const getDvBorderComponent = computed(() => {
	return {
		"border-box-1": BorderBox1,
		"border-box-2": BorderBox2,
		"border-box-3": BorderBox3,
		"border-box-4": BorderBox4,
		"border-box-5": BorderBox5,
		"border-box-6": BorderBox6,
		"border-box-7": BorderBox7,
		"border-box-8": BorderBox8,
		"border-box-9": BorderBox9,
		"border-box-10": BorderBox10,
		"border-box-11": BorderBox11,
		"border-box-12": BorderBox12,
		"border-box-13": BorderBox13
	};
});
const wrapperStyle = computed(() => {
	return {
		transform: "translateZ(0px)",
		width: `${attr.value.w}px`,
		height: `${attr.value.h}px`
	};
});
watch(wrapperStyle, () => {
	reload.value = false;
	nextTick(() => {
		reload.value = true;
	});
});
</script>
