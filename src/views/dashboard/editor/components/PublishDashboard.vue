<template>
	<el-dialog v-model="visible" title="发布" width="500px" :append-to-body="true" @close="closeDialog">
		<div v-loading="loading" class="share-setting" element-loading-background="rgba(48, 54, 64, 0.8)">
			<el-form label-position="top">
				<el-form-item label="发布分享：">
					<el-switch v-model="isPublish" />
				</el-form-item>
				<el-form-item label="分享链接：">
					<el-tooltip v-model="showTooltip" placement="top" content="点击复制" :disabled="!isPublish">
						<el-input style="width: 85%" :value="shareUrl" readonly text placeholder="开启发布分享后可获取访问链接" v-copy="shareUrl">
							<template #append>
								<span v-copy="shareUrl">复制</span>
							</template>
						</el-input>
					</el-tooltip>
				</el-form-item>
				<el-form-item label="访问密码：">
					<el-input v-model="publishForm.password" type="password" clearable show-password placeholder="设置访问密码" />
				</el-form-item>
			</el-form>
			<div class="initial-dialog">
				<el-button type="primary" class="publish-btn" @click="publish">
					{{ isPublish ? "发布" : "保存" }}
				</el-button>
			</div>
		</div>
	</el-dialog>
</template>
<script setup lang="ts" name="PublishDashboard">
import { computed, ref, watch, reactive } from "vue";
import { MessageUtil } from "@/utils/messageUtil";
import { UPDATE_MODEL_EVENT } from "@/utils/constants";
import { getBasePath } from "@/utils/url";
import { getPublishInfo, updateDashboard } from "@/api/modules/dashboard";

interface PublishProps {
	shareKey: string;
	modelValue: boolean;
}

const props = defineProps<PublishProps>();

const visible = ref(false);
const isPublish = ref(false);

const publishForm = reactive({
	password: "",
	status: 0,
	id: null
});

const showTooltip = ref(false);
const loading = ref(true);

const shareUrl = computed(() => {
	return isPublish.value ? getShareUrl.value : "";
});

const emit = defineEmits([UPDATE_MODEL_EVENT]);

const closeDialog = () => {
	visible.value = false;
	emit(UPDATE_MODEL_EVENT, false);
};

const getShareUrl = computed(() => {
	return getBasePath() + "/dashboard/s/" + props.shareKey;
});

watch(
	() => props.modelValue,
	async val => {
		if (val) {
			const res = await getPublishInfo(props.shareKey);
			const { data } = res;
			loading.value = false;
			isPublish.value = data.status === 1;
			publishForm.password = data.password;
			publishForm.id = data.id;
		}
		visible.value = val;
	}
);

const publish = async () => {
	try {
		loading.value = true;
		const data = {
			id: publishForm.id,
			publishStatus: isPublish.value ? 1 : 0,
			accessPassword: publishForm.password
		};
		await updateDashboard(data);
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

	.initial-dialog {
		width: 368px;
		margin: 22px auto 8px;
		text-align: center;

		.publish-btn {
			width: 80%;
		}
	}
}
::v-deep(.el-textarea__inner) {
	background: transparent;
	border: 1px dashed transparent;
}
</style>
