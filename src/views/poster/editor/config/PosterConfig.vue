<template>
	<el-form ref="formRef" :model="posterConfig" label-width="120px" label-position="top">
		<el-form-item
			prop="name"
			label="名称"
			:rules="[
				{
					required: true,
					message: '请输入海报名称',
					trigger: 'blur'
				}
			]"
		>
			<el-input v-model="posterConfig.name" />
		</el-form-item>
		<el-form-item prop="posterFileType" label="文件格式">
			<el-radio-group v-model="posterConfig.posterFileType" size="small">
				<el-radio-button :label="PosterFileType.PNG">PNG</el-radio-button>
				<el-radio-button :label="PosterFileType.JPG">JPG</el-radio-button>
				<el-radio-button :label="PosterFileType.JPEG">JPEG</el-radio-button>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="尺寸">
			<g-input-number inline v-model="posterConfig.width" label="宽" style="width: 50%" />
			<g-input-number inline v-model="posterConfig.height" label="高" style="width: 50%" />
		</el-form-item>
		<el-form-item prop="posterBgColor" label="背景颜色">
			<g-color-picker v-model="posterConfig.posterBgColor" size="default" :show-alpha="false" />
		</el-form-item>
		<el-form-item prop="posterBgImage" label="背景图">
			<g-upload-image v-model="posterConfig.posterBgImage" />
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts" name="PosterConfig">
import { storeToRefs } from "pinia";
import { usePosterStore } from "@/store/modules/poster";
import { PosterFileType } from "../types/poster";
import GInputNumber from "@/components/UI/input-number/src/index.vue";

const store = usePosterStore();

const { posterConfig }: any = storeToRefs(store);
</script>

<style lang="scss" scoped></style>
