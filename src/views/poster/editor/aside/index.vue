<template>
	<div class="aside-wrap">
		<el-tabs tab-position="left" class="fun-tabs" v-model="activeName">
			<el-tab-pane name="template">
				<template #label>
					<span class="fun-tabs-label">
						<i class="tduck icon-shengchenghaibao" />
						<span>模板</span>
					</span>
				</template>
				<poster-template />
			</el-tab-pane>
			<el-tab-pane name="layers">
				<template #label>
					<span class="fun-tabs-label">
						<i class="tduck icon-tuceng" />
						<span>图层</span>
					</span>
				</template>
				<Layers />
			</el-tab-pane>
			<el-tab-pane name="widget">
				<template #label>
					<span class="fun-tabs-label">
						<i class="tduck icon-zujian" />
						<span>组件</span>
					</span>
				</template>
				<widget-list />
			</el-tab-pane>
			<el-tab-pane name="form">
				<template #label>
					<span class="fun-tabs-label">
						<i class="tduck icon-biaodan" />
						<span>表单</span>
					</span>
				</template>
				<link-form-list />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup>
import { ref, provide } from "vue";
import { useRoute } from "vue-router";
import WidgetList from "./WidgetList.vue";
import LinkFormList from "./FormLinkList.vue";
import Layers from "./Layers.vue";
import PosterTemplate from "./PosterTemplate.vue";

const activeName = ref("template");

provide("posterKey", useRoute().query.key);
</script>

<style scoped lang="scss">
.aside-wrap {
	box-shadow: var(--el-box-shadow);
	height: 100%;

	:deep(.el-tabs__item) {
		padding: 3px 20px;
		height: 75px;
	}
	:deep(.el-tabs__content) {
		overflow: auto;
		height: 100%;
		position: relative;
	}

	.fun-tabs {
		height: 100%;
		.fun-tabs-label {
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			align-content: center;
			justify-content: center;
			align-items: center;
		}
	}

	.fun-tabs .fun-tabs-label .tduck {
		vertical-align: middle;
		font-size: 25px;
	}

	.fun-tabs .fun-tabs-label span {
		vertical-align: middle;
		margin-left: 4px;
		line-height: 28px;
	}

	.el-tabs--left .el-tabs__header.is-left {
		margin-right: 0;
	}
}
</style>
