<template>
	<g-field-collapse label="列表" expand>
		<g-field :level="2" label="字体大小">
			<g-input-number v-model="config.fontSize" />
		</g-field>
	</g-field-collapse>
</template>

<script setup lang="ts" name="ListConfig">
import { PropType, computed } from "vue";
import { DashboardComponent } from "@/views/dashboard/components/types";
import GInputNumber from "@/components/UI/input-number/src/index.vue";

const props = defineProps({
	chartConfig: {
		type: Object as PropType<DashboardComponent>,
		required: true
	}
});

const config = computed(() => {
	return props.chartConfig.config;
});
console.log(config);
</script>
<style scoped lang="scss"></style>
