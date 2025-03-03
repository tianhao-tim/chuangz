<template>
	<el-container class="editor-wrapper" style="height: 100%">
		<el-header>
			<Header @save="handleSaveDashboard" @add="handleAddItem" @publish="handlePublish" @preview="handlePreview" />
		</el-header>
		<el-main style="height: 100%">
			<div class="main-setting-warp">
				<Main ref="editorMain" />
				<Setting class="setting-warp" />
			</div>
		</el-main>
	</el-container>
	<publish-dashboard v-model="publishModelVal" :share-key="shareKey" v-if="shareKey" />
	<preview v-model="previewModelVal" :share-key="shareKey" v-if="shareKey" />
</template>
<script setup lang="ts" name="DashboardEditor">
import { useRoute, onBeforeRouteLeave } from "vue-router";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { storeToRefs } from "pinia";
import Header from "./header/index.vue";
import Setting from "./setting/index.vue";
import Main from "./main/index.vue";
import { useDashboardStore } from "@/store/modules/dashboard";
import { addWaterMarker, delWaterMarker } from "@/directives/modules/waterMarker";
import PublishDashboard from "@/views/dashboard/editor/components/PublishDashboard.vue";
import Preview from ".//main/preview.vue";

const route = useRoute();

const dashboardStore = useDashboardStore();

const shareKey = ref("");

const publishModelVal = ref(false);
const previewModelVal = ref(false);

const isEditNoSave = ref(false);

onMounted(async () => {
	// 加载数据
	await dashboardStore.loadDashboard(route.query.key as string);
	// 添加水印
	addWaterMarker(waterMarkText.value, "", "");
	shareKey.value = route.query.key as string;
	window.addEventListener("beforeunload", e => beforeUnloadListener(e));
	// 加载数据会触发显得数据变更订阅 首次加载给他改回来
	setTimeout(() => {
		isEditNoSave.value = false;
	}, 600);
});

dashboardStore.$subscribe(
	() => {
		isEditNoSave.value = true;
	},
	{ detached: false }
);

const beforeUnloadListener = event => {
	if (isEditNoSave.value) {
		event.preventDefault();
		return (event.returnValue = "");
	}
};

// 提示保存
onBeforeRouteLeave((to, from, next) => {
	window.addEventListener("beforeunload", () => {});
	if (isEditNoSave.value) {
		try {
			ElMessageBox.confirm("数据尚未保存，是否保存?", "提示", {
				confirmButtonText: "保存",
				cancelButtonText: "离开",
				type: "warning"
			})
				.then(() => {
					handleSaveDashboard();
					next();
				})
				.catch(() => {
					next();
				});
		} catch (e) {}
	} else {
		next();
	}
});

onUnmounted(() => {
	delWaterMarker();
	window.removeEventListener("beforeunload", e => beforeUnloadListener(e));
});

const { pageConfig } = storeToRefs(dashboardStore);

const waterMarkText = computed(() => {
	return pageConfig.value.waterMarkText;
});

watch(waterMarkText, newVal => {
	addWaterMarker(newVal, "", "");
});

const editorMain = ref();

const handleAddItem = () => {
	setTimeout(() => {
		editorMain.value?.scrollbarToBottom();
	}, 300);
};

const handleSaveDashboard = () => {
	dashboardStore.saveDashboard();
	isEditNoSave.value = false;
	ElMessage.success("保存成功");
};

const handlePreview = () => {
	handleSaveDashboard();
	previewModelVal.value = true;
};

const handlePublish = () => {
	publishModelVal.value = true;
};
</script>
<style lang="scss" scoped>
.editor-wrapper {
	background-color: var(--el-bg-color-page);
	height: 100%;
	.el-header {
		background-color: #001529ff;
	}
	.el-main {
		padding: 0;
	}
	.main-setting-warp {
		height: 100%;
		display: flex;
		flex-direction: row;
		.setting-warp {
			height: 100%;
			overflow: auto;
			width: 350px;
			box-shadow: var(--el-box-shadow);
		}
	}
}
</style>
