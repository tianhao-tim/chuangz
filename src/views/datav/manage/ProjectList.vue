<template>
	<div class="project-list">
		<div class="project-header">
			<div class="header-manager">
				<div class="search">
					<el-input v-model.trim="searchParam.name" :prefix-icon="Filter" clearable class="search-input" placeholder="搜索" @change="getTableList" />
				</div>
				<div class="ml15">
					<el-select v-model="searchParam.groupId" clearable placeholder="请选择分组" style="width: 200px">
						<el-option :label="group.name" :value="group.id" v-for="group in groupList" :key="group.id" />
					</el-select>
				</div>
				<el-dropdown class="sort-type">
					<span class="el-dropdown-link">
						{{ sorts[searchParam.sortColumn] }}
						<el-icon class="el-icon--right">
							<arrow-down />
						</el-icon>
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item v-for="(v, k) in sorts" :key="k" @click="onSortChange(k)">{{ v }}</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
				<el-button type="primary" :icon="Search" @click="getTableList">查询</el-button>
				<el-button type="success" :icon="Plus" @click="openScreenDialog({}, true)">新建</el-button>
			</div>
		</div>
		<div class="main-screen" v-if="tableData">
			<div v-for="screen in tableData" :key="screen.id">
				<MyScreen :screen="screen" @refresh="getTableList" @update="openScreenDialog" />
			</div>
		</div>
		<el-empty :image-size="200" v-if="tableData.length === 0" />
		<div class="page">
			<el-pagination
				v-model:current-page="pageable.current"
				v-model:page-size="pageable.size"
				layout="total, prev, pager, next"
				background
				:total="pageable.total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>
		<publish-screen v-model="visiblePublish" :screen-key="publishScreenKey" />
		<screen-form ref="screenFormRef" />
	</div>
</template>

<script setup lang="ts" name="ProjectList">
import { onMounted, provide, ref } from "vue";
import MyScreen from "./MyScreen.vue";
import PublishScreen from "./PublishScreen.vue";
import ScreenForm from "./ScreenForm.vue";
import { useTable } from "@/hooks/useTable";
import { getScreenGroups, getScreens } from "@/api/modules/screen";
import { Search, Plus, Filter } from "@element-plus/icons-vue";
import { ScreenGroup } from "@/datav/types/project";

const sorts = ref({
	name: "按名称排序",
	createTime: "按创建时间排序",
	updateTime: "按修改时间排序"
});
const visiblePublish = ref(false);
const publishScreenKey = ref("");
const { tableData, pageable, getTableList, searchParam, handleSizeChange, handleCurrentChange } = useTable(getScreens);

searchParam.value.sortColumn = "createTime";
const onSortChange = (key: string) => {
	searchParam.value.sortColumn = key;
	getTableList();
};

const groupList = ref<ScreenGroup[]>([]);

onMounted(async () => {
	await getTableList();
	const res = await getScreenGroups();
	groupList.value = res.data;
});

provide("publish", (key: string) => {
	visiblePublish.value = true;
	publishScreenKey.value = key;
});

interface ScreenDialogExpose {
	acceptParams: (params: any) => void;
}

const screenFormRef = ref<ScreenDialogExpose>();

const openScreenDialog = (rowData: any = {}, isAdd: boolean = false) => {
	let params = {
		rowData: rowData,
		isAdd: isAdd
	};
	screenFormRef.value!.acceptParams(params);
};
</script>

<style lang="scss" scoped>
@import "@/components/UI/style/mixins/util";

.project-list {
	margin-left: 50px;
}

.ellipsis {
	@include utils-ellipsis;
	display: block;
}

.project-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 5px;
	padding-top: 10px;
	height: 56px;
	z-index: 1;
	min-width: 1024px;

	.header-manager {
		display: flex;
		align-items: center;

		.search {
			margin-left: 20px;
		}

		.sort-type {
			margin-left: 20px;
			line-height: 32px;
		}

		.el-button {
			margin-left: 20px;
		}
	}
}

.el-dropdown-link:focus {
	outline: none;
	cursor: pointer;
}

.main-screen {
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
	padding-top: 8px;
	user-select: none;
	padding-bottom: 50px;
}
</style>
