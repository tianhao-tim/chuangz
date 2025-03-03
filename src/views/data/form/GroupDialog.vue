<template>
	<el-dialog class="group-dialog" v-model="dialogVisible" :destroy-on-close="true" size="600px" :title="`${dialogData.title}表单`">
		<el-form ref="ruleFormRef" :rules="rules" :disabled="dialogData.isView" :model="dialogData.rowData" label-width="120px">
			<el-form-item label="表单名称" prop="sourceName" clearable>
				<el-input v-model="dialogData.rowData.sourceName" placeholder="表单名称"></el-input>
			</el-form-item>
			<el-form-item label="表单描述" prop="sourceDesc" clearable>
				<el-input v-model="dialogData.rowData.sourceDesc" type="textarea" placeholder="表单描述"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="dialogVisible = false">取消</el-button>
			<el-button type="primary" v-show="!dialogData.isView" @click="handleSubmit">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts" name="DataSourceDialog">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { FormDataSource } from "@/api/modules/data/form";

const rules = reactive({
	sourceName: [{ required: true, message: "请输入表单名称", trigger: "blur" }]
});

interface DialogProps {
	title: string;
	isView: boolean;
	rowData?: FormDataSource;
	apiUrl?: (params: any) => Promise<any>;
	getTableList?: () => Promise<any>;
}

// dialog框状态
const dialogVisible = ref(false);
const dialogData = ref<DialogProps>({
	isView: false,
	title: ""
});

// 接收父组件传过来的参数
const acceptParams = (params: DialogProps): void => {
	dialogData.value = params;
	dialogVisible.value = true;
};

const ruleFormRef = ref<FormInstance>();
// 提交数据（新增/编辑）
const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) return;
		try {
			if (!dialogData.value.apiUrl) return;
			await dialogData.value.apiUrl(dialogData.value.rowData);
			ElMessage.success({ message: `${dialogData.value.title}表单成功！` });
			dialogData.value.getTableList && dialogData.value.getTableList();
			dialogVisible.value = false;
		} catch (error) {
			console.log(error);
		}
	});
};

defineExpose({
	acceptParams
});
</script>

<style>
.group-dialog {
	border-radius: 8px !important;
}
</style>
