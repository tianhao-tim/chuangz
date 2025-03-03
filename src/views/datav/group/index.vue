<template>
	<div class="table-box">
		<ProTable ref="proTable" :requestApi="getScreenGroups" :initParam="initParam" :columns="columns">
			<!-- 表格 header 按钮 -->
			<template #tableHeader>
				<el-button type="primary" :icon="CirclePlus" @click="openGroupDialog('新增')">新增分组</el-button>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button text type="" :icon="View" @click="openGroupDialog('查看', scope.row)">查看</el-button>
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
import { createScreenGroup, deleteScreenGroup, getScreenGroups, updateScreenGroup } from "@/api/modules/screen-group";
import { ScreenGroup } from "@/datav/types/project";
import { useHandleData } from "@/hooks/useHandleData";
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
		prop: "name",
		label: "分组名",
		search: true
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
	await useHandleData(deleteScreenGroup, params.id, `删除【${params.name}】分组`);
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
		apiUrl: title === "新增" ? createScreenGroup : title === "编辑" ? updateScreenGroup : "",
		getTableList: proTable.value.refresh
	};
	groupDialogRef.value!.acceptParams(params);
};
</script>
