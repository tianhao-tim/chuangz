<template>
	<el-dialog v-model="visible" title="发布" width="500px" :append-to-body="true" @close="closeDialog">
		<div v-loading="loading" class="share-setting" element-loading-background="rgba(48, 54, 64, 0.8)">
			<div class="share-header">
				<div class="header-wp">
					<label class="label-color">发布分享：</label>
					<div class="share-switch">
						<el-switch v-model="isPublish" />
					</div>
				</div>
			</div>
			<div class="share-verify">
				<div class="label-color">分享链接</div>
				<div class="link-content">
					<el-tooltip v-model="showTooltip" placement="top" content="点击复制" :disabled="!isPublish">
						<el-input :value="shareUrl" readonly text placeholder="开启发布分享后可获取访问链接" v-copy="shareUrl" class="cursor-pointer">
							<template #append>
								<span>复制</span>
							</template>
						</el-input>
					</el-tooltip>
				</div>
				<div class="label-color">访问密码</div>
				<div class="share-pwd">
					<el-input v-model="password" type="password" clearable show-password placeholder="设置访问密码" />
				</div>
			</div>
			<div class="initial-dialog">
				<el-button type="primary" class="publish-btn" @click="publish">
					{{ isPublish ? "发布大屏" : "保存" }}
				</el-button>
			</div>
		</div>
	</el-dialog>
</template>
<script setup lang="ts" name="PublishScreen">
import { computed, ref, watch } from "vue";
import { getPublishInfo, getShareUrl, saveScreen } from "@/api/modules/screen";
import { MessageUtil } from "@/utils/messageUtil";
import { UPDATE_MODEL_EVENT } from "@/utils/constants";

interface PublishProps {
	screenKey: string;
	modelValue: boolean;
}

const props = defineProps<PublishProps>();

const visible = ref(false);
const isPublish = ref(false);
const showTooltip = ref(false);
const password = ref("");
const loading = ref(true);

const shareUrl = computed(() => {
	return isPublish.value ? getShareUrl(props.screenKey) : "";
});

const emit = defineEmits([UPDATE_MODEL_EVENT]);

const closeDialog = () => {
	visible.value = false;
	emit(UPDATE_MODEL_EVENT, false);
};

watch(
	() => props.modelValue,
	async val => {
		if (val) {
			await handleQueryPublishInfo();
		}
		visible.value = !!val;
	}
);

watch(
	() => props.screenKey,
	async () => {
		await handleQueryPublishInfo();
	}
);

const handleQueryPublishInfo = async () => {
	const res = await getPublishInfo(props.screenKey);
	const { data } = res;
	loading.value = false;
	isPublish.value = data.status === 1;
	password.value = data.password;
};

const publish = async () => {
	try {
		loading.value = true;
		const data = {
			shareKey: props.screenKey,
			share: shareUrl.value,
			status: 1,
			password: password.value
		};
		await saveScreen(data);
		loading.value = false;
		closeDialog();
		MessageUtil.success(isPublish.value ? "发布成功" : "保存成功");
	} catch (error) {
		MessageUtil.error("发布失败");
	} finally {
		loading.value = false;
	}
};
</script>

<style lang="scss" scoped>
.share-setting {
	user-select: text;

	.share-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 16px;
		font-size: 14px;
	}

	.header-wp {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.label-color {
		font-size: 14px;
		letter-spacing: 1.09px;
		color: var(--text-color);
		white-space: nowrap;
		padding: 10px 0;
	}

	.share-switch {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.share-tutorial-url {
		line-height: 28px;
		letter-spacing: 1.09px;
		color: var(--el-color-parimary);
		text-decoration: none;
	}

	.share-verify {
		.label-color {
			padding-top: 16px;
		}
	}

	.link-content,
	.share-pwd {
		display: flex;
		align-items: center;
		font-size: 14px;
	}

	.share-input {
		width: 80%;
		height: 50px;
		line-height: 22px;
		background: var(--el-bg-color-page);
		cursor: pointer;
		resize: none;
	}

	.pwd-input {
		width: 80%;
		height: 25px;
		line-height: 25px;
		background: var(--el-bg-color-page);
		cursor: text;
	}

	.func-btn {
		color: var(--el-color-parimary);
		cursor: pointer;
		margin-left: 10px;
	}
}

.initial-dialog {
	width: 368px;
	margin: 22px auto 8px;
	text-align: center;

	.publish-btn {
		width: 80%;
	}
}
::v-deep(.el-textarea__inner) {
	background: transparent;
	border: 1px dashed transparent;
}
</style>
