<template>
	<el-drawer v-model="visible" class="source-drawer" size="500px" :show-close="false">
		<template #header>
			<p class="source-drawer-title">设置数据源</p>
		</template>
		<template v-if="visible">
			<div class="step-title">数据源</div>
			<div class="datasource-selector">
				<label class="datasource-selector-title">数据源类型</label>
				<div class="datasource-select w100">
					<div class="datav-new-select-wp">
						<el-select
							v-model="apiDataConfig.type"
							size="small"
							filterable
							class="datav-new-select"
							popper-class="datav-new-select-option"
							@change="changeSource"
						>
							<el-option v-for="(v, k) in datasources" :key="k" :label="v" :value="k" />
						</el-select>
					</div>
				</div>
			</div>

			<ds-static-editor v-if="apiDataConfig.type === apiType.static" />
			<ds-api-editor v-else-if="apiDataConfig.type === apiType.api" />
			<ds-form-editor v-else-if="apiDataConfig.type === apiType.form" />
			<!--			<el-popover v-model:visible="visiblePreview" placement="left" :width="400" popper-class="editor-popover">-->
			<!--				<div class="ds-preview-content">-->
			<!--					<g-monaco-editor language="json" :read-only="true" :auto-format="true" :height="180" :code="dataOrign" />-->
			<!--				</div>-->
			<!--        <template #reference>-->
			<!--          <div class="ds-response-btn">-->
			<!--            <i class="v-icon-search"></i>-->
			<!--            预览数据源返回结果-->
			<!--          </div>-->
			<!--        </template>-->
			<!--			</el-popover>-->

			<!--      <div class="step-title" :class="{ '&#45;&#45;error': !!dataStatus.filter }">-->
			<!--        <el-checkbox-->
			<!--            v-model="apiDataConfig.config.useFilter"-->
			<!--            class="use-filter-btn"-->
			<!--        />-->
			<!--        <span class="use-filter-text">数据过滤器</span>-->
			<!--      </div>-->

			<!--      <field-grid :fields="apiConfig.fields"/>-->
			<div class="step-title">
				<span>数据响应结果</span>
				<i class="v-icon-refresh refresh-btn" @click="refreshData" />
			</div>
			<div class="data-response">
				<g-monaco-editor language="json" :read-only="true" :auto-format="true" :code="resData" />
			</div>
		</template>
		<template #footer>
			<div class="source-drawer-footer">
				<!--				<el-button size="mini" @click="visible = false">取消</el-button>-->
				<el-button size="small" type="primary" @click="visible = false">确定</el-button>
			</div>
		</template>
	</el-drawer>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, inject, provide, ref } from "vue";
import { DatavComponent } from "@/datav/types/datav-component";
import { ApiConfig, ApiDataConfig, ApiType, createDataConfigForApi, createDataSources } from "@/datav/types/data-source";
import { useApiStore } from "@/store/modules/api";
import { setComponentData } from "@/datav/mixins/useDataCenter";
import { loadAsyncComponent } from "@/utils/asyncComponent";

export default defineComponent({
	name: "SourceDrawer",
	components: {
		DsStaticEditor: loadAsyncComponent(() => import("./api-editors/ds-static-editor.vue")),
		DsApiEditor: loadAsyncComponent(() => import("./api-editors/ds-api-editor.vue")),
		DsFormEditor: loadAsyncComponent(() => import("./api-editors/ds-form-editor.vue"))
	},
	setup() {
		const apiStore = useApiStore();
		const visible = ref(false);
		const visiblePreview = ref(false);
		const apiType = ApiType;

		const open = () => {
			visible.value = true;
		};

		const com = inject("com") as ComputedRef<DatavComponent>;
		const apiConfig = inject("apiConfig") as ComputedRef<ApiConfig>;
		const apiDataConfig = inject("apiDataConfig") as ComputedRef<ApiDataConfig>;
		const apiName = inject("apiName") as string;

		const datasources = createDataSources();

		if (apiDataConfig.value.config.notSupportForm) {
			delete datasources[ApiType.form];
		}

		const dataOrign = computed(() => {
			// const comData = DebugModule.originMap[com.value.id]
			// return comData ? comData[apiName] : ''
			return "";
		});

		const changeSource = (val: ApiType) => {
			switch (val) {
				case ApiType.api:
					createDataConfigForApi(apiDataConfig.value.config);
					break;
				default:
					break;
			}
		};

		const resData = computed(() => {
			const data = apiStore.dataMap[com.value.id];
			return data ? data[apiName] : "";
		});

		const refreshData = async () => {
			await setComponentData(com.value.id, apiName, apiConfig.value, apiDataConfig.value);
			console.log(com.value.id, apiName, apiConfig.value, apiDataConfig.value);
		};

		provide("refreshData", refreshData);

		return {
			visible,
			visiblePreview,
			apiType,
			datasources,
			com,
			apiConfig,
			apiDataConfig,
			dataOrign,
			resData,
			open,
			changeSource,
			refreshData
		};
	}
});
</script>

<style lang="scss">
@import "./source-drawer.scss";
</style>
