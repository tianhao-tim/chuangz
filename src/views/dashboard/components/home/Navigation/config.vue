<template>
	<g-field-collapse label="导航" expand>
		<g-field :level="2" label="标题">
			<g-input v-model="config.title" />
		</g-field>
		<!--		字体大小-->
		<g-field :level="2" label="字体大小">
			<g-input-number v-model="config.titleFontSize" :min="1" size="small"></g-input-number>
		</g-field>
		<g-field :level="2" label="颜色">
			<g-color-picker v-model="config.backgroundColor" />
		</g-field>
		<g-field :level="2" label="列">
			<g-input-number v-model="config.colNum" :min="1" size="small"></g-input-number>
		</g-field>
	</g-field-collapse>
	<el-divider>数据</el-divider>
	<div>
		<draggable v-model="datasetList" tag="div" item-key="id" handle=".handle">
			<template #item="{ element }">
				<div class="flex flex-row items-center pa-1">
					<div style="width: 20%">
						<el-icon class="handle cursor-pointer">
							<Operation />
						</el-icon>
					</div>
					<div>
						<el-row :gutter="10" class="mt5">
							<el-col :span="20">
								<el-input v-model="element.label" size="small" placeholder="请输入标题" />
							</el-col>
							<el-col :span="20">
								<el-input v-model="element.link" size="small" placeholder="请输入跳转路径" />
							</el-col>
							<el-col :span="20">
								<icon-select v-model="element.icon" type="awe" />
							</el-col>
						</el-row>
					</div>
					<div style="width: 20%">
						<el-button type="danger" :icon="Delete" size="small" circle />
					</div>
				</div>
			</template>
		</draggable>
		<div class="flex items-center justify-center mt10">
			<el-link :icon="Plus" type="primary" :underline="false" @click="handleAddItem">增加选项</el-link>
		</div>
	</div>
</template>

<script setup lang="ts" name="NavigationConfig">
import { PropType, computed, toRefs } from "vue";
import { Plus, Delete } from "@element-plus/icons-vue";
import draggable from "vuedraggable";
import { DashboardComponent } from "@/views/dashboard/components/types";

const props = defineProps({
	chartConfig: {
		type: Object as PropType<DashboardComponent>,
		required: true
	}
});

const config = computed(() => {
	return props.chartConfig.config;
});

const { list: datasetList } = toRefs(props.chartConfig.config.dataset);

const handleAddItem = () => {
	datasetList.value.push({
		id: new Date().getTime(),
		name: "",
		image: ""
	});
};
</script>
<style scoped lang="scss"></style>
