<template>
	<el-config-provider size="small">
		<el-container class="edit-container">
			<el-header style="height: auto; padding: 0">
				<header-toolbar />
			</el-header>
			<el-container class="edit-main-wp">
				<layer-panel />
				<components-panel />
				<el-container class="edit-main">
					<toolbox-panel />
					<canvas-main />
					<footer-toolbar />
				</el-container>
				<config-panel />
			</el-container>
		</el-container>
		<editor-context-menu />
	</el-config-provider>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, onMounted } from "vue";
import { useToolbarStore } from "@/store/modules/toolbar";
import { useEditorStore } from "@/store/modules/editor";
import { loadAsyncComponent } from "@/utils/asyncComponent";
import "@/datav/styles/index.scss";

export default defineComponent({
	name: "ScreenEditor",
	components: {
		HeaderToolbar: defineAsyncComponent(() => import("./header-toolbar/index.vue")),
		FooterToolbar: defineAsyncComponent(() => import("./footer-toolbar/index.vue")),
		EditorContextMenu: defineAsyncComponent(() => import("./editor-context-menu/index.vue")),
		CanvasMain: loadAsyncComponent(() => import("./canvas-main/index.vue")),
		LayerPanel: loadAsyncComponent(() => import("./layer-panel/index.vue")),
		ComponentsPanel: loadAsyncComponent(() => import("./components-panel/index.vue")),
		ConfigPanel: loadAsyncComponent(() => import("./config-panel/index.vue")),
		ToolboxPanel: loadAsyncComponent(() => import("./toolbox-panel/index.vue"))
	},
	props: {
		screenKey: {
			type: [String],
			required: true
		}
	},
	setup(props) {
		const editorStore = useEditorStore();
		const toolbarStore = useToolbarStore();
		onMounted(async () => {
			try {
				const screenKey = props.screenKey;
				await editorStore.loadScreen(screenKey);
			} catch (error) {
				console.log(error);
			} finally {
				document.title = `${editorStore.screen.name} | 编辑器`;
				await editorStore.autoCanvasScale(() => ({
					offsetX: toolbarStore.getPanelOffsetX,
					offsetY: toolbarStore.getPanelOffsetY
				}));
				editorStore.setEditMode();
			}
		});
		return {};
	}
});
</script>

<style lang="scss" scoped>
@import "@/datav/styles/themes/index";

.edit-container {
	position: relative;
	width: 100%;
	height: 100%;
}

.edit-main-wp {
	position: relative;
	z-index: 1;
	height: 100%;
	overflow: hidden;
	background-color: var(--el-bg-color-page);
	flex-wrap: nowrap;
}

.edit-main {
	position: relative;
	z-index: 2;
	height: 100%;
	overflow: hidden;
	flex-direction: column;
}
</style>
