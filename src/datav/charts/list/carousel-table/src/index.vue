<template>
	<div class="datav-wrapper" :style="wrapperStyle">
		<scroll-board :config="option" v-if="option.header && reload" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
	name: "VCarouselTable"
});
</script>

<script lang="ts" setup>
import { computed, nextTick, PropType, toRef, watch } from "vue";
import { useDataCenter } from "@/datav/mixins/useDataCenter";
import { useApiStore } from "@/store/modules/api";
import { CarouselTable } from "./carousel-table";
import { ScrollBoard } from "@kjgl77/datav-vue3";

const props = defineProps({
	com: {
		type: Object as PropType<CarouselTable>,
		required: true
	}
});

const apiStore = useApiStore();
useDataCenter(props.com);

const dv_data = computed(() => {
	return apiStore.dataMap[props.com.id]?.source ?? {};
});

const config = toRef(props.com, "config");
const attr = toRef(props.com, "attr");
const reload = ref(true);
const wrapperStyle = computed(() => {
	return {
		transform: "translateZ(0)",
		width: `${attr.value.w}px`,
		height: `${attr.value.h}px`
	};
});

const option = computed(() => {
	const header = dv_data.value?.header;
	const data = dv_data.value?.data;
	return {
		...config.value,
		header,
		data
	};
});

watch(wrapperStyle, () => {
	reload.value = false;
	nextTick(() => {
		reload.value = true;
	});
});
</script>
