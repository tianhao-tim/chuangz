<template>
	<g-field-collapse label="图片" expand>
		<g-field :level="2" label="懒加载">
			<el-switch v-model="config.lazy" />
		</g-field>
		<g-field :level="2" label="适应模式">
			<el-select v-model="config.fit" size="small">
				<el-option label="填充" value="fill" />
				<el-option label="适应" value="contain" />
				<el-option label="覆盖" value="cover" />
				<el-option label="缩放" value="scale-down" />
				<el-option label="平铺" value="none" />
			</el-select>
		</g-field>
	</g-field-collapse>
	<el-divider>数据</el-divider>
	<div class="p2">
		<g-upload-image v-model="dataset.imageUrl" />
	</div>
</template>

<script setup lang="ts" name="ImageConfig">
import { PropType, computed, toRefs } from "vue";
import { DashboardComponent } from "@/views/dashboard/components/types";

const props = defineProps({
	chartConfig: {
		type: Object as PropType<DashboardComponent>,
		required: true
	}
});

const config = computed(() => {
	return props.chartConfig.config;
});

const { dataset } = toRefs(props.chartConfig.config);
</script>
<style scoped lang="scss"></style>
