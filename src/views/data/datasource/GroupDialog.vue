<template>
	<el-dialog class="group-dialog" v-model="dialogVisible" :destroy-on-close="true" size="600px" :title="`${dialogData.title}数据源`">
		<el-form ref="ruleFormRef" :rules="rules" :disabled="dialogData.isView" :model="dialogData.rowData" label-width="120px">
			<el-form-item label="数据源名称" prop="name" clearable>
				<el-input v-model="dialogData.rowData.sourceName" placeholder="数据源名称"></el-input>
			</el-form-item>
			<el-form-item label="数据源描述" prop="sourceDesc" clearable>
				<el-input v-model="dialogData.rowData.sourceDesc" type="textarea" placeholder="数据源描述"></el-input>
			</el-form-item>
			<el-form-item label="数据源描述" prop="sourceDesc" clearable>
				<el-select v-model="dialogData.rowData.sourceType" @change="handleSourceTypeChange">
					<el-option v-for="option in sourceTypeOptions" :key="option.value" :value="option.value" :label="option.label"> </el-option>
				</el-select>
			</el-form-item>
			<el-divider>数据源配置</el-divider>
			<div v-if="dialogData.rowData.sourceType === 1">
				<el-form-item label="数据库地址" prop="sourceConfig.url" clearable>
					<el-input v-model="dialogData.rowData.sourceConfig.url" placeholder="数据库链接url"></el-input>
				</el-form-item>
				<el-form-item label="数据库名称" prop="sourceConfig.username" clearable>
					<el-input v-model="dialogData.rowData.sourceConfig.username" placeholder="数据库账号名"></el-input>
				</el-form-item>
				<el-form-item label="数据库用户名" prop="sourceConfig.password" clearable>
					<el-input v-model="dialogData.rowData.sourceConfig.password" placeholder="数据库密码"></el-input>
				</el-form-item>
			</div>
		</el-form>
		<template #footer>
			<el-button @click="dialogVisible = false">取消</el-button>
			<el-button type="danger" @click="testConnect">测试连接</el-button>
			<el-button type="primary" v-show="!dialogData.isView" @click="handleSubmit">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts" name="DataSourceDialog">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { DataSource, testConnection } from "@/api/modules/data/data-source";

const rules = reactive({
	sourceName: [{ required: true, message: "请输入数据源名称", trigger: "blur" }],
	sourceDesc: [{ required: true, message: "请输入数据源描述", trigger: "blur" }],
	sourceType: [{ required: true, message: "请选择数据源类型", trigger: "blur" }],
	"sourceConfig.url": [{ required: true, message: "请输入数据库链接url", trigger: "blur" }],
	"sourceConfig.username": [{ required: true, message: "请输入数据库账号名", trigger: "blur" }],
	"sourceConfig.password": [{ required: true, message: "请输入数据库密码", trigger: "blur" }]
});

const sourceTypeOptions = [
	{
		value: 1,
		label: "mysql"
	}
];

interface DialogProps {
	title: string;
	isView: boolean;
	rowData?: DataSource;
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
			ElMessage.success({ message: `${dialogData.value.title}数据源成功！` });
			dialogData.value.getTableList && dialogData.value.getTableList();
			dialogVisible.value = false;
		} catch (error) {
			console.log(error);
		}
	});
};

const handleSourceTypeChange = (value: number) => {
	if (value === 1) {
		dialogData.value.rowData.sourceConfig = {
			url: "jdbc:mysql://localhost:3306/tduck-pro?useSSL=false&useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&tinyInt1isBit=false&nullCatalogMeansCurrent=true",
			username: "root",
			password: "root"
		};
	}
};

const testConnect = () => {
	testConnection(dialogData.value.rowData).then(() => {
		ElMessage.success({ message: `连接成功` });
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
