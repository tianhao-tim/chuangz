<template>
	<div class="table-box">
		<ProTable ref="proTable" :requestApi="getFormDataSources" :initParam="initParam" :columns="columns">
			<!-- 表格 header 按钮 -->
			<template #tableHeader>
				<el-button type="primary" :icon="CirclePlus" @click="openGroupDialog('新增')">新增表单</el-button>
			</template>
			<!-- 使用作用域插槽自定义单元格内容 username -->
			<template #fields="scope">
				{{ scope.row.fields?.length || 0 }}
				<el-link type="primary" @click="handleViewFields(scope.row)">详情</el-link>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button text :icon="RefreshLeft" @click="syncFormFields(scope.row.id)">表单字段同步</el-button>
				<el-button text :icon="Refresh" @click="syncFormData(scope.row.id)">全量数据同步</el-button>
				<el-button text :icon="View" @click="openGroupDialog('查看', scope.row)">查看</el-button>
				<el-button text type="primary" :icon="EditPen" @click="openGroupDialog('编辑', scope.row)">编辑</el-button>
				<el-button text type="danger" :icon="Delete" @click="deleteGroup(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<GroupDialog ref="groupDialogRef"></GroupDialog>
		<el-dialog v-model="dialogVisible" title="字段详情" width="500">
			<el-table :data="fieldsData" style="width: 100%">
				<el-table-column prop="value" label="Key" />
				<el-table-column prop="label" label="名称" />
			</el-table>
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="dialogVisible = false"> 取消 </el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="useComponent">
import { ref, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import GroupDialog from "./GroupDialog.vue";
import { CirclePlus, Delete, EditPen, Refresh, RefreshLeft, View } from "@element-plus/icons-vue";
import { useHandleData } from "@/hooks/useHandleData";
import {
	createFormDataSource,
	deleteFormDataSource,
	FormDataSource,
	getFormDataSources,
	syncFormDataSource,
	syncFormFieldsSource,
	updateFormDataSource
} from "@/api/modules/data/form";
import { ElMessageBox } from "element-plus";
import { MessageUtil } from "@/utils/messageUtil";
// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 如果表格需要初始化请求参数,直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上)
const initParam = reactive({});

const dialogVisible = ref(false);

const fieldsData = ref([]);

const handleViewFields = (row: FormDataSource) => {
	fieldsData.value = row.fields;
	dialogVisible.value = true;
};

// 配置项
const columns: Partial<ColumnProps>[] = [
	{
		type: "selection",
		width: 80,
		fixed: "left"
	},
	{
		type: "index",
		label: "序号",
		width: 80
	},
	{
		prop: "sourceName",
		label: "表单名称",
		search: true
	},
	{
		prop: "sourceDesc",
		label: "表单描述",
		search: false,
		width: 120
	},
	{
		prop: "fields",
		label: "字段数量",
		search: false
	},
	{
		prop: "dataCount",
		label: "数据量",
		search: false
	},
	{
		prop: "updateTime",
		label: "修改时间",
		width: 200
	},
	{
		prop: "createTime",
		label: "创建时间",
		width: 200
	},
	{
		prop: "operation",
		label: "操作",
		width: 630,
		fixed: "right"
	}
];

const syncFormFields = (id: number) => {
	ElMessageBox.prompt("请输入同步字段url", "提示", {
		confirmButtonText: "确认",
		cancelButtonText: "取消"
	})
		.then(({ value }) => {
			syncFormFieldsSource(id, value).then(() => {
				MessageUtil.success("同步成功");
			});
		})
		.catch(() => {});
};

const syncFormData = (id: number) => {
	ElMessageBox.prompt("请输入同步数据url", "提示", {
		confirmButtonText: "确认",
		cancelButtonText: "取消"
	})
		.then(({ value }) => {
			syncFormDataSource(id, value).then(() => {
				MessageUtil.success("开始同步,稍后刷新查看页面条数");
			});
		})
		.catch(() => {});
};

// 删除用户信息
const deleteGroup = async (params: FormDataSource) => {
	await useHandleData(deleteFormDataSource, params.id, `删除【${params.sourceName}】表单`);
	proTable.value.refresh();
};

// 打开 drawer(新增、查看、编辑)
interface GroupDialogExpose {
	acceptParams: (params: any) => void;
}

const groupDialogRef = ref<GroupDialogExpose>();
const openGroupDialog = (title: string, rowData: Partial<FormDataSource> = {}) => {
	let params = {
		title: title,
		rowData: { ...rowData },
		isView: title === "查看",
		apiUrl: title === "新增" ? createFormDataSource : title === "编辑" ? updateFormDataSource : "",
		getTableList: proTable.value.refresh
	};
	groupDialogRef.value!.acceptParams(params);
};
</script>
