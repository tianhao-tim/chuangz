<template>
	<el-row :gutter="15" class="home-card-three">
		<el-col :span="24">
			<div class="home-card-item">
				<div class="home-card-item-title" :style="{ fontSize: `${config.titleFontSize}px` }">
					{{ config.title }}
				</div>
				<div class="home-monitor">
					<div class="flex-warp">
						<div class="flex-warp-item" v-for="(v, k) in list" :key="k" :style="getItemStyle">
							<div class="flex-warp-item-box" :class="`home-animation${k}`" :style="{ backgroundColor: config.backgroundColor }">
								<div class="flex-margin">
									<div class="mt5">
										<i :class="v.icon" :style="{ color: getColor(k) }"></i>
									</div>
									<span class="pl5 label">{{ v.label }}</span>
									<div class="mt10 value">{{ v.value }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
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

const config = computed(() => {
	return props.chartConfig.config;
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

const getItemStyle = computed(() => {
	return {
		width: `${96 / config.value.colNum}%`
	};
});
//
// const getHoverColor = (baseColor: string) => {
// 	const color = new TinyColor(baseColor);
// 	return color.tint(50).toString();
// };

console.log(props.themeColor);
useChartDataFetch(props.chartConfig);
</script>

<style scoped lang="scss">
.flex-warp {
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
	margin: 0 -5px;
	.flex-warp-item {
		width: 25%;
		height: 111px;
		display: flex;
	}
}
.flex-margin {
	margin: auto;
}

.home-card-three {
	.home-card-item {
		width: 100%;
		height: 100%;
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

			i {
				color: var(--el-text-color-placeholder);
			}
		}

		&-title {
			font-size: 15px;
			font-weight: bold;
			height: 30px;
		}
	}
}

.home-card-three {
	.home-card-item {
		height: 100%;
		width: 100%;
		overflow: hidden;

		.home-monitor {
			height: 100%;

			.flex-warp-item {
				width: 24%;
				height: 111px;
				display: flex;

				.flex-warp-item-box {
					width: 100%;
					margin: 2px;
					text-align: center;
					color: var(--el-text-color-primary);
					display: flex;
					border-radius: 5px;
					background: #f5f5ff;
					cursor: pointer;
					transition: all 0.3s ease;

					&:hover {
						background: var(--el-color-primary-light-9);
						transition: all 0.3s ease;
					}
					i {
						font-size: 20px;
						margin-bottom: 6px;
					}
					.value {
						color: var(--el-text-color-secondary);
						font-size: 12px;
					}
				}

				@for $i from 0 through 8 {
					.home-animation#{$i} {
						//opacity: 0;
						animation-name: error-num;
						animation-duration: 0.5s;
						animation-fill-mode: forwards;
						animation-delay: calc($i/10) + s;
					}
				}
			}
		}
	}
}
</style>
