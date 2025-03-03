<template>
	<el-dialog class="add-dashboard-dialog" v-model="formVisible" title="新建仪表盘" :width="450" draggable :before-close="closeDialog">
		<!-- 表单内容 -->
		<el-form ref="ruleFormRef" :model="formData" :rules="rules" label-width="100px">
			<el-form-item label="仪表盘名称" prop="name">
				<el-input v-model="formData.name" :style="{ width: '480px' }" placeholder="请输入仪表盘名称" />
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="formData.password" type="password" show-password placeholder="请输入密码" />
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
import { saveDashboard, updateDashboard } from "@/api/modules/dashboard";

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
				layoutMode: "PC",
				password: ""
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
				updateDashboard(formData.value).then(() => {
					ElMessage.success("修改成功");
					formVisible.value = false;
					resetForm(formEl);
					emit("refresh", true);
				});
			} else {
				saveDashboard(formData.value).then(() => {
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
	name: [{ required: true, message: "请输入仪表盘名称", trigger: "blur" }]
};
</script>
<style>
.add-dashboard-dialog {
	border-radius: 8px;
}
</style>
