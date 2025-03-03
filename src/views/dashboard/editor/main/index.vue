<template>
	<div class="main-wrapper" :style="getMainStyle">
		<div class="layout-content" v-if="componentList && componentList.length">
			<el-scrollbar ref="scrollbarRef" wrap-class="layout-content-scrollbar">
				<grid-layout
					v-model:layout="componentList"
					:col-num="12"
					:row-height="45"
					:cols="{ lg: 12, md: 12, sm: 6, xs: 6, xxs: 6 }"
					ref="gridLayoutRef"
				>
					<template #default="{ gridItemProps }">
						<!-- | gridItemProps props from GridLayout | -->
						<!--breakpointCols: props.cols-->
						<!--colNum: props.colNum-->
						<!--containerWidth: width.value-->
						<!--isDraggable: props.isDraggable-->
						<!--isResizable: props.isResizable-->
						<!--lastBreakpoint: lastBreakpoint.value-->
						<!--margin: props.margin-->
						<!--maxRows: props.maxRows-->
						<!--responsive: props.responsive-->
						<!--rowHeight: props.rowHeight-->
						<!--useCssTransforms: props.useCssTransforms-->
						<!--width: width.value-->
						<grid-item
							v-for="item in componentList"
							:key="item.id"
							v-bind="gridItemProps"
							:x="item.x"
							:y="item.y"
							:w="item.w"
							:h="item.h"
							:i="item.i"
							:class="selectedComponentId === item.id ? 'grid-item-selected' : 'grid-item'"
							:style="{ backgroundColor: item.basicConfig.backgroundColor }"
						>
							<chart-item
								:chartConfig="item"
								:theme-color="themeColor"
								:theme-setting="themeSetting"
								@selected="handleGridItemClick(item)"
								@delete="
									config => {
										dashboardStore.deleteComponent(config);
									}
								"
							/>
						</grid-item>
					</template>
				</grid-layout>
			</el-scrollbar>
		</div>
		<div class="empty-wrapper" v-if="!componentList || !componentList.length">
			<el-empty description="暂无组件,请通过上方组件菜单添加组件" />
		</div>
	</div>
</template>
<script setup lang="ts" name="DashboardEditorMain">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { useDashboardStore } from "@/store/modules/dashboard";
import ChartItem from "@/views/dashboard/editor/main/ChartItem.vue";
import { storeToRefs } from "pinia";
import { chartColors, globalThemeJson } from "@/views/dashboard/components/chartThemes";
import { ElScrollbar } from "element-plus";

const dashboardStore = useDashboardStore();

const { pageConfig, componentList, selectedComponentId } = storeToRefs(dashboardStore);

const getMainStyle = computed(() => {
	return {
		backgroundColor: pageConfig.value.bgColor,
		backgroundImage: pageConfig.value.bgImage ? `url(${pageConfig.value.bgImage})` : ""
	};
});

// 主题色
const themeSetting = globalThemeJson;

// 配置项
const themeColor = computed(() => {
	const themeStyle = dashboardStore.pageConfig.themeStyle || "dark";
	return chartColors[themeStyle];
});

const gridLayoutRef = ref();
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();

const handleGridItemClick = (item: any) => {
	dashboardStore.selectComponent(item);
};

const scrollbarToBottom = () => {
	nextTick(() => {
		scrollbarRef.value!.setScrollTop(gridLayoutRef.value!.$el.clientHeight);
	});
};

defineExpose({ scrollbarToBottom });

// 点击空白处取消选中
const handlePageClick = (e: any) => {
	// 是字符串类型
	if (typeof e.target.className === "string" && e.target.className) {
		// 字符串包含
		if (e.target.className.indexOf("layout-content-scrollbar") >= 0 || e.target.className.indexOf("vue-grid-layout") >= 0) {
			dashboardStore.selectComponent(null);
		}
	}
};

onMounted(() => {
	window.addEventListener("click", handlePageClick);
});

onBeforeUnmount(() => {
	window.removeEventListener("click", handlePageClick);
});
</script>
<style lang="scss" scoped>
.main-wrapper {
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: auto;
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
</style>
