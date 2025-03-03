<template>
	<div class="main-wrap">
		<div class="poster-canvas-warp">
			<div
				style="position: relative; margin: 0 auto; padding: 60px"
				:style="{
					width: `${posterConfig.width * zoomSizeScale + 120}px`,
					height: `${posterConfig.height * zoomSizeScale + 120}px`
				}"
			>
				<div class="poster-canvas" :style="posterCanvasStyle">
					<VueDragResize
						:aspectRatio="w.type === PosterWidgetType.QRCODE"
						:style="{ transform: `rotate(${w.rotate}deg)` }"
						:parentLimitation="true"
						:stickSize="8"
						:isActive="w.active"
						:x="w.x"
						:y="w.y"
						:w="w.width"
						:h="w.height"
						:parentScaleX="zoomSizeScale"
						:parentScaleY="zoomSizeScale"
						v-for="w in posterWidgetList"
						:key="w.id"
						@clicked="handleClickWidget(w)"
						@dragstop="
							e => {
								onDragStop(w, e);
							}
						"
						@resizestop="
							e => {
								onResizeStop(w, e);
							}
						"
					>
						<component :is="widgetComponent(w)" :widgetConfig="w" />
					</VueDragResize>
				</div>
			</div>
		</div>
		<zoom-control v-model="zoomSize" class="zoom-control" />
		<div class="help-wrap">
			<i class="fa fa-question-circle-o" aria-hidden="true" @click="keyboardDialogVisible = true" />
		</div>
		<keyboard-tips v-model="keyboardDialogVisible" />
	</div>
</template>

<script setup lang="ts" name="PosterMain">
import { storeToRefs } from "pinia";
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import VueDragResize from "vue-drag-resize";
import { PosterWidget, PosterWidgetType } from "@/views/poster/editor/types/poster";
import { usePosterStore } from "@/store/modules/poster";
import ZoomControl from "@/views/poster/editor/main/ZoomControl.vue";
import KeyboardTips from "@/views/poster/editor/main/KeyboardTips.vue";
import useShortcuts from "@/views/poster/editor/main/useShortcuts";
const store = usePosterStore();
// 注册快捷键
useShortcuts();

const keyboardDialogVisible = ref(false);

const { posterConfig, zoomSize, posterWidgetList, selectedWidget }: any = storeToRefs(store);

const zoomSizeScale = computed(() => {
	return zoomSize.value ? zoomSize.value / 100 : 0.5;
});

onMounted(() => {
	store.loadPoster(useRoute().query.key as string);
});

const posterCanvasStyle = computed(() => {
	return {
		backgroundImage: `url(${posterConfig.value.posterBgImage})`,
		backgroundColor: posterConfig.value.posterBgColor,
		transform: `scale(${zoomSizeScale.value})`,
		transformOrigin: (zoomSizeScale.value > 1 ? "center" : "left") + " top",
		height: `${posterConfig.value.height}px`,
		width: `${posterConfig.value.width}px`
	};
});

// 动态导入组件
const modules = import.meta.glob("../widget/**/index.vue", { eager: true }) as any;

const widgetComponent = (posterWidget: PosterWidget) => {
	return modules[`../widget/${posterWidget?.type.toLowerCase()}/index.vue`]?.default;
};

const handleClickWidget = (posterWidget: PosterWidget) => {
	posterWidget.active = true;
	store.activePosterWidget(posterWidget);
};

document.addEventListener("click", (e: any) => {
	const className = e.target.className;
	if (className === "poster-canvas" || className === "main-wrap") {
		// 存在激活的组件
		if (selectedWidget) {
			store.cancelActivePosterWidget();
		}
	}
});

const onResizeStop = (posterWidget: PosterWidget, event: any) => {
	posterWidget.height = event.height;
	posterWidget.width = event.width;
};
const onDragStop = (posterWidget: PosterWidget, event: any) => {
	posterWidget.x = event.left;
	posterWidget.y = event.top;
};
</script>

<style scoped lang="scss">
.main-wrap {
	height: 100%;
	background-color: var(--el-bg-color-page);
	position: relative;

	.poster-canvas-warp {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: auto;
		flex: 1;
	}
	.poster-canvas {
		background-color: var(--el-bg-color-overlay);
		position: relative;
		transform-origin: left top;
		background-repeat: no-repeat;
	}

	.zoom-control {
		position: absolute;
		bottom: 60px;
		right: 120px;
	}

	.help-wrap {
		position: absolute;
		bottom: 60px;
		right: 80px;
		line-height: 45px;
		.fa {
			font-size: 23px;
			&:hover {
				cursor: pointer;
				color: var(--el-color-primary);
			}
		}
	}
}
:deep(.vdr-stick) {
	border: 4px solid var(--el-color-primary-light-5);
	box-shadow: var(--el-box-shadow);
	border-radius: 4px;
	background-color: var(--el-color-primary-light-5);
}
</style>
