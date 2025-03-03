<template>
	<el-row :gutter="15" class="statistics-wrapper mb15">
		<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="(v, k) in list" :key="k">
			<div class="home-card-item flex">
				<div class="flex-margin flex w100">
					<div class="flex-auto">
						<span class="num1">{{ v.num1 }}</span>
						<span class="ml5 num2" :style="{ color: getColor(k) }">{{ v.num2 }}%</span>
						<div class="mt10 num3">{{ v.num3 }}</div>
					</div>
					<div class="home-card-item-icon flex" :style="{ background: getHoverColor(getColor(k)) }" v-if="v.icon">
						<i class="flex-margin" :class="v.icon" :style="{ color: getColor(k) }"></i>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { TinyColor } from "@ctrl/tinycolor";
import { DashboardComponent } from "@/views/dashboard/components/types";
import { useChartDataFetch } from "@/views/dashboard/components/useChartDataFetch";

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

const list = computed(() => {
	return props.chartConfig.config.dataset?.list || [];
});

const colorList = computed(() => {
	return props.themeColor.color || [];
});

const getColor = (index: number) => {
	return colorList.value[index] || "#409EFF";
};

const getHoverColor = (baseColor: string) => {
	const color = new TinyColor(baseColor);
	return color.tint(90).toString();
};

console.log(props.themeColor);
useChartDataFetch(props.chartConfig);
</script>

<style scoped lang="scss">
.flex-auto {
	flex: 1;
	overflow: hidden;
}

.statistics-wrapper {
	height: 100%;
	padding: 3px;

	.home-card-item {
		height: 70%;
		border-radius: 4px;
		transition: all ease 0.3s;
		padding: 20px;
		overflow: hidden;
		background: var(--el-color-white);
		color: var(--el-text-color-primary);
		border: 1px solid #f1f2f3;

		&:hover {
			box-shadow: 0 2px 12px #0000001a;
			transition: all ease 0.3s;
		}

		&-icon {
			width: 70px;
			height: 70px;
			border-radius: 100%;
			flex-shrink: 1;
			display: flex;

			i {
				margin: auto;
				font-size: 32px;
				color: #ffffff;
			}
		}

		.num1 {
			font-size: 30px;
			height: 30px;
		}

		.num2 {
			font-size: 15px;
		}

		.num3 {
			font-size: 14px;
			color: var(--el-text-color-primary);
		}
	}
}
</style>
