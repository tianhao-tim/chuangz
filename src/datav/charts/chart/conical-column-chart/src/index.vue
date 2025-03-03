<template>
	<div class="datav-wrapper" :style="wrapperStyle">
		<dv-conical-column-chart :config="option" v-if="reload" :style="wrapperStyle" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "VConicalColumnChart"
});
</script>

<script lang="ts" setup>
import { computed, PropType, toRef, ref } from "vue";
import { useApiStore } from "@/store/modules/api";
import { ConicalColumnChart } from "./conical-column-chart";
import { ConicalColumnChart as DvConicalColumnChart } from "@kjgl77/datav-vue3";
import { useDataCenter } from "@/datav/mixins/useDataCenter";

const props = defineProps({
	com: {
		type: Object as PropType<ConicalColumnChart>,
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

const option = computed(() => {
	const data = dv_data.value?.data || [];
	return {
		...config.value,
		data
	};
});
const reload = ref(true);
</script>
