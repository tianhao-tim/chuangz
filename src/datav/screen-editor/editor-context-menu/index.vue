<template>
	<div v-if="contextMenu.show" class="context-menu-wrap" :style="contextMenuStyle">
		<div class="context-menu-item" @click="moveTop"><i class="menu-icon v-icon-move-top" />置顶</div>
		<div class="context-menu-item" @click="moveBottom"><i class="menu-icon v-icon-move-bottom" />置底</div>
		<div class="context-menu-item" @click="moveUp"><i class="menu-icon v-icon-move-up" />上移一层</div>
		<div class="context-menu-item" @click="moveDown"><i class="menu-icon v-icon-move-down" />下移一层</div>

		<div class="context-menu-divider" />

		<div class="context-menu-item" @click="lockCom">
			<template v-if="isLocked"> <i class="menu-icon v-icon-unlock" />解锁 </template>
			<template v-else> <i class="menu-icon v-icon-lock" />锁定 </template>
		</div>
		<div class="context-menu-item" @click="hideCom">
			<template v-if="isHided"> <i class="menu-icon v-icon-show" />显示 </template>
			<template v-else> <i class="menu-icon v-icon-hide" />隐藏 </template>
		</div>

		<div class="context-menu-divider" />

		<div class="context-menu-item" @click="renameCom"><i class="menu-icon v-icon-edit" />重命名</div>
		<div class="context-menu-item" @click="toCopyCom"><i class="menu-icon v-icon-copy" />复制</div>
		<div class="context-menu-item" @click="toDeleteCom"><i class="menu-icon v-icon-delete" />删除</div>

		<div class="context-menu-divider" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onUnmounted } from "vue";
import { useEditorStore } from "@/store/modules/editor";
import { useComStore } from "@/store/modules/com";
import { MessageBoxUtil } from "@/utils/messageUtil";
import { off, on } from "@/utils/dom";
import { MoveType } from "@/datav/types/editor";
import { useContextMenu } from "./index";

export default defineComponent({
	name: "EditorContextMenu",
	setup() {
		const { contextMenu, selectedCom, isLocked, isHided, contextMenuStyle } = useContextMenu();

		const editorStore = useEditorStore();
		const comStore = useComStore();

		const moveCom = (moveType: MoveType) => {
			if (selectedCom.value) {
				editorStore.moveCom(selectedCom.value.id, moveType);
			}
		};

		const moveUp = () => moveCom(MoveType.up);
		const moveDown = () => moveCom(MoveType.down);
		const moveTop = () => moveCom(MoveType.top);
		const moveBottom = () => moveCom(MoveType.bottom);

		const lockCom = () => {
			if (selectedCom.value) {
				selectedCom.value.locked = !selectedCom.value.locked;
			}
		};

		const hideCom = () => {
			if (selectedCom.value) {
				selectedCom.value.hided = !selectedCom.value.hided;
			}
		};

		const toDeleteCom = () => {
			const com = selectedCom.value;
			if (com) {
				MessageBoxUtil.confirmAsync("是否删除选中的1个组件", () => comStore.deleteCom(com));
			}
		};

		const renameCom = () => {
			if (selectedCom.value) {
				selectedCom.value.renameing = true;
			}
		};

		const toCopyCom = () => {
			if (selectedCom.value) {
				comStore.copyCom(selectedCom.value.id);
			}
		};

		const handleContextmenu = (ev: Event) => ev.preventDefault();

		onBeforeMount(() => {
			on(document, "contextmenu", handleContextmenu);
		});

		onUnmounted(() => {
			off(document, "contextmenu", handleContextmenu);
		});

		return {
			contextMenu,
			isLocked,
			isHided,
			contextMenuStyle,
			moveUp,
			moveDown,
			moveTop,
			moveBottom,
			lockCom,
			hideCom,
			toDeleteCom,
			renameCom,
			toCopyCom
		};
	}
});
</script>

<style lang="scss" scoped>
.context-menu-wrap {
	position: fixed;
	z-index: 9999;
	display: none;
	width: 111px;
	color: var(--el-text-color-primary);
	background: var(--el-bg-color-page);
	user-select: none;
	border-radius: var(--el-border-radius-base);
}

.context-menu-item {
	display: flex;
	height: 28px;
	padding: 0 3px 0 6px;
	overflow: hidden;
	line-height: 28px;
	cursor: pointer;
	border-right: 2px solid transparent;
	&:first-child {
		border-top-left-radius: var(--el-border-radius-base);
		border-top-right-radius: var(--el-border-radius-base);
	}

	&:hover {
		color: var(--el-text-color-primary);
		background-color: var(--el-border-color-extra-light);
		border-right: 2px solid var(--el-color-primary);
	}

	.menu-icon {
		margin-right: 4px;
	}

	&.disable {
		color: var(--el-disabled-text-color);
		pointer-events: none;
		cursor: auto;
	}
}

.context-menu-divider {
	width: 100%;
	height: 1px;
	background-color: var(--el-disabled-bg-color);
}
</style>
