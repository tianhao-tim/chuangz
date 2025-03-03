<template>
	<el-dialog class="add-poster-dialog" v-model="formVisible" title="新建海报" :width="450" draggable :before-close="closeDialog">
		<!-- 表单内容 -->
		<el-form ref="ruleFormRef" :model="formData" :rules="rules" label-width="100px">
			<el-form-item label="海报名称" prop="name">
				<el-input v-model="formData.name" :style="{ width: '480px' }" placeholder="请输入海报名称" />
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="closeDialog">取消</el-button>
			<el-button type="primary" @click="submitForm(ruleFormRef)"> 确定 </el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts" name="DashboardManageForm">
import { ref, watch } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { savePoster, updatePoster } from "@/api/modules/poster";
import { PosterFileType } from "@/views/poster/editor/types/poster";

const props = defineProps({
	visible: {
		type: Boolean,
		default: false
	},
	data: {
		type: Object,
		default: () => {
			return {
				name: "",
				posterConfig: {
					posterBgColor: "#FFFFFF",
					posterBgImage: "",
					posterFileType: PosterFileType.PNG,
					width: 750,
					height: 1334
				}
			};
		}
	}
});

const ruleFormRef = ref<FormInstance>();

const formVisible = ref(false);
const formData = ref(props.data);
const emit = defineEmits(["update:visible", "refresh"]);

const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate(valid => {
		if (valid) {
			if (formData.value.id) {
				updatePoster(formData.value).then(() => {
					ElMessage.success("修改成功");
					formVisible.value = false;
					resetForm(formEl);
					emit("refresh", true);
				});
			} else {
				savePoster(formData.value).then(() => {
					ElMessage.success("创建成功");
					formVisible.value = false;
					resetForm(formEl);
					emit("refresh", true);
				});
			}
		}
	});
};

const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};

const closeDialog = () => {
	formVisible.value = false;
	resetForm(ruleFormRef.value);
};

watch(
	() => formVisible.value,
	val => {
		emit("update:visible", val);
	}
);

watch(
	() => props.visible,
	val => {
		formVisible.value = val;
	}
);

watch(
	() => props.data,
	val => {
		formData.value = val;
	}
);

const rules = {
	name: [{ required: true, message: "请输入海报名称", trigger: "blur" }]
};
</script>
<style>
.add-poster-dialog {
	border-radius: 8px !important;
}
</style>
