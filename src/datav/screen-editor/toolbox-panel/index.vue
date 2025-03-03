<template>
	<div :class="['toolbox-panel-wp', { '--hide': !visiblePanel }]">
		<div class="toolbox-panel">
			<div class="btn-box">
				<el-tooltip placement="bottom" effect="blue" content="勾选时为自然模式，否则为拉伸模式，默认勾选">
					<span class="btn-text --help">组件缩放</span>
				</el-tooltip>
				<el-checkbox :model-value="isNormal" @update:model-value="handleResizeModeChange" />
			</div>
			<div class="btn-box">
				<span class="btn-text">参考线</span>
				<el-switch v-model="referLine.enable" />
			</div>
			<div class="btn-box">
				<el-tooltip placement="bottom" effect="blue" content="组件数量多时，容易卡顿，建议关闭">
					<span class="btn-text --help">对齐线</span>
				</el-tooltip>
				<el-switch v-model="alignLine.enable" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useToolbarStore } from "@/store/modules/toolbar";
import { useEditorStore } from "@/store/modules/editor";

export default defineComponent({
	name: "ToolboxPanel",
	setup() {
		const editorStore = useEditorStore();
		const visiblePanel = computed(() => useToolbarStore().toolbox.show);
		const isNormal = ref(editorStore.isNormalResizeMode);
		const referLine = computed(() => editorStore.referLine);
		const alignLine = computed(() => editorStore.alignLine);
		const visibleFilterPanel = ref(false);

		const toggleFilterPanel = () => {
			visibleFilterPanel.value = !visibleFilterPanel.value;
		};

		const hideFilterPanel = () => {
			visibleFilterPanel.value = false;
			document.removeEventListener("click", hideFilterPanel);
		};

		const handleResizeModeChange = (val: boolean) => {
			isNormal.value = val;
			editorStore.isNormalResizeMode = val;
		};

		watch(
			() => visibleFilterPanel.value,
			(nv: boolean) => {
				if (nv) {
					document.addEventListener("click", hideFilterPanel);
				}
			}
		);

		return {
			visiblePanel,
			isNormal,
			referLine,
			alignLine,
			visibleFilterPanel,
			toggleFilterPanel,
			handleResizeModeChange
		};
	}
});
</script>

<style lang="scss" scoped>
.toolbox-panel-wp {
	height: 40px;
	z-index: 10;
	transition: height 0.3s ease;
	border-bottom: var(--el-border);
	flex-shrink: 0;

	&.--hide {
		height: 0;
		overflow: hidden;
		border-bottom: none;
	}
}

.toolbox-panel {
	transition: 0.3s ease;
	width: 100%;
	background: var(--el-bg-color-page);
	padding: 8px 30px;
	display: flex;
	align-items: center;
	height: 100%;
}

.btn-box {
	display: flex;
	align-items: center;
	margin-right: 15px;
	color: var(--el-text-color-primary);

	.btn-text {
		margin-right: 4px;

		&.--help {
			cursor: help;
			text-decoration: underline dotted;
		}

		&.--label {
			cursor: pointer;

			&:hover {
				color: #4283ff;
				border-bottom: 1px solid #4283ff;
			}
		}
	}
}
</style>
