<template>
	<div class="main">
		<div>
			<el-button @click="formDialogVisible = true" :icon="Plus" type="primary" class="ml10 mr10"> 新建海报 </el-button>
			<el-input style="width: 300px" v-model="searchValue" placeholder="请输入海报名称" clearable @change="getPosterListData">
				<template #suffix>
					<el-icon class="el-input__icon cursor-pointer">
						<Search />
					</el-icon>
				</template>
			</el-input>
		</div>
		<div v-loading="dataLoading" class="mt20 h-full">
			<el-empty description="暂无数据" v-show="PosterList.length === 0" />
			<template v-if="pagination.total > 0">
				<div class="flex-column">
					<el-row :gutter="16">
						<el-col v-for="(poster, index) in PosterList" :key="index" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
							<Card :poster="poster" @delete="handleDeleteItem" @update="handleUpdate" />
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
		<DialogForm v-model:visible="formDialogVisible" :data="formData" @refresh="getPosterListData" />
	</div>
</template>
<script setup lang="ts" name="ListCard">
import Card from "./components/Card.vue";
import { ref, onMounted, nextTick } from "vue";
import DialogForm from "./components/DialogForm.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { PosterPage, deletePoster, getPoster, getPosters } from "@/api/modules/poster";
import { Plus, Search } from "@element-plus/icons-vue";

const INITIAL_DATA = {
	name: ""
};

const pagination = ref({ current: 1, pageSize: 12, total: 0 });

const PosterList = ref([]);
const dataLoading = ref(true);

const getPosterListData = async () => {
	try {
		const { data } = await getPosters({ current: pagination.value.current, size: pagination.value.pageSize, name: searchValue.value });
		PosterList.value = data.records;
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
	getPosterListData();
});

const formDialogVisible = ref(false);
const formData = ref({ ...INITIAL_DATA });
const searchValue = ref("");

const onPageSizeChange = (size: number) => {
	pagination.value.pageSize = size;
	pagination.value.current = 1;
	getPosterListData();
};
const onCurrentChange = (current: number) => {
	pagination.value.current = current;
	getPosterListData();
};
const handleDeleteItem = (poster: PosterPage) => {
	ElMessageBox.confirm(poster ? `确认删除后${poster.name}的信息将被清空, 且无法恢复` : "", "提示", {
		type: "warning"
	})
		.then(() => {
			deletePoster(poster.id)
				.then(() => {
					ElMessage({
						showClose: true,
						message: "删除成功",
						type: "success"
					});
					nextTick(() => getPosterListData());
				})
				.catch(() => {});
		})
		.catch(() => {});
};
const handleUpdate = (poster: PosterPage) => {
	formDialogVisible.value = true;
	nextTick(() => {
		getPoster(poster.id).then((res: any) => {
			formData.value = { ...res.data };
		});
	});
};
</script>
<style>
.main {
	height: 100%;
}
</style>
