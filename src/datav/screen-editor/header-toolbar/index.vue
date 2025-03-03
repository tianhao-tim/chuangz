<template>
	<div class="datav-header">
		<div class="datav-edit-header">
			<div class="editor-header-wp">
				<div class="editor-config">
					<el-tooltip content="主页" effect="blue" :show-after="500" :enterable="false">
						<div :class="['head-btn mr4']" @click="$router.push({ path: '/' })">
							<i class="tduck icon-zhuye head-btn-icon" />
						</div>
					</el-tooltip>
					<el-tooltip content="图层" effect="blue" :show-after="500" :enterable="false">
						<div :class="['head-btn mr4', { '--selected': layer.show }]" @click="changeLayerPanel">
							<i class="v-icon-layer head-btn-icon" />
						</div>
					</el-tooltip>
					<el-tooltip content="组件列表" effect="blue" :show-after="500" :enterable="false">
						<div :class="['head-btn mr4', { '--selected': components.show }]" @click="changeComponentsPanel">
							<i :class="['v-icon-box com-list-icon', { '--rotate': !components.show }]" />
						</div>
					</el-tooltip>
					<el-tooltip content="右侧面板" effect="blue" :show-after="500" :enterable="false">
						<div :class="['head-btn mr4', { '--selected': config.show }]" @click="changeConfigPanel">
							<i class="v-icon-rpanel head-btn-icon" />
						</div>
					</el-tooltip>
					<el-tooltip content="工具箱" effect="blue" :show-after="500" :enterable="false">
						<div :class="['head-btn mr4', { '--selected': toolbox.show }]" @click="changeToolboxPanel">
							<i class="v-icon-toolbox head-btn-icon" />
						</div>
					</el-tooltip>
				</div>
			</div>
			<div class="screen-info">
				<i class="v-icon-workspace workspace-icon" @click="goHome" />
				<span>{{ "工作空间 - " + screen.name }}</span>
			</div>
			<div class="global-actions">
				<el-tooltip content="保存" effect="blue" :show-after="500" :enterable="false">
					<div class="head-btn ml4" @click="handleSaveScreen">
						<i class="tduck icon-baocun head-btn-icon" />
					</div>
				</el-tooltip>
				<el-tooltip content="发布" effect="blue" :show-after="500" :enterable="false">
					<div class="head-btn ml4" @click="goPublish">
						<i class="v-icon-release head-btn-icon" />
					</div>
				</el-tooltip>
				<el-tooltip content="预览" effect="blue" :show-after="500" :enterable="false">
					<div class="head-btn ml4" @click="goPreview">
						<i class="v-icon-preview head-btn-icon" />
					</div>
				</el-tooltip>
			</div>
		</div>
		<head-loading />
		<publish-screen v-model="visiblePublish" :screen-key="publishKey" class="publish-screen" />
	</div>
</template>

<script lang="ts" setup name="HeaderToolbar">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { PanelType, useToolbarStore } from "@/store/modules/toolbar";
import { useEventStore } from "@/store/modules/event";
import { useComStore } from "@/store/modules/com";
import { useEditorStore } from "@/store/modules/editor";
import { storeToRefs } from "pinia";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { saveScreen } from "@/api/modules/screen";
import { MessageUtil } from "@/utils/messageUtil";
import { ElMessageBox } from "element-plus";
import HeadLoading from "./head-loading.vue";
import PublishScreen from "@/views/datav/manage/PublishScreen.vue";
const visiblePublish = ref(false);
const publishKey = ref("");

const toolbarStore = useToolbarStore();
const eventStore = useEventStore();
const comStore = useComStore();
const editorStore = useEditorStore();

const { layer, components, config, toolbox } = storeToRefs(toolbarStore);
const { componentsView, publishersView, subscribersView } = storeToRefs(eventStore);
const { coms, subComs } = storeToRefs(comStore);
const { screen, pageConfig } = storeToRefs(editorStore);

const changeLayerPanel = () => {
	toolbarStore.setPanelState(PanelType.layer, !layer.value.show);
};

const changeComponentsPanel = () => {
	toolbarStore.setPanelState(PanelType.components, !components.value.show);
};

const changeConfigPanel = () => {
	toolbarStore.setPanelState(PanelType.config, !config.value.show);
};

const changeToolboxPanel = () => {
	toolbarStore.setPanelState(PanelType.toolbox, !toolbox.value.show);
};

const router = useRouter();

const goHome = () => {
	const route = router.resolve("/");
	window.open(route.href, "_blank", "noopener=yes,noreferrer=yes");
};

const goPublish = () => {
	visiblePublish.value = true;
	publishKey.value = screen.value.shareKey || "";
};

const handleSaveScreen = async () => {
	const toolbarStore = useToolbarStore();
	toolbarStore.addLoading();
	try {
		const data = {
			...screen.value,
			config: pageConfig.value,
			coms: [...coms.value, ...subComs.value],
			variables: {
				componentsView: componentsView.value,
				publishersView: publishersView.value,
				subscribersView: subscribersView.value
			}
		};
		await saveScreen(data);
		MessageUtil.success("大屏已保存");
	} catch (error) {
		MessageUtil.error(`保存大屏失败：${error}`);
	} finally {
		saveStatus.value = true;
		toolbarStore.removeLoading();
	}
};

