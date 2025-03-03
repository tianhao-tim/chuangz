//  快捷键注册
import { computed, ref } from "vue";
import { onKeyStroke, useMagicKeys, whenever, useActiveElement } from "@vueuse/core";
import { usePosterStore } from "@/store/modules/poster";
import { storeToRefs } from "pinia";
import useOperationHistory from "@/views/poster/editor/main/useOperationHistory";

export default () => {
	const { ctrl_c, command_c, ctrl_v, command_v, ctrl_z, command_z, ctrl_y, command_shift_z } = useMagicKeys();

	const posterStore = usePosterStore();
	const operationHistory = useOperationHistory();
	const { selectedWidget } = storeToRefs(posterStore);

	whenever(ctrl_c, () => copyWidget());
	whenever(command_c, () => copyWidget());
	whenever(ctrl_v, () => pasteWidget());
	whenever(command_v, () => pasteWidget());
	whenever(ctrl_z, () => undo());
	whenever(command_z, () => undo());
	whenever(ctrl_z, () => undo());
	whenever(command_z, () => undo());
	whenever(ctrl_y, () => redo());
	whenever(command_shift_z, () => redo());
	const activeElement = useActiveElement();
	const notUsingInput = computed(() => activeElement.value?.tagName !== "INPUT" && activeElement.value?.tagName !== "TEXTAREA");

	onKeyStroke(["Delete", "Backspace"], () => {
		if (notUsingInput.value) {
			deleteWidget();
		}
	});

	onKeyStroke("ArrowDown", e => {
		selectedWidget && selectedWidget.value.y++;
		e.preventDefault();
	});
	onKeyStroke("ArrowUp", e => {
		selectedWidget && selectedWidget.value.y--;
		e.preventDefault();
	});

	onKeyStroke("ArrowLeft", e => {
		selectedWidget && selectedWidget.value.x--;
		e.preventDefault();
	});

	onKeyStroke("ArrowRight", e => {
		selectedWidget && selectedWidget.value.x++;
		e.preventDefault();
	});

	const tempWidget = ref(null);
	/**
	 * 复制组件到临时变量
	 */
	const copyWidget = () => {
		tempWidget.value = posterStore.selectedWidget;
	};
	/**
	 * 粘贴组件
	 */
	const pasteWidget = () => {
		if (tempWidget.value) {
			posterStore.copyPosterWidget(tempWidget.value);
		}
	};
	/**
	 * 删除组件
	 */
	const deleteWidget = () => {
		posterStore.deletePosterWidget(posterStore.selectedWidget);
	};
	/**
	 * 撤销
	 */
	const undo = () => {
		operationHistory.undo();
	};
	/**
	 * 重做
	 */
	const redo = () => {
		operationHistory.redo();
	};
};
