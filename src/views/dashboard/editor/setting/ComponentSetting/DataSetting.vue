<template>
	<div class="attr-source-wp">
		<div class="data-source">
			<div class="data-result-title">数据响应结果</div>
			<div class="auto-update-config">
				<el-checkbox v-model="apiConfig.useAutoUpdate" class="auto-update-checkbox"> 自动更新选项 </el-checkbox>
				<new-input
					:model-value="apiConfig.autoUpdate"
					type="number"
					:disabled="!apiConfig.useAutoUpdate"
					class="update-interval-input"
					@change="apiConfig.autoUpdate = $event"
				/>
				秒一次
			</div>
			<el-divider />
			<div class="data-config">
				<el-tag effect="dark">{{ datasources[apiDataConfig.type] }}</el-tag>
				<div class="ds-line">
					<el-button size="small" @click="dialogVisible = true"> 配置数据源 </el-button>
				</div>
			</div>
			<div class="data-flow-wp">
				<span>数据响应结果 ( 只读 ) </span>
			</div>
			<div class="data-response">
				<g-monaco-editor language="json" :read-only="true" :auto-format="true" :code="resData" :height="250" full-screen-title="数据响应结果" />
			</div>
		</div>
		<el-dialog lock-scroll v-model="dialogVisible" title="数据源配置" :close-on-click-modal="false">
			<data-setting-dialog v-if="dialogVisible" />
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="handleEnterDataSetting"> 确认 </el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup name="DataSetting">
import { computed, ref, inject, provide, ComputedRef } from "vue";
import { DashboardComponent } from "@/views/dashboard/components/types";
import { createDataSources } from "@/datav/types/data-source";
import DataSettingDialog from "./DataSettingDialog.vue";
import { useChartDataFetch } from "@/views/dashboard/components/useChartDataFetch";

const datasources = createDataSources();

const dialogVisible = ref(false);

const com = inject("com") as ComputedRef<DashboardComponent>;
const apiDataConfig = computed(() => com.value.apiData.source);

const apiConfig = computed(() => com.value.apis.source);

provide("apiDataConfig", apiDataConfig);
provide("apiConfig", apiConfig);

const resData = computed(() => com.value.apiData.source.config.data);

const handleEnterDataSetting = () => {
	useChartDataFetch(com.value);
	dialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
.attr-source-wp {
	padding: 10px;
}

.data-source {
	margin-top: 20px;
	.data-result-title {
		color: var(--el-text-color-primary);
		font-size: var(--el-font-size-base);
	}
	.auto-update-config {
		display: flex;
		align-items: center;
		color: var(--el-text-color-secondary);
		font-size: var(--el-font-size-extra-small);
		.auto-update-checkbox {
			margin-right: 20px;
		}
		.update-interval-input {
			width: 60px;
			margin-left: 10px;
		}
	}
}
.data-config {
	display: flex;
	margin-top: 20px;
	justify-content: space-between;
}
.data-flow-wp {
	margin-top: 10px;
	color: var(--el-text-color-secondary);
	font-size: var(--el-font-size-extra-small);
}

.data-response {
	margin-top: 20px;
}
</style>
