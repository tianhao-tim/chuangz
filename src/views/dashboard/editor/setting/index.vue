<template>
	<div class="setting-wrapper">
		<page-setting v-if="!selectedComponentId" />
		<component-setting v-else />
	</div>
</template>
<script setup lang="ts" name="DashboardEditorSetting">
import PageSetting from "./PageSetting.vue";
import ComponentSetting from "./ComponentSetting/index.vue";

import { useDashboardStore } from "@/store/modules/dashboard";
import { storeToRefs } from "pinia";

const dashboardStore = useDashboardStore();

const { selectedComponentId } = storeToRefs(dashboardStore);
</script>
<style lang="scss" scoped>
.setting-wrapper {
	height: calc(100vh - 60px);
	background-color: var(--el-bg-color);
	--el-collapse-header-bg-color: var(--el-bg-color-page);
}
</style>
