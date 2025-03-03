<template>
	<el-aside width="auto" :class="['config-panel-wp', { '--hide': !visiblePanel }]">
		<div class="config-manager">
			<page-config v-if="!selectedCom" />
			<el-tabs v-else type="card" :stretch="true">
				<el-tab-pane>
					<template #label>
						<el-tooltip effect="blue" :show-after="500" content="配置">
							<i class="v-icon-setting" />
						</el-tooltip>
					</template>
					<setting-panel :key="selectedCom.id" />
				</el-tab-pane>
				<el-tab-pane lazy>
					<template #label>
						<el-tooltip effect="blue" :show-after="500" content="数据">
							<i class="v-icon-cloud" />
						</el-tooltip>
					</template>
					<data-center-panel :key="selectedCom.id" />
				</el-tab-pane>
				<!--        <el-tab-pane lazy>-->
				<!--          <template #label>-->
				<!--            <el-tooltip effect="blue" :show-after="500" content="交互">-->
				<!--              <i class="v-icon-interact"></i>-->
				<!--            </el-tooltip>-->
				<!--          </template>-->
				<!--        </el-tab-pane>-->
			</el-tabs>
		</div>
	</el-aside>
</template>

<script lang="ts">
import { computed, defineComponent, provide } from "vue";
import { useToolbarStore } from "@/store/modules/toolbar";
import { loadAsyncComponent } from "@/utils/asyncComponent";

import { useComStore } from "@/store/modules/com";

export default defineComponent({
	name: "ConfigPanel",
	components: {
		PageConfig: loadAsyncComponent(() => import("./page-config.vue")),
		SettingPanel: loadAsyncComponent(() => import("./setting-panel.vue")),
		DataCenterPanel: loadAsyncComponent(() => import("./data-center-panel/index.vue"))
	},
	setup() {
		const visiblePanel = computed(() => useToolbarStore().config.show);
		const selectedCom = computed(() => useComStore().selectedCom);

		provide("com", selectedCom);

		return {
			visiblePanel,
			selectedCom
		};
	}
});
</script>

<style lang="scss" scoped>
@import "style.scss";
$panel_width: 332px;

.config-panel-wp {
	position: relative;
	z-index: 90;
	width: $panel_width !important;
	height: 100%;
	overflow: hidden;
	background: var(--el-bg-color);
	box-shadow: var(--el-box-shadow-light);
	transition: width 0.25s ease-in-out;
}

.config-manager {
	width: $panel_width;
	height: 100%;
	background: var(--el-bg-color-page);
	transition: 0.25s ease-in-out;
	user-select: none;

	::-webkit-scrollbar {
		display: none;
	}
}

.config-panel-wp.--hide {
	width: 0 !important;

	.config-manager {
		transform: translateX(-100%);
	}
}

:deep(.g-field-collapse) {
	--el-collapse-header-bg-color: var(--el-bg-color-page);
	--el-collapse-content-bg-color: var(--el-bg-color-page);
}
</style>
