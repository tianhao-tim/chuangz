<template>
	<div class="p10">
		<el-form label-position="top">
			<el-form-item label="数据源类型">
				<el-select v-model="apiDataConfig.type" filterable class="datav-new-select" popper-class="datav-new-select-option" @change="changeSource">
					<el-option v-for="(v, k) in datasources" :key="k" :label="v" :value="k" />
				</el-select>
			</el-form-item>
			<ds-static-editor v-if="apiDataConfig.type === apiType.static" />
			<ds-api-editor v-else-if="apiDataConfig.type === apiType.api" />
			<ds-form-editor v-else-if="apiDataConfig.type === apiType.form" />
			<ds-dataset-editor v-else-if="apiDataConfig.type === apiType.dataset" />
			<div class="el-form-item__label cursor-pointer" style="align-items: center" @click="handleRefreshData">
				数据响应结果 <el-icon><RefreshRight /></el-icon>
			</div>
			<g-monaco-editor language="json" :read-only="true" :auto-format="true" :code="resData" />
		</el-form>
	</div>
</template>

<script lang="ts" setup name="DataSetting">
import { computed, inject, ComputedRef } from "vue";
import { ApiType, createDataConfigForApi, createDataSources } from "@/datav/types/data-source";
import DsStaticEditor from "@/datav/screen-editor/config-panel/data-center-panel/api-editors/ds-static-editor.vue";
import DsApiEditor from "@/datav/screen-editor/config-panel/data-center-panel/api-editors/ds-api-editor.vue";
import DsFormEditor from "@/datav/screen-editor/config-panel/data-center-panel/api-editors/ds-form-editor.vue";
import DsDatasetEditor from "@/datav/screen-editor/config-panel/data-center-panel/api-editors/ds-dataset-editor.vue";
import { DashboardComponent } from "@/views/dashboard/components/types";
import { useChartDataFetch } from "@/views/dashboard/components/useChartDataFetch";
const apiType = ApiType;
const datasources = createDataSources();
const com = inject("com") as ComputedRef<DashboardComponent>;

const apiDataConfig = computed(() => com.value?.apiData.source);

const changeSource = (val: ApiType) => {
	switch (val) {
		case ApiType.api:
			createDataConfigForApi(apiDataConfig.value?.config);
			break;
		default:
			break;
	}
};

const resData = computed(() => com.value.apiData?.source.config.data);

const handleRefreshData = () => {
	useChartDataFetch(com.value);
};
</script>

<style lang="scss" scoped>
:deep(.monaco-editor) {
	background-color: transparent;
}
</style>
