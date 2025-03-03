<template>
	<div class="list-card-item">
		<div class="list-card-item_detail" @click="handleClickDesign">
			<el-row justify="space-between">
				<div class="list-card-item_detail--logo">
					<TrendCharts />
				</div>
				<div class="list-card-item_detail--operation">
					<el-tag
						:type="dashboard.publishStatus === 1 ? 'success' : 'info'"
						effect="dark"
						class="list-card-item_detail--operation--tag"
						@click="handleClickDesign"
					>
						{{ dashboard.publishStatus === 1 ? "已发布" : "未发布" }}
					</el-tag>
					<el-dropdown ref="moreDropdown" trigger="click">
						<el-icon class="el-icon--right" style="transform: rotate(90deg)" :size="20" @click.stop="showMoreDropdown">
							<MoreFilled color="#000000" />
						</el-icon>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item @click="handleClickDesign()"> 设计 </el-dropdown-item>
								<el-dropdown-item @click="handleClickManage(dashboard)"> 修改 </el-dropdown-item>
								<el-dropdown-item @click="handleClickDelete(dashboard)"> 删除 </el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
			</el-row>
			<p class="list-card-item_detail--name">
				{{ dashboard.name }}
			</p>
			<p class="list-card-item_detail--desc">
				{{ dashboard.createTime }}
			</p>
		</div>
	</div>
</template>

<script setup lang="ts" name="ReCard">
import { PropType, ref } from "vue";
import { DashboardPage } from "@/api/modules/dashboard";
import router from "@/routers";
const props = defineProps({
	dashboard: {
		type: Object as PropType<DashboardPage>
	}
});

const moreDropdown = ref();

const emit = defineEmits(["update", "delete"]);

const handleClickManage = (product: any) => {
	emit("update", product);
};

const handleClickDelete = (product: any) => {
	emit("delete", product);
};
const handleClickDesign = () => {
	router.push({
		path: "/dashboard/editor",
		query: {
			key: props.dashboard.shareKey
		}
	});
};

const showMoreDropdown = () => {
	moreDropdown.value.handleOpen();
};
</script>

<style scoped lang="scss">
.list-card-item {
	height: 170px;
	display: flex;
	flex-direction: column;
	margin-bottom: 12px;
	border-radius: 8px;
	overflow: hidden;
	cursor: pointer;
	box-shadow: var(--el-box-shadow-light);

	&_detail {
		flex: 1;
		padding: 24px 32px;
		min-height: 140px;

		&--logo {
			width: 36px;
			height: 36px;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #e0ebff;
			font-size: 32px;
			color: #213b6a;
		}

		&--operation {
			display: flex;
			height: 100%;
			align-items: center;
			&--tag {
				border: 0;
			}
		}

		&--name {
			margin: 24px 0 8px 0;
			color: var(--el-text-color-primary);
			font-weight: bold;
			font-size: var(--el-font-size-large);
		}
		&--desc {
			line-height: 20px;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			margin-top: 20px;
			height: 40px;
			color: var(--el-text-color-regular);
			font-size: var(--el-font-size-base);
		}
	}
}
</style>
