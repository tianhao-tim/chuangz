<template>
	<el-form ref="formRef" :model="widgetConfig" label-width="120px" label-position="top">
		<el-form-item prop="id" label="Id">
			<span>{{ widgetConfig.id }}</span>
			<el-button type="primary" size="small" class="ml20" bg text @click="handleCopy">复制</el-button>
			<el-button type="danger" size="small" bg text @click="handleDelete">删除</el-button>
		</el-form-item>
		<el-form-item label="名称">
			<el-input v-model="widgetConfig.name" placeholder="请输入组件名称" />
		</el-form-item>
		<el-form-item label="位置">
			<g-input-number inline v-model="widgetConfig.x" label="x" style="width: 50%" />
			<g-input-number inline v-model="widgetConfig.y" label="y" style="width: 50%" />
		</el-form-item>
		<el-form-item label="尺寸">
			<g-input-number inline v-model="widgetConfig.width" label="宽" style="width: 50%" />
			<g-input-number inline v-model="widgetConfig.height" label="高" style="width: 50%" />
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts" name="BaseConfig">
import { PropType } from "vue";
import { PosterWidget } from "@/views/poster/editor/types/poster";
import { usePosterStore } from "@/store/modules/poster";

const props = defineProps({
	widgetConfig: {
		type: Object as PropType<PosterWidget>,
		required: true
	}
});
const store = usePosterStore();

const handleDelete = () => {
	store.deletePosterWidget(props.widgetConfig);
};
const handleCopy = () => {
	store.copyPosterWidget(props.widgetConfig);
};
</script>

<style scoped lang="scss"></style>
