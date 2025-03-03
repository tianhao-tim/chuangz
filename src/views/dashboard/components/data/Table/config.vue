<template>
	<g-field-collapse label="表格" expand>
		<g-field :level="2" label="斑马纹">
			<el-switch v-model="config.stripe" />
		</g-field>
		<g-field :level="2" label="边框">
			<el-switch v-model="config.border" />
		</g-field>
	</g-field-collapse>
</template>

<script setup lang="ts" name="TableConfig">
import { PropType, computed } from "vue";
import { DashboardComponent } from "@/views/dashboard/components/types";

const props = defineProps({
	chartConfig: {
		type: Object as PropType<DashboardComponent>,
		required: true
	}
});

const config = computed(() => {
	return props.chartConfig.config;
});
</script>
<style scoped lang="scss"></style>
