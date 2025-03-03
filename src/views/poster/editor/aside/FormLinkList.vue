<template>
	<div class="link-form-wrapper">
		<div class="sub-title">关联表单</div>
		<div class="description-text">关联表单字段，生成链接，可用表单数据动态填充海报</div>
		<el-button type="primary" text bg icon="Plus" class="text-center" @click="addDialogVisible = true">创建关联</el-button>
		<div class="link-list-wrap">
			<div v-for="link in posterFormLinkList" :key="link.id" class="link-list-item">
				<div class="text-center title">
					{{ link.name }}
				</div>
				<div class="url">
					{{ getLinkUrl(link) }}
				</div>
				<div class="op-btns">
					<el-link type="primary" icon="EditPen" :underline="false" @click="handleUpdate(link)">修改</el-link>
					<el-link type="primary" icon="CopyDocument" :underline="false" @click="handleCopyLink(link)"> 复制 </el-link>
					<el-link type="danger" icon="Delete" :underline="false" @click="handleDelete(link)">删除</el-link>
				</div>
			</div>
		</div>
		<form-link-dialog v-model="addDialogVisible" :form-link="formLink" @change="handleGetPosterFormLinkList" />
	</div>
</template>

<script setup lang="ts" name="LinkFormList">
import { inject, onMounted, ref } from "vue";
import { useClipboard } from "@vueuse/core";
import FormLinkDialog from "./linkForm/FormLinkDialog.vue";
import { deletePosterFormLink, getPosterFormLinkList } from "@/api/modules/poster";
import { getBasePath } from "@/utils/url";
import { MessageBoxUtil, MessageUtil } from "@/utils/messageUtil";

const addDialogVisible = ref(false);

const posterFormLinkList = ref([]);

const posterKey = inject("posterKey") as string;

onMounted(() => {
	handleGetPosterFormLinkList();
});

const handleGetPosterFormLinkList = () => {
	getPosterFormLinkList({ posterKey: posterKey }).then(res => {
		posterFormLinkList.value = res.data;
	});
};

const formLink = ref(null);
const handleUpdate = row => {
	formLink.value = row;
	addDialogVisible.value = true;
};

const source = ref("");
const { copy } = useClipboard({ source });

const handleCopyLink = row => {
	source.value = getLinkUrl(row);
	copy();
	MessageUtil.success("复制成功");
};

const handleDelete = row => {
	MessageBoxUtil.confirm(
		"确定删除该关联吗？",
		() => {
			deletePosterFormLink(row.id).then(() => {
				MessageUtil.success("删除成功");
				handleGetPosterFormLinkList();
			});
		},
		"提示"
	);
};

const getLinkUrl = item => {
	return `${getBasePath()}/poster/gen/${item.linkKey}`;
};
</script>

<style scoped lang="scss">
.link-form-wrapper {
	padding: 5px;
	max-height: 100%;
	overflow: auto;
}
.link-list-wrap {
	margin-top: 20px;
	.link-list-item {
		padding: 10px;
		box-shadow: var(--el-box-shadow-light);
		margin-bottom: 10px;
		.title {
			font-size: 16px;
			font-weight: bold;
			user-select: none;
		}
		.url {
			margin-top: 10px;
			margin-bottom: 10px;
			font-size: 12px;
			word-break: break-all;
		}
		.op-btns {
			padding: 0 10px;
			.el-link {
				margin: 0 10px;
			}
		}
	}
}
</style>
