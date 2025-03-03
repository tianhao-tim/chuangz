<template>
	<el-footer height="32px" class="bottom-sider">
		<el-popover width="235" placement="top" trigger="hover" popper-class="editor-popover">
			<template #reference>
				<i class="v-icon-keyboard shortcut-btn" />
			</template>
			<div class="shortcut-wp">
				<div class="shortcut-item">
					<div class="shortcut-title">开关图层面板</div>
					<div class="shortcut-value">Ctrl/Cmd + ←</div>
				</div>
				<div class="shortcut-item">
					<div class="shortcut-title">切换组件面板</div>
					<div class="shortcut-value">Ctrl/Cmd + ↑</div>
				</div>
				<div class="shortcut-item">
					<div class="shortcut-title">切换右侧面板</div>
					<div class="shortcut-value">Ctrl/Cmd + →</div>
				</div>
				<div class="shortcut-item">
					<div class="shortcut-title">自动缩放画布</div>
					<div class="shortcut-value">Ctrl/Cmd + a</div>
				</div>
				<div class="shortcut-item">
					<div class="shortcut-title">复制组件</div>
					<div class="shortcut-value">Ctrl/Cmd + c</div>
				</div>
				<div class="shortcut-item">
					<div class="shortcut-title">删除</div>
					<div class="shortcut-value">Ctrl/Cmd + backspace</div>
				</div>
			</div>
		</el-popover>
		<div class="scale-input-wp">
			<input v-model="inputScale" type="number" class="scale-input" @keydown.enter="submitScale(0)" />
			<span class="percent">%</span>
			<el-popover
				:visible="visibleScaleList"
				width="56"
				placement="top"
				trigger="click"
				popper-class="editor-popover"
				:show-arrow="false"
				:offset="8"
			>
				<div class="scale-value-list">
					<div v-for="s in scaleList" :key="s" class="scale-value-item" @click="submitScale(s)">
						{{ `${s}%` }}
					</div>
					<div class="scale-value-item" @click="submitScale(-1)">自适应</div>
				</div>
				<template #reference>
					<i class="v-icon-arrow-down open-icon" @click.stop="showScaleList" />
				</template>
			</el-popover>
		</div>
		<div class="scale-slider-wp">
			<el-slider v-model="scale" :min="10" :max="200" :step="5" :show-tooltip="false" @change="submitScale" />
		</div>
	</el-footer>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, onUnmounted, computed } from "vue";
import { isMac } from "@/utils";
import { PanelType, useToolbarStore } from "@/store/modules/toolbar";
import { useEditorStore } from "@/store/modules/editor";
import { useComStore } from "@/store/modules/com";

export default defineComponent({
	name: "FooterToolbar",
	setup() {
		const toolbarStore = useToolbarStore();
		const editorStore = useEditorStore();
		const comStore = useComStore();

		const scaleList = ref([200, 150, 100, 50]);
		const scale = ref(20);
		const inputScale = ref(20);
		const visibleScaleList = ref(false);
		const useSlider = ref(false);

		const hideScaleList = () => {
			visibleScaleList.value = false;
			document.removeEventListener("click", hideScaleList, false);
		};

		const showScaleList = () => {
			visibleScaleList.value = true;
			document.addEventListener("click", hideScaleList, false);
		};

		const getPanelOffset = () => ({
			offsetX: toolbarStore.getPanelOffsetX,
			offsetY: toolbarStore.getPanelOffsetY
		});

		const submitScale = async (val: number) => {
			if (val === -1) {
				editorStore.autoCanvasScale(getPanelOffset);
			} else {
				const { offsetX, offsetY } = getPanelOffset();
				editorStore.setCanvasScale(val === 0 ? inputScale.value : val, offsetX, offsetY);
			}
			hideScaleList();
		};
		const pageConfig = computed(() => editorStore.pageConfig);

		watch(
			() => editorStore.canvas.scale,
			s => {
				const val = parseInt((s * 100).toFixed(2));
				scale.value = val;
				inputScale.value = val;
			}
		);

		const moveCom = (offsetY: number, offsetX: number) => {
			[comStore.selectedCom].forEach(m => {
				m.attr.y += offsetY;
				m.attr.x += offsetX;
			});
		};

		const addShortcuts = (ev: KeyboardEvent) => {
			const target = ev.target as HTMLElement;
			if (!["input", "textarea"].includes(target.tagName.toLowerCase())) {
				const ismac = isMac();
				const key = ev.key.toLowerCase();
				if ((!ismac && ev.ctrlKey) || (ismac && ev.metaKey)) {
					console.log(key);
					const { setPanelState } = toolbarStore;
					if (key === "arrowleft") {
						setPanelState(PanelType.layer, !toolbarStore.layer.show);
					} else if (key === "arrowup") {
						setPanelState(PanelType.components, !toolbarStore.components.show);
					} else if (key === "arrowright") {
						setPanelState(PanelType.config, !toolbarStore.config.show);
					} else if (key === "a") {
						editorStore.autoCanvasScale(getPanelOffset);
					} else if (key === "c") {
						const selectedCom = computed(() => useComStore().selectedCom);
						const copyItem = comStore.copyCom(selectedCom.value?.id) as any;
						comStore.selectCom(copyItem?.id);
					} else if (key === "backspace") {
						debugger;
						const selectedCom = computed(() => useComStore().selectedCom) as any;
						comStore.deleteCom(selectedCom.value);
					}
					console.log(key);
					ev.preventDefault();
				} else if (comStore.selectedCom && ["arrowup", "arrowright", "arrowdown", "arrowleft"].includes(key)) {
					ev.preventDefault();
					const { grid } = pageConfig.value;
					if (key === "arrowup") {
						moveCom(-grid, 0);
					} else if (key === "arrowright") {
						moveCom(0, grid);
					} else if (key === "arrowdown") {
						moveCom(grid, 0);
					} else if (key === "arrowleft") {
						moveCom(0, -grid);
					}
				}
			}
		};

		onMounted(() => {
			document.addEventListener("keydown", addShortcuts, false);
		});

		onUnmounted(() => {
			document.removeEventListener("keydown", addShortcuts, false);
		});

		return {
			scaleList,
			scale,
			inputScale,
			visibleScaleList,
			showScaleList,
			useSlider,
			submitScale
		};
	}
});
</script>

