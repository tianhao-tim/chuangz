<template>
	<div class="template-wrapper">
		<el-scrollbar>
			<div class="template-list-wrap" v-if="templateList && templateList.length">
				<div class="template-item" v-for="temp in templateList" :key="temp.id">
					<img :src="temp.templateImage" alt="" />
					<div class="name">
						{{ temp.name }}
					</div>
					<div class="use-btns">
						<el-button type="primary" size="small" @click="handleUseTemplate(temp)"> 使用</el-button>
						<div v-if="temp.userId" class="mt5">
							<el-button type="danger" size="small" @click="handleDelete(temp)">删除</el-button>
						</div>
					</div>
				</div>
			</div>
			<el-empty v-else description="暂未数据" />
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts" name="PosterTemplate">
import { onMounted, inject } from "vue";
import usePosterTemplate from "./hooks/usePosterTemplate";
import { deletePosterTemplate, useTemplateToPoster } from "@/api/modules/poster";
import { MessageBoxUtil, MessageUtil } from "@/utils/messageUtil";
import { usePosterStore } from "@/store/modules/poster";

const posterTemplate = usePosterTemplate();

const templateList = posterTemplate.templateList;

onMounted(() => {
	posterTemplate.getPosterTemplates();
});

const handleDelete = item => {
	MessageBoxUtil.confirm("确定删除该模板吗？", () => {
		deletePosterTemplate(item.id).then(res => {
			if (res.data) {
				MessageUtil.success("删除成功");
				posterTemplate.getPosterTemplates();
			}
		});
	});
};

const posterKey = inject("posterKey") as string;

const posterStore = usePosterStore();

const handleUseTemplate = item => {
	MessageBoxUtil.confirm("确定使用该模板吗，使用后将覆盖当前的设计，且无法撤回？", () => {
		useTemplateToPoster(item.id, posterKey).then(res => {
			if (res.data) {
				MessageUtil.success("使用成功");
				posterStore.loadPoster(posterKey);
			}
		});
	});
};
</script>

<style scoped lang="scss">
.template-wrapper {
	height: 100%;
	width: 100%;
	max-height: 100%;
	overflow: auto;
	.template-item {
		width: 90%;
		height: 200px;
		border: var(--el-border);
		border-radius: var(--el-border-radius-base);
		margin: 5px;
		position: relative;

		img {
			width: 100%;
			height: 100%;
		}

		.name {
			bottom: 2px;
			color: var(--el-text-color-regular);
			position: absolute;
			text-align: center;
			display: block;
			width: 100%;
		}

		.use-btns {
			position: absolute;
			top: 40%;
			left: 40%;
			display: none;
		}
	}
	.template-item:hover {
		.use-btns {
			display: block;
			backdrop-filter: blur(10px);
		}
	}
}
</style>
