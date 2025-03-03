<template>
	<el-dialog v-model="dialogVisible" title="数据集设置" :before-close="handleClose">
		<div class="ds-title">数据库选择</div>
		<el-select-v2 v-model="dataSetConfig.dataSourceId" :options="dataSourcesOptions" placeholder="请选择数据源" class="mt10 mb10" />
		<el-input v-model="dataSetConfig.setName" placeholder="请输入数据集名称" class="mb10" />
		<div class="ds-title mb10">sql编辑</div>
		<div>
			<g-monaco-editor language="sql" :auto-format="true" :code="dataSetConfig.sql" class="mt10" :height="200" />
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="dialogVisible = false"> 确认 </el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessageBox } from "element-plus";
import { getDataSourceAllList } from "@/api/modules/data/data-source";

const dialogVisible = ref(false);

const dataSetConfig = ref({
	dataSourceId: "",
	sql: "",
	setName: ""
});

const handleShow = () => {
	dialogVisible.value = true;
};

defineExpose({
	handleShow
});

const handleClose = (done: () => void) => {
	ElMessageBox.confirm("Are you sure to close this dialog?")
		.then(() => {
			done();
		})
		.catch(() => {
			// catch error
		});
};

const dataSourcesOptions = ref([]);

// const updateData = (data: any) => {
// 	apiDataConfig.value.config.data = data.value;
// };

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

<style scoped lang="scss"></style>
