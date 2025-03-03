<template>
	<div class="mange-wrap">
		<div class="add-poster-dialog">
			<el-button @click="formDialogVisible = true" :icon="Plus" type="primary" class="ml10 mr10"> 新建仪表盘 </el-button>
			<el-input style="width: 300px" v-model="searchValue" placeholder="请输入产品名称" clearable @change="getDashboardListData">
				<template #suffix>
					<el-icon class="el-input__icon cursor-pointer">
						<Search />
					</el-icon>
				</template>
			</el-input>
		</div>
		<div v-loading="dataLoading" class="mt20 h-full">
			<el-empty description="暂无数据" v-show="dashboardList.length === 0" />
			<template v-if="pagination.total > 0">
				<div class="flex-column">
					<el-row :gutter="16">
						<el-col v-for="(dashboard, index) in dashboardList" :key="index" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
							<Card :dashboard="dashboard" @delete="handleDeleteItem" @update="handleUpdate" />
						</el-col>
					</el-row>
					<el-pagination
						class="m10"
						v-model:currentPage="pagination.current"
						:page-size="pagination.pageSize"
						:total="pagination.total"
						layout="total, prev, pager, next"
						background
						@size-change="onPageSizeChange"
						@current-change="onCurrentChange"
					/>
				</div>
			</template>
		</div>
		<DialogForm v-model:visible="formDialogVisible" :data="formData" @refresh="getDashboardListData" />
	</div>
</template>
<script setup lang="ts" name="ListCard">
import Card from "./components/Card.vue";
import { ref, onMounted, nextTick } from "vue";
import DialogForm from "./components/DialogForm.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { DashboardPage, deleteDashboard, getDashboard, getDashboards } from "@/api/modules/dashboard";
import { Plus, Search } from "@element-plus/icons-vue";

const INITIAL_DATA = {
	name: "",
	password: "",
	layoutMode: "PC"
};

const pagination = ref({ current: 1, pageSize: 12, total: 0 });

const dashboardList = ref([]);
const dataLoading = ref(true);

const getDashboardListData = async () => {
	try {
		const { data } = await getDashboards({ current: pagination.value.current, size: pagination.value.pageSize, name: searchValue.value });
		dashboardList.value = data.records;
		pagination.value = {
			...pagination.value,
			total: data.total
		};
	} catch (e) {
		console.log(e);
	} finally {
		setTimeout(() => {
			dataLoading.value = false;
		}, 500);
	}
};

onMounted(() => {
	getDashboardListData();
});

const formDialogVisible = ref(false);
const formData = ref({ ...INITIAL_DATA });
const searchValue = ref("");

const onPageSizeChange = (size: number) => {
	pagination.value.pageSize = size;
	pagination.value.current = 1;
	getDashboardListData();
};
const onCurrentChange = (current: number) => {
	pagination.value.current = current;
	getDashboardListData();
};
const handleDeleteItem = (dashboard: DashboardPage) => {
	ElMessageBox.confirm(dashboard ? `确认删除后${dashboard.name}的信息将被清空, 且无法恢复` : "", "提示", {
		type: "warning"
	})
		.then(() => {
			deleteDashboard(dashboard.id)
				.then(() => {
					ElMessage({
						showClose: true,
						message: "删除成功",
						type: "success"
					});
					nextTick(() => getDashboardListData());
				})
				.catch(() => {});
		})
		.catch(() => {});
};
const handleUpdate = (dashboard: DashboardPage) => {
	formDialogVisible.value = true;
	nextTick(() => {
		getDashboard(dashboard.id).then((res: any) => {
			formData.value = { ...res.data };
		});
	});
};
</script>
<style>
.mange-wrap {
	height: 100%;
	padding: 20px 0;
	border-radius: 8px !important;
}
.add-poster-dialog {
	border-radius: 8px !important;
}
</style>
