<template>
	<div class="config-wrap">
		<h2>组件设置</h2>
		<el-divider />
		<component :is="widgetComponent" :widgetConfig="widgetConfig" />
	</div>
</template>

<script setup name="WidgetConfig" lang="ts">
import { computed, PropType } from "vue";
import { PosterWidget } from "@/views/poster/editor/types/poster";

const props = defineProps({
	widgetConfig: {
		type: Object as PropType<PosterWidget>,
		required: true
	}
});

// 动态导入组件
const modules = import.meta.glob("../widget/**/config.vue", { eager: true }) as any;

const widgetComponent = computed(() => {
	return modules[`../widget/${props.widgetConfig?.type.toLowerCase()}/config.vue`]?.default;
});
</script>

<style scoped lang="scss">
.config-wrap {
	background-color: var(--el-bg-color-overlay);
	height: 100vh;
}
</style>
