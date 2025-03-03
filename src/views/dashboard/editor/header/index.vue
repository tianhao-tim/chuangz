<template>
	<el-page-header @back="goBack">
		<template #content>
			<div class="flex-center">
				<span class="title">
					<el-icon style="vertical-align: center; padding-top: 2px">
						<Setting />
					</el-icon>
					设计仪表盘
				</span>
				<el-menu class="header-menus" mode="horizontal" :ellipsis="false" active-text-color="#1890ff" background-color="#001529FF" text-color="#fff">
					<template v-for="menu in menus" :key="menu.componentName">
						<el-sub-menu :index="menu.componentName">
							<template #title>
								<i :class="menu.icon" class="mr5" />
								{{ menu.title }}
							</template>
							<el-menu-item v-for="com in menu.components" :key="com.componentName" :index="com.componentName" @click="handleClickMenu(com)">
								<i :class="com.icon" class="mr5" />
								{{ com.title }}
							</el-menu-item>
						</el-sub-menu>
					</template>
				</el-menu>
			</div>
		</template>
		<template #extra>
			<div class="flex items-center">
				<el-button type="primary" class="ml2" @click="handlePreview" icon="View">预览</el-button>
				<el-button type="primary" class="ml2" @click="handleSaveDashboard" icon="Select">保存</el-button>
				<el-button type="success" class="ml2" @click="handlePublish" icon="Promotion">发布</el-button>
			</div>
		</template>
	</el-page-header>
</template>
<script setup lang="ts" name="DashboardEditorHeader">
import { useRouter } from "vue-router";
import { list, createComponentConfig } from "./componentList";
import { useDashboardStore } from "@/store/modules/dashboard";

const dashboardStore = useDashboardStore();
const menus = list;

let router = useRouter();
const goBack = () => {
	router.go(-1);
};

const emits = defineEmits(["save", "add", "publish", "preview"]);

const handleSaveDashboard = () => {
	emits("save");
};

const handlePublish = () => {
	emits("publish");
};

const handlePreview = () => {
	emits("preview");
};

const handleClickMenu = async (com: any) => {
	const componentConfig = await createComponentConfig(com.type, com.componentName);
	componentConfig.name = `${com.title}${dashboardStore.componentList.length + 1}`;
	dashboardStore.addComponent(componentConfig);
	emits("add");
};
</script>
<style lang="scss" scoped>
:deep(.el-page-header__breadcrumb) {
	margin-bottom: 0 !important;
}
.el-page-header {
	color: #ffffff !important;
	min-width: 1024px;
}
.title {
	color: #ffffff;
	font-weight: 500;
	font-size: 16px;
	margin-right: 20px;
	display: flex;
	align-items: center;
	.el-icon {
		margin-right: 5px;
	}
}
.header-menus {
	float: left;
}
</style>
