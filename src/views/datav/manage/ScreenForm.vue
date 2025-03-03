<template>
	<el-dialog style="border-radius: 8px" v-model="dialogVisible" :title="dialogData.isAdd ? '新增大屏' : '修改大屏'" width="30%">
		<el-form ref="ruleFormRef" :model="screenForm" :rules="rules" label-width="140px">
			<el-form-item label="报表名称" prop="name">
				<el-input v-model="screenForm.name" placeholder="请输入报表名称" />
			</el-form-item>
			<el-form-item label="分组" prop="groupId">
				<el-select v-model="screenForm.groupId" placeholder="请选择分组">
					<el-option :label="group.name" :value="group.id" v-for="group in groupList" :key="group.id" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts" name="ScreenForm">
import { reactive, ref, onMounted } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { MessageUtil } from "@/utils/messageUtil";
import { getScreenGroups, saveScreen } from "@/api/modules/screen";
import { ScreenGroup } from "@/datav/types/project";
import { useRouter } from "vue-router";

const router = useRouter();

const ruleFormRef = ref<FormInstance>();
const screenForm = ref({
	name: "",
	groupId: null,
	status: 0,
	config: {
		width: 1920,
		height: 1080,
		bgimage: window.location.origin + "/datav/bj.png",
		bgcolor: "rgba(13,42,67,0)",
		grid: 8,
		screenshot: "",
		zoomMode: 1,
		useWatermark: true
	}
});

const groupList = ref<ScreenGroup[]>([]);

onMounted(async () => {
	const res = await getScreenGroups();
	groupList.value = res.data;
});
const rules = reactive<FormRules>({
	name: [
		{ required: true, message: "请输入报表名称", trigger: "blur" },
		{ min: 1, max: 50, message: "长度建议输入1到50个字", trigger: "blur" }
	],
	groupId: [{ required: true, message: "请选择分组", trigger: "blur" }]
});

interface DialogProps {
	rowData?: any;
	isAdd: boolean;
}

// dialog框状态
const dialogVisible = ref(false);
const dialogData = ref<DialogProps>({
	isAdd: true
});

// 接收父组件传过来的参数
const acceptParams = (params: DialogProps): void => {
	dialogData.value = params;
	screenForm.value = params.rowData;
	dialogVisible.value = true;
};

const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate((valid, fields) => {
		if (valid) {
			saveScreen(screenForm.value).then(res => {
				MessageUtil.success("保存成功");
				dialogVisible.value = false;
				if (dialogData.value.isAdd) {
					router.push({ name: "DesignScreen", params: { screenKey: res.data.shareKey } });
				}
			});
		} else {
			console.log("error submit!", fields);
		}
	});
};
defineExpose({
	acceptParams
});
</script>
<style scoped lang="scss"></style>
