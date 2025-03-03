<template>
	<div class="com-setting">
		<el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
			<el-tab-pane label="属性" name="config">
				<el-scrollbar style="height: calc(100vh - 60px)">
					<div class="pb40">
						<g-field-collapse label="基础配置">
							<g-field :level="2" label="名称"> <el-input v-model="config.name" /> </g-field>
							<g-field :level="2" label="背景颜色"> <g-color-picker v-model="config.basicConfig.backgroundColor" /> </g-field>
						</g-field-collapse>
						<component :is="chartConfigComponent" :chartConfig="config" :key="config.id" />
					</div>
				</el-scrollbar>
			</el-tab-pane>
			<el-tab-pane label="数据" name="data">
				<DataSetting />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup lang="ts" name="DashboardComponentSetting">
import { computed, provide, ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import { useDashboardStore } from "@/store/modules/dashboard";
import { storeToRefs } from "pinia";
import DataSetting from "./DataSetting.vue";

const dashboardStore = useDashboardStore();

const { selectedComponent } = storeToRefs(dashboardStore);
const config = selectedComponent as any;

const activeName = ref("config");

const modules = import.meta.glob("../../../components/**/**/config.vue", { eager: true }) as any;

const chartConfigComponent = computed(() => {
	return modules[`../../../components/${config?.value.componentType}/${config?.value.componentName}/config.vue`]?.default;
});

provide("com", selectedComponent);

const handleClick = (tab: TabsPaneContext, event: Event) => {
	console.log(tab, event);
};
</script>

<style scoped lang="scss">
.com-setting {
	height: calc(100vh - 60px);
}

:deep(.g-field-collapse) {
	--el-collapse-header-bg-color: var(--el-bg-color-page);
	--el-collapse-content-bg-color: var(--el-bg-color-page);
	--el-collapse-header-height: 38px;
	border-top: none;
	transition: all 1s;

	.el-collapse-item__header.is-active {
		border-color: var(--el-border-color-lighter);
	}

	.el-collapse {
		border-top: none;
	}
}

:deep(.el-tabs) {
	border: none;
	height: 100%;

	.el-tabs__header {
		margin: 0;
	}

	.el-tabs__content {
		padding: 0;
	}
	.el-tabs__content {
		height: 100%;
	}
	.el-tabs--border-card {
		border-bottom: none;
		height: 100%;
	}
}
</style>
