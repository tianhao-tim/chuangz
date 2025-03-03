<template>
	<div class="list-wrapper">
		<el-row v-for="(item, index) in getListData" :key="index" class="row" :style="getRowStyle">
			<el-col :span="colNum" v-for="(v, k) in item" :key="k">
				{{ v }}
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType, toRefs } from "vue";
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

const { dataset } = toRefs(props.chartConfig.config);

const getListData = computed(() => {
	return dataset.value?.listData;
});
const colNum = computed(() => {
	console.log(getListData.value?.length);
	if (!getListData.value && !getListData.value.length) {
		return 24;
	}
	let keyNum = getListData.value[0] ? Object.keys(getListData.value[0]).length : 0;
	return keyNum > 0 ? 24 / keyNum : 0;
});

const getRowStyle = computed(() => {
	return {
		fontSize: props.chartConfig.config.fontSize + "px"
	};
});

useChartDataFetch(props.chartConfig);
</script>
<style lang="scss" scoped>
.list-wrapper {
	padding: 5px;
	.row {
		color: var(--el-text-color-primary);
		line-height: 42px;
		min-height: 42px;
		font-size: var(--el-font-size-base);
		border-bottom: var(--el-border);
		text-align: center;
	}
}
</style>
