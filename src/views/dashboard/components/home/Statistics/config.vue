<template>
	<el-empty title="暂无设置" />
</template>

<script setup lang="ts" name="StatisticsConfig">
import { PropType } from "vue";
import { DashboardComponent } from "@/views/dashboard/components/types";

defineProps({
	chartConfig: {
		type: Object as PropType<DashboardComponent>,
		required: true
	}
});
</script>
<style scoped lang="scss"></style>
