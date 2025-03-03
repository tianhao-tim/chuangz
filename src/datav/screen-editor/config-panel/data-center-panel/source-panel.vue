<template>
	<div
		:class="[
			'api-editor',
			{
				'--disable-fold': !collapse,
				'--fold': collapse && visible
			}
		]"
	>
		<div v-show="visible" class="attr-source-wp">
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
				<div class="data-flow-wp">
					<div class="ds-line">
						<div class="ds-title">
							<span class="ds-type-text">{{ datasources[apiDataConfig.type] }}</span>
						</div>
						<el-button size="small" class="ds-action-btn" @click="openSourceDrawer"> 配置数据源 </el-button>
					</div>
					<div class="ds-line mt5">
						<span>数据响应结果 ( 只读 ) </span>
						<el-tooltip content="刷新数据" placement="left" effect="blue">
							<i class="v-icon-refresh refresh-btn" @click="refreshData" />
						</el-tooltip>
					</div>
					<div class="ds-dots">
						<span class="ds-dot active" />
						<span class="ds-dot" />
						<span class="ds-dot" />
					</div>
				</div>
				<div class="data-response">
					<g-monaco-editor language="json" :read-only="true" :auto-format="true" :code="datav_data" :height="250" full-screen-title="数据响应结果" />
				</div>
			</div>
		</div>
		<source-drawer ref="sourceDrawerRef" />
	</div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, inject, provide, ref } from "vue";
import { DatavComponent } from "@/datav/types/datav-component";
import { ApiConfig, ApiDataConfig, createDataSources } from "@/datav/types/data-source";
import { useApiStore } from "@/store/modules/api";
import SourceDrawer from "./source-drawer.vue";
import { setComponentData } from "@/datav/mixins/useDataCenter";

export default defineComponent({
	name: "SourcePanel",
	components: {
		SourceDrawer
	},
	props: {
		apiName: {
			type: String,
			required: true
		},
		activeName: String,
		collapse: Boolean
	},
	setup(props) {
		const apiStore = useApiStore();
		const visible = computed(() => props.apiName === props.activeName);
		const sourceDrawerRef = ref(null);
		const datasources = createDataSources();

		const com = inject("com") as ComputedRef<DatavComponent>;
		const apiConfig = computed((): ApiConfig => com.value.apis[props.apiName]);
		const apiDataConfig = computed((): ApiDataConfig => com.value.apiData[props.apiName]);

		provide("apiConfig", apiConfig);
		provide("apiDataConfig", apiDataConfig);
		provide("apiName", props.apiName);

		const datav_data = computed(() => {
			const comData = apiStore.dataMap[com.value.id];
			return comData ? comData[props.apiName] : "";
		});

		const changePanel = inject("changePanel") as Function;

		const toggle = () => {
			if (props.collapse) {
				changePanel(props.apiName);
			}
		};

		const openSourceDrawer = () => {
			sourceDrawerRef.value?.open();
		};

		const refreshData = () => {
			setComponentData(com.value.id, props.apiName, apiConfig.value, apiDataConfig.value);
		};

		return {
			visible,
			sourceDrawerRef,
			datasources,
			com,
			apiConfig,
			apiDataConfig,
			datav_data,
			toggle,
			openSourceDrawer,
			refreshData
		};
	}
});
</script>

<style lang="scss" scoped>
@import "./source-panel.scss";
</style>