const goPreview = async () => {
	await handleSaveScreen();
	const route = router.resolve({
		name: "Screen",
		params: {
			screenKey: screen.value.shareKey
		}
	});
	const a = document.createElement("a");
	a.rel = "noopener, noreferrer";
	a.href = route.href;
	a.target = "_blank";
	a.click();
};

onMounted(async () => {
	window.addEventListener("beforeunload", e => beforeUnloadListener(e));
});

const saveStatus = ref(true);

watch(
	() => pageConfig.value,
	() => {
		console.log("a");
		saveStatus.value = false;
	},
	{ deep: true }
);
watch(
	() => coms.value,
	(val, oldVal) => {

		if (val && oldVal && val.length !== oldVal.length) {
			saveStatus.value = false;
		}
	},
	{ deep: true, immediate: false }
);

const beforeUnloadListener = event => {
	if (!saveStatus.value) {
		event.preventDefault();
		return (event.returnValue = "");
	}
};

// 提示保存
onBeforeRouteLeave((to, from, next) => {
	window.addEventListener("beforeunload", () => {});
	if (!saveStatus.value) {
		try {
			ElMessageBox.confirm("数据尚未保存，是否保存?", "提示", {
				confirmButtonText: "保存",
				cancelButtonText: "离开",
				type: "warning"
			})
				.then(() => {
					handleSaveScreen();
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
	window.removeEventListener("beforeunload", e => beforeUnloadListener(e));
});
</script>

<style lang="scss" scoped>
.datav-header {
	position: relative;
	height: 41px;
	padding-right: 8px;
	display: flex;
	z-index: 100;
	align-items: center;
	user-select: none;
	color: var(--el-text-color-primary);
	background: var(--el-bg-color-page);
	border-bottom: var(--el-border-color) 1px solid;

	.view-btn-group {
		margin: 0 15px;
		z-index: 1;
	}
}

.head-btn {
	width: 40px;
	height: 24px;
	line-height: 24px;
	text-align: center;
	cursor: pointer;
	background: var(--el-bg-color-page);
	color: var(--el-text-color-primary);
	border: var(--el-border);
	transition: 0.2s;
	border-radius: 4px;

	.head-btn-icon {
		&:not(:first-child) {
			border-left: 1px solid rgba(255, 235, 235, 0.1);
		}
	}

	&:not(.--disabled):hover {
		background: var(--el-color-primary-light-8);
	}

	&.--selected {
		background: var(--el-color-primary);
		color: var(--el-color-white) !important;
		& + .head-btn {
			border-left-color: transparent;
		}

		&:not(.--disabled):hover {
			background: var(--el-color-primary);
		}
	}

	&.--disabled {
		cursor: not-allowed;

		.head-btn-icon {
			opacity: 0.2;
		}
	}
}

.head-btn-group {
	display: flex;
	box-sizing: border-box;
	background: var(--el-bg-color-page);
	border: 1px solid rgba(255, 235, 235, 0.1);
	box-shadow: 0 0 0 1px #181818;

	.head-btn {
		width: 45px;
		border-radius: 0;
		box-shadow: none;
		height: 22px;
		line-height: 22px;
		border-left: 1px solid transparent;
	}
}

.datav-edit-header {
	width: 100%;
	padding: 0 8px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	user-select: none;
	height: 40px;
	z-index: 100;

	.editor-header-wp {
		display: flex;
		overflow: hidden;
		transition: width 0.3s ease;
	}

	.editor-config {
		display: flex;
		width: 300px;
		align-items: center;
		transition: 0.3s ease;
	}

	.drawer-actions {
		width: 90px;
		height: 40px;
		display: flex;
		align-items: center;
	}

	.com-list-icon {
		display: inline-block;

		&.--rotate {
			animation: com-rotate 2s infinite;
			animation-direction: alternate-reverse;
		}
	}

	.screen-info {
		position: absolute;
		left: 50%;
		top: 0;
		transform: translateX(-50%);
		text-align: center;
		cursor: default;
		font-size: 14px;
		max-width: 500px;
		color: var(--el-text-color-primary);
		line-height: 40px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

		.workspace-icon {
			padding-right: 8px;
			cursor: pointer;
		}
	}

	.global-actions {
		position: absolute;
		top: 0;
		right: 8px;
		width: 300px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 40px;
	}

	.full-a {
		display: block;
		width: 100%;
		height: 100%;
		text-decoration: none;
	}

	.ml4 {
		margin-left: 4px;
	}

	.mr4 {
		margin-right: 4px;
	}
}

@keyframes com-rotate {
	0% {
		transform: rotateZ(0);
	}

	100% {
		transform: rotateZ(360deg);
	}
}
</style>
