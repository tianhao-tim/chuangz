<template>
	<el-container style="height: 100%">
		<el-aside class="aside">
			<div class="left-logo">
				<img src="@/assets/images/logo.png" alt="login" />
			</div>
			<el-menu class="home-menu" :default-active="defaultActive" router>
				<template v-for="(menu, index) in menus" :key="index">
					<div v-if="menu.type" :class="[index !== 0 ? 'group-divider' : '']"></div>
					<template v-if="menu.type">
						<div class="group-title">
							<i :class="menu.icon" class="tduck mr10"></i>
							{{ menu.title }}
						</div>
					</template>
					<template v-else>
						<el-menu-item :index="menu.route" :key="menu.route">
							<i :class="menu.icon" class="tduck mr10"></i>
							<span>{{ menu.name }}</span>
						</el-menu-item>
					</template>
				</template>
			</el-menu>
		</el-aside>
		<el-container style="height: 100%">
			<el-header class="header">
				<div class="user-box">
					<i class="black-mode tduck icon-taiyang" :class="isDark ? 'icon-yueliang' : 'icon-taiyang'" @click="toggleDark()"></i>
					<el-dropdown size="large" trigger="click" placement="bottom-start" @command="handleCommand">
						<el-avatar :src="globalStore.userInfo.avatar"></el-avatar>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item :icon="UserFilled" command="/sys/profile">个人中心</el-dropdown-item>
							</el-dropdown-menu>
							<el-dropdown-menu>
								<el-dropdown-item :icon="Close" command="exit">退出登录</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
			</el-header>
			<el-main style="height: 100%">
				<router-view />
			</el-main>
		</el-container>
	</el-container>
</template>

<script setup lang="ts" name="Home">
import { useGlobalStore } from "@/store";
import { reactive, ref, onMounted } from "vue";
import { Close, UserFilled } from "@element-plus/icons-vue";
import { useDark, useToggle } from "@vueuse/core";
import router from "@/routers";
import { getUserInfo } from "@/api/modules/user";

const globalStore = useGlobalStore();

const defaultActive = ref("/datav/screen/list");

onMounted(async () => {
	const userRes = await getUserInfo();
	globalStore.setUserInfo(userRes.data.user);
	console.log(router.currentRoute.value.path);
	if (router.currentRoute.value.path === "/" || router.currentRoute.value.path === "/home") {
		await router.push(defaultActive.value);
	} else {
		defaultActive.value = router.currentRoute.value.path;
	}
	if (userRes?.data?.user.id == 1) {
		menus.push({
			route: "/sys/ossconfig",
			icon: "icon-xitong",
			name: "文件存储"
		});
	}
});

const menus = reactive([
	{
		type: "group",
		title: "数据大屏",
		icon: "icon-daping"
	},
	{
		route: "/datav/screen/list",
		icon: "icon-52shouye-1",
		name: "大屏列表"
	},
	{
		route: "/datav/screen/group",
		icon: "icon--fenzu",
		name: "大屏分组"
	},
	{
		type: "group",
		title: "仪表盘",
		icon: "icon-tubiao-qiapian"
	},
	{
		route: "/dashboard/list",
		icon: "icon-shuzhuangtu",
		name: "仪表盘列表"
	},
	{
		type: "group",
		title: "数据源",
		icon: "icon-shujuku"
	},
	{
		route: "/data/dataSource",
		icon: "icon-database",
		name: "数据源配置"
	},
	{
		route: "/data/form",
		icon: "icon-yewubiaodan",
		name: "表单数据源"
	},
	{
		type: "group",
		title: "海报",
		icon: "icon-haibaosheji"
	},
	{
		route: "/poster/list",
		icon: "icon-haibaosheji",
		name: "海报列表"
	},
	{
		type: "systerm",
		title: "系统",
		icon: "icon-xitong"
	}
]);

const handleCommand = (command: string | number | object) => {
	if (command === "exit") {
		globalStore.logout();
		router.push("/user/login");
	} else {
		router.push(command);
	}
};

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<style scoped lang="scss">
.aside {
	width: 170px;
	height: 100vh;
	// box-shadow: var(--el-box-shadow-dark);
	background-color: var(--el-bg-color-page);

	.el-menu {
		border-right: none;
		--el-menu-bg-color: transparent;
	}

	.el-menu-item {
		height: 35px;
		line-height: 40px;
		width: 90%;
		margin: 5px auto;
		border-radius: 5px;
	}

	.el-menu-item.is-active {
		background-color: var(--el-menu-active-color);
		color: #ffffff;
	}

	.left-logo {
		width: 128px;
		//height: 24px;
		position: relative;
		margin: 20px auto;

		img {
			width: 100%;
		}
	}
}

.group-title {
	display: flex;
	font-size: var(--el-font-size-extra-small);
	text-align: center;
	color: var(--el-text-color-secondary);
	margin-left: 40px;
	//align-items: center;
	//align-content: center;
	//justify-content: center;
}

.group-divider {
	margin: 5px 0;
	border-top: 1px solid var(--el-border-color);
}

.header {
	border-bottom: 1px solid var(--el-border-color);
	padding: 0;

	.user-box {
		float: right;
		height: 100%;
		margin-right: 40px;
		display: flex;
		align-items: center;
	}

	.black-mode {
		font-size: 30px;
		margin-right: 15px;
		cursor: pointer;
		padding: 2px 8px;
		border: 1px solid transparent;

		&:hover {
			border: var(--el-border);
			background-color: var(--el-color-info-light-8);
			border-radius: var(--el-border-radius-base);
		}
	}
}
</style>
