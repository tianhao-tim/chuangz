<template>
	<div class="datav-wrapper" :style="wrapperStyle">
		<component :is="getComponent[`decoration-${config.number}`]" v-if="reload"></component>
	</div>
</template>

<script lang="ts" setup name="VDvDecoration">
import { computed, PropType, toRef, ref, watch, nextTick } from "vue";
import { DvDecoration } from "./dv-decoration";
// 导入14个装饰 Decoration1-14
import {
	Decoration1,
	Decoration2,
	Decoration3,
	Decoration4,
	Decoration5,
	Decoration6,
	Decoration7,
	Decoration8,
	Decoration9,
	Decoration10,
	Decoration11,
	Decoration12
} from "@kjgl77/datav-vue3";

const props = defineProps({
	com: {
		type: Object as PropType<DvDecoration>,
		required: true
	}
});
const attr = toRef(props.com, "attr");
const config = toRef(props.com, "config");

const reload = ref(true);

const getComponent = computed(() => {
	return {
		"decoration-1": Decoration1,
		"decoration-2": Decoration2,
		"decoration-3": Decoration3,
		"decoration-4": Decoration4,
		"decoration-5": Decoration5,
		"decoration-6": Decoration6,
		"decoration-7": Decoration7,
		"decoration-8": Decoration8,
		"decoration-9": Decoration9,
		"decoration-10": Decoration10,
		"decoration-11": Decoration11,
		"decoration-12": Decoration12
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
