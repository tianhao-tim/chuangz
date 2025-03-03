<template>
	<div class="datav-wrapper" :style="wrapperStyle">
		<scroll-ranking-board :config="option" v-if="option" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "VTableBar"
});
</script>

<script lang="ts" setup>
import { computed, PropType, toRef } from "vue";
import { useDataCenter } from "@/datav/mixins/useDataCenter";
import { useApiStore } from "@/store/modules/api";
import { TableBar } from "./table-bar";
import { ScrollRankingBoard } from "@kjgl77/datav-vue3";

const props = defineProps({
	com: {
		type: Object as PropType<TableBar>,
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
	const header = dv_data.value?.header;
	const data = dv_data.value?.data;
	return {
		...config.value,
		header,
		data,
		valueFormatter: (item: any) => {
			console.log(item.value);
			return `${item.value}${config.value.unit}`;
		}
	};
});
</script>
