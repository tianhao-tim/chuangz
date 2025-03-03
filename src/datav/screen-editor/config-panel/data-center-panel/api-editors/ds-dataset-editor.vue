<template>
	<div class="ds-wrapper ds-static">
		<el-button type="primary" @click="handleSettingDataset">
			<span>数据集设置</span>
		</el-button>
		<dataset-config ref="datasetConfigRef" />
	</div>
</template>

<script lang="ts" setup name="DsDatasetEditor">
import { onMounted, ref } from "vue";
import DatasetConfig from "../../dataset-config/index.vue";
import { getDataSourceAllList } from "@/api/modules/data/data-source";

const dataSourcesOptions = ref([]);

const datasetConfigRef = ref(null);

const handleSettingDataset = () => {
	datasetConfigRef.value.handleShow();
};

onMounted(() => {
	getDataSourceAllList().then(res => {
		dataSourcesOptions.value = res.data.map(item => {
			return {
				label: item.sourceName,
				value: item.id
			};
		});
	});
});
</script>
