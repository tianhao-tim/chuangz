<template>
	<div class="button-wrapper">
		<el-button
			:type="config.type"
			:size="config.size"
			:plain="config.plain"
			:text="config.text"
			:link="config.link"
			:round="config.round"
			:circle="config.circle"
			@click="handleClick"
		>
			<template #icon></template>
			<i :class="config.icon" class="fa fa-line-chart" v-if="config.icon" />
			{{ btnText }}
		</el-button>
	</div>
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

const btnText = computed(() => {
	return props.chartConfig.config.btnText || "";
});

const handleClick = () => {
	window.location.href = config.value.linkUrl;
};

useChartDataFetch(props.chartConfig);
</script>
<style lang="scss" scoped>
.button-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	justify-items: center;
	height: 100%;
	::v-deep(.el-icon) {
		display: none;
	}

	i {
		margin-right: 5px;
	}
}
</style>
