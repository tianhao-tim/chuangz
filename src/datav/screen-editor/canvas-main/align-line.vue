<template>
	<div v-if="alignLine.enable && alignLine.show" class="ident-line-wp">
		<div class="ident-line x-line" :style="{ width: `${canvas.width}px`, top: `${alignLine.top}px` }" />
		<div class="ident-line x-line" :style="{ width: `${canvas.width}px`, top: `${alignLine.horizontal}px` }" />
		<div class="ident-line x-line" :style="{ width: `${canvas.width}px`, top: `${alignLine.bottom}px` }" />
		<div class="ident-line y-line" :style="{ height: `${canvas.height}px`, left: `${alignLine.left}px` }" />
		<div class="ident-line y-line" :style="{ height: `${canvas.height}px`, left: `${alignLine.vertical}px` }" />
		<div class="ident-line y-line" :style="{ height: `${canvas.height}px`, left: `${alignLine.right}px` }" />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useEditorStore } from "@/store/modules/editor";

export default defineComponent({
	name: "AlignLine",
	setup() {
		const editorStore = useEditorStore();

		const alignLine = computed(() => editorStore.alignLine);
		const canvas = computed(() => editorStore.canvas);

		return {
			alignLine,
			canvas
		};
	}
});
</script>

<style lang="scss" scoped>
.ident-line {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	box-sizing: border-box;
}

.x-line {
	border-top: 1px dashed #00c1de;
}

.y-line {
	border-left: 1px dashed #00c1de;
}
</style>
