<template>
	<div class="header-wrap">
		<el-page-header @back="goBack">
			<template #content>
				<div class="flex-justify-between">
					<span class="title">TduckPoster </span>
					<div class="icon-toolbar">
						<el-tooltip content="回撤" :show-after="500" :enterable="false">
							<i class="fa fa-undo" aria-hidden="true" @click="undo" />
						</el-tooltip>
						<el-tooltip content="重做" :show-after="500" :enterable="false">
							<i class="fa fa-undo" aria-hidden="true" @click="redo" />
						</el-tooltip>
					</div>
				</div>
			</template>
			<template #extra>
				<div class="extra-btn-warp">
					<el-button type="primary" icon="Promotion" @click="handlePreviewPoster">预览</el-button>
					<el-button type="primary" icon="Select" @click="handleSavePoster">保存</el-button>
					<el-button type="primary" icon="Document" @click="dialogFormVisible = true">另存为模板</el-button>
				</div>
			</template>
		</el-page-header>
		<el-image-viewer @close="imgViewerVisible = false" :url-list="imageList" v-if="imgViewerVisible" />
		<el-dialog v-model="dialogFormVisible" title="保存为模板" width="30%">
			<el-form :model="templateForm">
				<el-form-item
					label="名称"
					prop="name"
					:rules="[
						{
							required: true,
							message: '请输入模板名称',
							trigger: 'blur'
						}
					]"
				>
					<el-input v-model="templateForm.name" autocomplete="off" placeholder="请输入模板名称" />
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取消</el-button>
					<el-button type="primary" v-throttle="handlePosterAsTemplate"> 确认 </el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="PosterHeader">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { usePosterStore } from "@/store/modules/poster";
import { previewPosterImage, savePosterTemplate, updatePoster } from "@/api/modules/poster";
import { MessageUtil } from "@/utils/messageUtil";
import useOperationHistory from "@/views/poster/editor/main/useOperationHistory";
import usePosterTemplate from "../aside/hooks/usePosterTemplate";

const store = usePosterStore();

const imageList = ref([]);
const imgViewerVisible = ref(false);

const { undo, redo } = useOperationHistory();

let router = useRouter();

const goBack = () => {
	router.go(-1);
};
/**
 * 保存
 */
const handleSavePoster = () => {
	const poster: any = { ...store.posterConfig };
	poster.posterConfig = store.posterConfig;
	poster.posterWidgetList = store.posterWidgetList;
	updatePoster(poster).then(res => {
		if (res.data) {
			MessageUtil.success("保存成功");
		}
	});
};
/**
 * 保存海报
 */
const handlePreviewPoster = () => {
	const poster: any = { ...store.posterConfig };
	poster.posterConfig = store.posterConfig;
	poster.posterWidgetList = store.posterWidgetList;
	previewPosterImage(poster).then((res: any) => {
		imageList.value = [res.data];
		imgViewerVisible.value = true;
	});
};

/**
 * 保存海报
 */

const posterTemplate = usePosterTemplate();

const dialogFormVisible = ref(false);

const templateForm = reactive({
	name: ""
});

const handlePosterAsTemplate = () => {
	const poster: any = { ...store.posterConfig };
	poster.posterConfig = store.posterConfig;
	if (store.posterWidgetList && store.posterWidgetList.length == 0) {
		MessageUtil.error("请先添加海报元素");
		return;
	}
	poster.name = templateForm.name;
	poster.posterWidgetList = store.posterWidgetList;
	savePosterTemplate(poster).then(res => {
		if (res.data) {
			MessageUtil.success("保存成功");
			dialogFormVisible.value = false;
			posterTemplate.getPosterTemplates();
		}
	});
};
</script>

<style scoped lang="scss">
.header-wrap {
	height: 100%;
	.title {
		height: 60px;
		line-height: 60px;
		font-weight: 800;
		font-size: 20px;
	}

	:deep(.el-page-header__left) {
		padding-left: 25px;
	}

	.icon-toolbar {
		margin-left: 250px;
		.fa {
			margin-right: 20px;
			font-size: 18px;
			color: var(--el-text-color-primary);
			&:hover {
				cursor: pointer;
				color: var(--el-color-primary);
			}
		}
		.fa:last-child {
			transform: rotate(180deg);
		}
	}
	.extra-btn-warp {
		margin-right: 30px;
	}
}
</style>
