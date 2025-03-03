<template>
	<div class="datav-wrapper" :style="wrapperStyle">
		<dv-water-level-pond :config="option" v-if="reload" :style="wrapperStyle" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "VWaterLevelPond"
});
</script>

<script lang="ts" setup>
import { computed, PropType, toRef, ref, watch, nextTick } from "vue";
import { useApiStore } from "@/store/modules/api";
import { WaterLevelPond } from "./water-level-pond";
import { WaterLevelPond as DvWaterLevelPond } from "@kjgl77/datav-vue3";
import { useDataCenter } from "@/datav/mixins/useDataCenter";

const props = defineProps({
	com: {
		type: Object as PropType<WaterLevelPond>,
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

const wrapperStyle = computed(() => {
	return {
		transform: "translateZ(0)",
		width: `${attr.value.w}px`,
		height: `${attr.value.h}px`
	};
});

const reload = ref(true);

watch(wrapperStyle, (newVal, oldVal) => {
	reload.value = false;
	nextTick(() => {
		reload.value = true;
	});
});

const option = computed(() => {
	const value = dv_data.value?.value || 0;
	return {
		...config.value,
		data: [value]
	};
});
</script>
