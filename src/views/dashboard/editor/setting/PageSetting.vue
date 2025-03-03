<template>
	<div class="page-setting-wrapper">
		<el-form ref="formRef" :model="pageConfig" label-width="120px" label-position="top">
			<el-form-item
				prop="name"
				label="名称"
				:rules="[
					{
						required: true,
						message: '请输入仪表盘名称',
						trigger: 'blur'
					}
				]"
			>
				<el-input v-model="pageConfig.name" />
			</el-form-item>
			<el-form-item prop="themeStyle" label="主题风格">
				<el-select v-model="pageConfig.themeStyle">
					<el-option :label="val" v-for="(val, key) in chartColorsName" :value="key" :key="key" />
				</el-select>
			</el-form-item>
			<el-form-item prop="bgColor" label="背景颜色">
				<g-color-picker v-model="pageConfig.bgColor" size="default" />
			</el-form-item>
			<el-form-item prop="bgColor" label="背景图">
				<g-upload-image v-model="pageConfig.bgImage" />
			</el-form-item>
			<el-form-item prop="bgColor" label="水印文字">
				<el-input v-model="pageConfig.waterMarkText" />
			</el-form-item>
		</el-form>
	</div>
</template>
<script setup lang="ts" name="DashboardPageSetting">
import { ElForm } from "element-plus";
import { useDashboardStore } from "@/store/modules/dashboard";
import { storeToRefs } from "pinia";
import { chartColorsName } from "@/views/dashboard/components/chartThemes";

const store = useDashboardStore();

const { pageConfig } = storeToRefs(store);
</script>
<style lang="scss" scoped>
.page-setting-wrapper {
	padding: 5px 10px;
}
</style>