<style lang="scss" scoped>
.bottom-sider {
	position: absolute;
	right: 0;
	bottom: 0;
	z-index: 99;
	display: flex;
	width: 100%;
	height: 32px;
	background: var(--el-bg-color-page);
	box-shadow: 0 -1px var(--el-border-color);
	user-select: none;
	align-items: center;
	justify-content: flex-end;

	.shortcut-btn {
		margin-right: 20px;
		font-size: 18px;
		color: var(--el-text-color-secondary);
		cursor: pointer;
	}

	.scale-input-wp {
		position: relative;
		display: block;
		width: 58px;
		height: 20px;
		line-height: 18px;
		margin-right: 20px;
		overflow: hidden;
		cursor: pointer;
		background: var(--el-bg-color-page);
		border: var(--el-border);

		.scale-input {
			width: 27px;
			padding-left: 5px;
			font-size: 12px;
			color: var(--el-text-color-primary);
			text-align: right;
			background: transparent;
			caret-color: var(--el-text-color-primary);

			&::-webkit-inner-spin-button,
			&::-webkit-outer-spin-button {
				margin: 0;
				-webkit-appearance: none;
			}
		}

		.percent {
			margin-left: 1px;
			color: var(--el-text-color-primary);
		}

		.open-icon {
			position: absolute;
			top: -9px;
			right: -10px;
			padding: 10px;
			font-weight: bold;
			color: var(--el-text-color-primary);
			transform: scale(0.5);
		}
	}

	.scale-slider-wp {
		width: 190px;
		:deep(.el-slider__button) {
			width: 10px;
			height: 10px;
		}
	}
}

.shortcut-wp {
	position: relative;
	padding: 5px 10px;
	font-size: 12px;
	background: var(--el-bg-color-page);
	box-shadow: var(--el-box-shadow);
	user-select: none;

	.shortcut-item {
		display: flex;
		margin: 5px 0;
		justify-content: space-between;
		align-items: center;
	}

	.shortcut-title {
		padding-right: 15px;
		color: var(--el-text-color-secondary);
	}

	.shortcut-value {
		padding: 4px 6px;
		font-weight: 700;
		color: var(--el-color-primary-light-3);
		background: var(--el-bg-color-page);
		border-radius: 2px;
	}
}

.scale-value-list {
	font-size: 12px;
	background: var(--el-bg-color-page);
	border: var(--el-border);
	user-select: none;

	.scale-value-item {
		padding: 5px 0;
		color: var(--el-text-color-primary);
		text-align: center;
		cursor: pointer;
		transition: 0.2s;

		&:hover {
			color: var(--el-color-primary-light-5);
			background: var(--el-bg-color-page);
		}

		&:not(:first-child) {
			border-top: var(--el-border);
		}
	}
}
</style>
