<template>
	<el-aside width="auto" :class="['component-panel-wp', { '--hide': !visiblePanel }]">
		<div class="components-panel">
			<div class="panel-title">
				<span class="panel-text">{{ visiblePanel ? "全部组件" : "组件" }}</span>
				<el-tooltip content="收起" placement="top" effect="blue" :show-after="500" :enterable="false">
					<i title="收起" class="v-icon-back btn-icon" @click="changeVisible" />
				</el-tooltip>
			</div>
			<div class="components-panel-wrapper" @dragover="dragOver">
				<el-tabs tab-position="left" @tab-click="handleTabClick">
					<el-tab-pane v-for="cate in categories" :key="cate.type">
						<template #label>
							<el-tooltip :content="cate.name" placement="right" effect="blue" :show-after="500" :enterable="false">
								<div>
									<i :class="['com-tab-icon', cate.icon]" />
									<span class="com-tab-title">{{ cate.name }}</span>
								</div>
							</el-tooltip>
						</template>

						<el-tabs v-if="cate.data.length > 2" tab-position="left" class="el-tabs-l2">
							<el-tab-pane v-for="subcate in cate.data" :key="subcate.type">
								<template #label>
									<span class="com-tab-title">{{ subcate.name }}</span>
								</template>
								<div class="components-single-menu-wp">
									<div class="components-single-menu">
										<ul class="components-single-menu-list">
											<li
												v-for="com in subcate.data"
												:key="com.name"
												:title="com.alias"
												:draggable="com.used"
												class="components-item double"
												@dragstart="dragStart($event, com.name)"
												@click="toAddCom(com.name, com.used)"
											>
												<div class="components-item-text">{{ com.alias }}</div>
												<div class="components-item-img" :style="`background-image: url(${com.img});`" />
											</li>
										</ul>
									</div>
								</div>
							</el-tab-pane>
						</el-tabs>

						<div v-else class="components-multi-menu">
							<div class="components-single-menu --wider">
								<ul class="components-single-menu-list">
									<li
										v-for="com in cate.data[0].data"
										:key="com.name"
										:title="com.alias"
										:draggable="com.used"
										class="components-item double"
										@dragstart="dragStart($event, com.name)"
										@click="toAddCom(com.name, com.used)"
									>
										<div class="components-item-text">{{ com.alias }}</div>
										<div class="components-item-img" :style="`background-image: url(${com.img});`" />
									</li>
								</ul>
								<template v-if="cate.data[0].data.length === 0">
									<div v-if="cate.type === 'favorite'" class="favorite-empty">没有收藏组件</div>
								</template>
							</div>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</el-aside>
</template>

<script lang="ts">
import { computed, ref, defineComponent, nextTick } from "vue";
import { cloneDeep } from "lodash-es";
import { PanelType, useToolbarStore } from "@/store/modules/toolbar";
import { useEditorStore } from "@/store/modules/editor";
import { useComStore } from "@/store/modules/com";
import { MessageUtil } from "@/utils/messageUtil";
import { classifications } from "@/datav/datav-components";
import { createComponent } from "@/datav/charts/create-component";
import { useDataCenter } from "@/datav/mixins/useDataCenter";

const firstClassification = classifications[0];
type CategoryType = typeof firstClassification;

export default defineComponent({
	name: "ComponentsPanel",
	setup() {
		const toolbarStore = useToolbarStore();
		const comStore = useComStore();
		const editorStore = useEditorStore();
		const searchText = ref("");
		const visiblePanel = computed(() => toolbarStore.components.show);

		const cloneCfs: CategoryType[] = cloneDeep(classifications);
		const first = { type: "all", name: "全部", icon: "v-icon-view-grid" };

		const categories = computed(() => {
			const list: CategoryType[] = cloneCfs;
			list.forEach(item => {
				item.data.unshift({
					...first,
					data: item.data.flatMap(m => m.data)
				});
			});

			return list;
		});

		const changeVisible = () => {
			toolbarStore.setPanelState(PanelType.components, !visiblePanel.value);
		};

		const handleTabClick = () => {
			if (!visiblePanel.value) {
				toolbarStore.setPanelState(PanelType.components, true);
			}
		};

		const toAddCom = async (comName: string, used: boolean) => {
			if (used) {
				toolbarStore.addLoading();
				const { pageConfig } = editorStore;
				const com = await createComponent(comName);
				com.attr.x = Math.floor((pageConfig.width - com.attr.w) / 2);
				com.attr.y = Math.floor((pageConfig.height - com.attr.h) / 2);
				await comStore.addCom(com);
				comStore.selectCom(com.id);
				toolbarStore.removeLoading();
				if (com.apis.source) {
					await com.loadData();
					nextTick(() => {
						useDataCenter(com).requestData();
					});
				}
			} else {
				MessageUtil.warning("正在开发中。。。");
			}
		};

		const dragStart = (ev: any, comName: string) => {
			ev.dataTransfer.setData("text", comName);
		};

		const dragOver = (ev: DragEvent) => {
			ev.preventDefault();
			ev.stopPropagation();
			ev.dataTransfer.dropEffect = "none";
		};

		return {
			searchText,
			visiblePanel,
			categories,
			changeVisible,
			handleTabClick,
			toAddCom,
			dragStart,
			dragOver
		};
	}
});
</script>

<style lang="scss">
@import "style";
</style>
