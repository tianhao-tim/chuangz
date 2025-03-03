<template>
	<div class="table-box">
		<ProTable ref="proTable" :requestApi="getDataSources" :initParam="initParam" :columns="columns">
			<!-- 表格 header 按钮 -->
			<template #tableHeader>
				<el-button type="primary" :icon="CirclePlus" @click="openGroupDialog('新增')">新增分组</el-button>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button text :icon="View" @click="openGroupDialog('查看', scope.row)">查看</el-button>
				<el-button text type="primary" :icon="EditPen" @click="openGroupDialog('编辑', scope.row)">编辑</el-button>
				<el-button text type="danger" :icon="Delete" @click="deleteGroup(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<GroupDialog ref="groupDialogRef"></GroupDialog>
	</div>
</template>

<script setup lang="ts" name="useComponent">
import { ref, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import GroupDialog from "./GroupDialog.vue";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { ScreenGroup } from "@/datav/types/project";
import { useHandleData } from "@/hooks/useHandleData";
import { createDataSource, deleteDataSource, getDataSources, updateDataSource } from "@/api/modules/data/data-source";
// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 如果表格需要初始化请求参数,直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上)
const initParam = reactive({});

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
		label: "数据源名称",
		search: true
	},
	{
		prop: "sourceDesc",
		label: "数据源描述",
		search: false
	},
	{
		prop: "sourceTypeDesc",
		label: "数据源类型",
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
		width: 330,
		fixed: "right"
	}
];

// 删除用户信息
const deleteGroup = async (params: ScreenGroup) => {
	await useHandleData(deleteDataSource, params.id, `删除【${params.name}】数据源`);
	proTable.value.refresh();
};

// 打开 drawer(新增、查看、编辑)
interface GroupDialogExpose {
	acceptParams: (params: any) => void;
}

const groupDialogRef = ref<GroupDialogExpose>();
const openGroupDialog = (title: string, rowData: Partial<ScreenGroup> = {}) => {
	let params = {
		title: title,
		rowData: { ...rowData },
		isView: title === "查看",
		apiUrl: title === "新增" ? createDataSource : title === "编辑" ? updateDataSource : "",
		getTableList: proTable.value.refresh
	};
	groupDialogRef.value!.acceptParams(params);
};
</script>
