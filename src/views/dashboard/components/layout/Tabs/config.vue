<template>
	<g-field-collapse label="标签页" expand>
		<g-field :level="2" label="风格">
			<el-select v-model="config.type" size="small">
				<el-option label="card" value="card" />
				<el-option label="border-card" value="border-card" />
			</el-select>
		</g-field>
		<g-field :level="2" label="选项卡位置">
			<el-select v-model="config['tab-position']" size="small">
				<el-option label="top" value="top" />
				<el-option label="right" value="right" />
				<el-option label="bottom" value="bottom" />
				<el-option label="left" value="left" />
			</el-select>
		</g-field>
		<g-field :level="2" label="宽度自适应">
			<el-switch v-model="config.stretch" />
		</g-field>
	</g-field-collapse>
	<el-divider>Tab页</el-divider>
	<div>
		<draggable v-model="tabList" tag="div" item-key="id" handle=".handle">
			<template #item="{ element, index }">
				<div class="flex flex-row items-center pa-1">
					<div style="width: 20%">
						<el-icon class="handle cursor-pointer">
							<Operation />
						</el-icon>
					</div>
					<div>
						<div>
							<el-input v-model="element.label" size="small" placeholder="请输入Tab标签页名字" />
						</div>
						<div>
							<icon-select v-model="element.icon" type="awe" />
						</div>
					</div>
					<div class="ml5 w-60px">
						<el-button type="danger" :icon="Delete" size="small" circle @click="handleDeleteTab(index)" />
					</div>
				</div>
			</template>
		</draggable>
		<div class="flex items-center justify-center mt10">
			<el-link :icon="Plus" type="primary" :underline="false" @click="handleAddItem">增加Tab</el-link>
		</div>
	</div>
</template>

<script setup lang="ts" name="TabsConfig">
import { PropType, computed, toRefs } from "vue";
import draggable from "vuedraggable";
import { Plus, Delete } from "@element-plus/icons-vue";
import { DashboardComponent } from "@/views/dashboard/components/types";
import IconSelect from "@/components/IconSelect/index.vue";

const props = defineProps({
	chartConfig: {
		type: Object as PropType<DashboardComponent>,
		required: true
	}
});

const { tabList } = toRefs(props.chartConfig.config);

const config = computed(() => {
	return props.chartConfig.config;
});

const handleAddItem = () => {
	tabList.value.push({
		id: new Date().getTime(),
		label: "",
		icon: "",
		componentList: []
	});
};

const handleDeleteTab = (index: number) => {
	tabList.value.splice(index, 1);
};
</script>
<style scoped lang="scss"></style>
