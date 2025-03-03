<template>
	<el-image :src="imgSrc" :fit="config.fit" class="image-wrapper">
		<template #error>
			<div class="image-slot">
				<el-icon>
					<icon-picture />
				</el-icon>
			</div>
		</template>
	</el-image>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { DashboardComponent } from "@/views/dashboard/components/types";
import { useChartDataFetch } from "@/views/dashboard/components/useChartDataFetch";
import { Picture as IconPicture } from "@element-plus/icons-vue";

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

const config = computed(() => {
	return props.chartConfig.config;
});

const imgSrc = computed(() => {
	return props.chartConfig.config.dataset?.imageUrl || "";
});

useChartDataFetch(props.chartConfig);
</script>
<style lang="scss" scoped>
.image-wrapper {
	width: 100%;
	height: 100%;

	.image-slot {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background: var(--el-fill-color-light);
		color: var(--el-text-color-secondary);
		font-size: 30px;
	}
}
</style>
