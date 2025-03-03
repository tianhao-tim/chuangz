<template>
	<div class="main-wrapper" v-if="!loading" :style="getMainStyle">
		<div v-if="!noPublish" class="h-full w-full">
			<el-scrollbar ref="scrollbarRef" v-if="componentList" wrap-class="layout-content-scrollbar">
				<grid-layout
					v-model:layout="dashboardPage.componentList"
					:col-num="12"
					:row-height="45"
					:cols="{ lg: 12, md: 12, sm: 6, xs: 6, xxs: 6 }"
					:isDraggable="false"
					:isResizable="false"
					responsive
					ref="gridLayoutRef"
				>
					<template #default="{ gridItemProps }">
						<grid-item
							v-for="item in dashboardPage.componentList"
							:key="item.id"
							v-bind="gridItemProps"
							:x="item.x"
							:y="item.y"
							:w="item.w"
							:h="item.h"
							:i="item.i"
							:style="{ backgroundColor: item.basicConfig.backgroundColor }"
						>
							<chart-item :chartConfig="item" :theme-color="themeColor" :theme-setting="themeSetting" />
						</grid-item>
					</template>
				</grid-layout>
			</el-scrollbar>
			<div class="empty-wrapper" v-if="!componentList">
				<el-empty description="无数据" />
			</div>
		</div>
		<el-result icon="error" title="无法访问" sub-title="不存在该链接或者暂无发布" v-if="noPublish"> </el-result>
	</div>
</template>
<script setup lang="ts" name="DashboardShare">
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import { chartColors, globalThemeJson } from "@/views/dashboard/components/chartThemes";
import ChartItem from "./ChartItem.vue";
import { addWaterMarker, delWaterMarker } from "@/directives/modules/waterMarker";
import { hasPassword, checkPassword, getDashboardByKey } from "@/api/modules/dashboard";
import { DashboardPage } from "@/views/dashboard/editor/types";
import emitter from "@/utils/mitt";
import { useQuery } from "@/views/dashboard/components/basic/Form/useEnterQueryData";
import { ElMessageBox } from "element-plus";

const dashboardPage = reactive<DashboardPage>({
	componentList: [],
	id: 0
});

const pageConfig = computed(() => {
	return dashboardPage?.pageConfig;
});

const componentList = computed(() => {
	return dashboardPage?.componentList;
});

const getMainStyle = computed(() => {
	return {
		backgroundColor: pageConfig.value?.bgColor,
		backgroundImage: pageConfig.value?.bgImage ? `url(${pageConfig.value.bgImage})` : ""
	};
});

// 主题色
const themeSetting = globalThemeJson;

// 配置项
const themeColor = computed(() => {
	const themeStyle = pageConfig.value.themeStyle || "dark";
	return chartColors[themeStyle];
});

const shareKey = ref();
const hasPasswordVal = ref();
const loading = ref(false);
const noPublish = ref(false);

const props = defineProps({
	shareKey: {
		type: String,
		required: true
	},
	previewMode: {
		type: Boolean,
		required: false
	}
});
onMounted(async () => {
	shareKey.value = props.shareKey;
	if (props.previewMode) {
		loadDashboardData();
		return;
	}
	const { data: hashPassBool } = await hasPassword(shareKey.value);
	hasPasswordVal.value = hashPassBool;
	if (hashPassBool) {
		await handleCheckPassWord();
	} else {
		loadDashboardData();
	}
});

onUnmounted(() => {
	delWaterMarker();
});

const handleCheckPassWord = async () => {
	// 有密码
	ElMessageBox.prompt("请输入密码", "提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		inputPattern: /.+/,
		customClass: "validate-password-message-box",
		inputErrorMessage: "密码不能为空",
		draggable: true
	})
		.then(async ({ value }) => {
			const { data: checkPassBool } = await checkPassword(shareKey.value, value);
			if (checkPassBool) {
				loadDashboardData();
			} else {
				// 密码错误
				await ElMessageBox.alert("密码错误", "提示", {
					confirmButtonText: "确定",
					callback: () => {}
				});
			}
		})
		.catch(() => {});
};

const loadDashboardData = () => {
	loading.value = true;
	getDashboardByKey(shareKey.value).then((res: { data: DashboardPage }) => {
		// 未发布并且不是预览模式
		if (!res.data.publishStatus && !props.previewMode) {
			noPublish.value = true;
			loading.value = false;
			return;
		}
		const { pageConfig, id, componentList, publishStatus } = res.data;
		dashboardPage.pageConfig = pageConfig;
		dashboardPage.id = id;
		dashboardPage.componentList = componentList;
		dashboardPage.publishStatus = publishStatus;
		addWaterMarker(pageConfig.waterMarkText, "", "");
		loading.value = false;
	});
};

emitter.on("chart-form-query", event => {
	useQuery(dashboardPage.componentList, event.chartConfig, event.formData);
});
</script>
<style lang="scss" scoped>
.main-wrapper {
	height: 100%;
	width: 100%;
}

.empty-wrapper {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.layout-content {
	background-color: var(--el-bg-color);
	height: 100%;
	width: 100%;
	overflow: hidden;
}
:deep(.vue-grid-item.vue-grid-placeholder) {
	background: #a0cfff !important;
}
.vue-grid-item {
	height: 100%;
	width: 100%;
	box-shadow: var(--el-box-shadow-light);
	border: var(--el-border);
	background-color: var(--el-bg-color);
	position: relative;
	border-radius: var(--el-border-radius-base);
	//padding: 25px 10px 10px 10px;
}
.grid-item-selected {
	border-color: var(--el-color-primary) !important;
}

:deep(.el-overlay-message-box) {
	display: flex !important;
}
</style>
