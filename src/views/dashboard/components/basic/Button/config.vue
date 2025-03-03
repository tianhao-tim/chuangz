<template>
	<g-field-collapse label="按钮" expand>
		<g-field :level="2" label="文字">
			<g-input v-model="config.btnText" size="small"></g-input>
		</g-field>
		<g-field :level="2" label="跳转链接">
			<g-input v-model="config.linkUrl" size="small"></g-input>
		</g-field>
		<g-field :level="2" label="类型">
			<el-select v-model="config.type" size="small">
				<el-option label="primary" value="primary" />
				<el-option label="success" value="success" />
				<el-option label="warning" value="warning" />
				<el-option label="danger" value="danger" />
				<el-option label="默认" value="" />
			</el-select>
		</g-field>
		<g-field :level="2" label="朴素按钮">
			<el-switch v-model="config.plain" />
		</g-field>
		<g-field :level="2" label="文字按钮">
			<el-switch v-model="config.text" />
		</g-field>
		<g-field :level="2" label="链接按钮">
			<el-switch v-model="config.link" />
		</g-field>
		<g-field :level="2" label="圆角">
			<el-switch v-model="config.round" />
		</g-field>
		<g-field :level="2" label="圆形">
			<el-switch v-model="config.circle" />
		</g-field>
		<g-field :level="2" label="颜色">
			<g-color-picker v-model="config.color" />
		</g-field>
		<g-field :level="2" label="图标">
			<icon-select v-model="config.icon" type="awe" />
		</g-field>
	</g-field-collapse>
</template>

<script setup lang="ts" name="ButtonConfig">
import { PropType, computed } from "vue";
import { DashboardComponent } from "@/views/dashboard/components/types";
import IconSelect from "@/components/IconSelect/index.vue";

const props = defineProps({
	chartConfig: {
		type: Object as PropType<DashboardComponent>,
		required: true
	}
});

const config = computed(() => {
	return props.chartConfig.config;
});
</script>
<style scoped lang="scss"></style>
