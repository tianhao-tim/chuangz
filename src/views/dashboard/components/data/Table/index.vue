<template>
	<div class="table-wrapper" ref="tableWrapper">
		<el-table :data="getTableData" style="width: 100%" :border="config.border" :stripe="config.stripe" :max-height="`${getTableMaxHeight}`">
			<el-table-column :prop="k" :label="getHeader(k)" v-for="(v, k) in firstData" :key="k" />
		</el-table>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType, toRefs, ref } from "vue";
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

const tableWrapper = ref();

const config = computed(() => {
	return props.chartConfig.config;
});

const { dataset } = toRefs(props.chartConfig.config);

const getTableData = computed(() => {
	return dataset.value?.tableData;
});

const firstData = computed(() => {
	return dataset.value?.tableData[0] || {};
});

const getHeader = (k: string) => {
	const header = dataset.value.header;
	if (!header) {
		return k;
	}

	return header[k] || k;
};

const getTableMaxHeight = computed(() => {
	return tableWrapper.value?.clientHeight - 20;
});
console.log(getTableMaxHeight);

useChartDataFetch(props.chartConfig);
</script>
<style lang="scss" scoped>
.table-wrapper {
	padding: 5px;
	height: 100%;
}
</style>
