<template>
	<div class="carousel-wrapper" ref="carouselDom">
		<el-carousel :direction="config.direction" :autoplay="config.autoplay" :type="config.type" :interval="config.interval">
			<el-carousel-item v-for="(item, index) in dataset" :key="index">
				<div class="carousel-image">
					<el-image :src="item.image" :style="imageStyle">
						<template #error>
							<div class="image-slot">
								<el-icon><icon-picture /></el-icon>
							</div>
						</template>
					</el-image>
				</div>
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from "vue";
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

const carouselDom = ref();

const imageStyle = computed(() => {
	return {
		height: carouselDom.value?.clientHeight + "px",
		width: carouselDom.value?.clientWidth + "px"
	};
});

const config = computed(() => {
	return props.chartConfig.config;
});

const dataset = computed(() => {
	return props.chartConfig.config.dataset.list || [];
});

useChartDataFetch(props.chartConfig);
</script>
<style lang="scss" scoped>
.carousel-wrapper {
	height: 100%;
	width: 100%;
}

.carousel-image .image-slot {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background: var(--el-fill-color-light);
	color: var(--el-text-color-secondary);
	font-size: 30px;
}
</style>
