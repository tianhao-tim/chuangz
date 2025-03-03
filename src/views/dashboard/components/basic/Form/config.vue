<template>
	<g-field-collapse label="表单" expand>
		<g-field :level="2" label="提交按钮文案">
			<el-input v-model="config.submitBtnText" />
		</g-field>
		<g-field :level="2" label="条件连接符">
			<el-radio-group v-model="config.logicSymbol">
				<el-radio-button label="AND">并且</el-radio-button>
				<el-radio-button label="OR">或者</el-radio-button>
			</el-radio-group>
		</g-field>
	</g-field-collapse>
	<el-divider>表单项</el-divider>
	<div>
		<draggable v-model="formItemList" tag="div" item-key="id" handle=".handle">
			<template #item="{ element, index }">
				<div class="flex flex-row items-center mt5">
					<div style="width: 15%" class="pl10">
						<el-icon class="handle cursor-pointer">
							<Operation />
						</el-icon>
					</div>
					<div>
						<el-input v-model="element.label" size="small" placeholder="请输入表单项名字" />
					</div>
					<div class="ml5">
						<el-button type="success" :icon="Setting" size="small" circle @click="handleSettingItem(element, index)" />
						<el-button type="danger" :icon="Delete" size="small" circle @click="handleDeleteItem(index)" />
					</div>
				</div>
			</template>
		</draggable>
		<div class="flex-center mt10">
			<el-link :icon="Plus" type="primary" :underline="false" @click="handleAddItem">增加</el-link>
		</div>
	</div>
	<form-item-setting v-model:itemConfig="itemConfig" :chartConfig="chartConfig" ref="formItemSettingDialog" @update="handleUpdateItemConfig" />
</template>

<script setup lang="ts" name="FormConfig">
import { PropType, computed, toRefs, ref } from "vue";
import draggable from "vuedraggable";
import { Plus, Delete, Setting } from "@element-plus/icons-vue";
import { DashboardComponent } from "@/views/dashboard/components/types";
import { option, FormItemType } from "./config";
import FormItemSetting from "./FormItemSetting";

const props = defineProps({
	chartConfig: {
		type: Object as PropType<DashboardComponent>,
		required: true
	}
});

const { formItemList } = toRefs(props.chartConfig.config);

const config = computed(() => {
	return props.chartConfig.config as typeof option;
});

const handleAddItem = () => {
	formItemList.value.push({
		id: Date.now(),
		label: "",
		vModel: "",
		required: false,
		type: FormItemType.INPUT,
		placeholder: ""
	});
};

const itemConfig = ref({});
const itemConfigIndex = ref(null);

const formItemSettingDialog = ref(null);
const handleSettingItem = (item: any, index: number) => {
	itemConfig.value = item;
	itemConfigIndex.value = index;
	formItemSettingDialog.value.handleOpen();
};
const handleUpdateItemConfig = (item: any) => {
	console.log(JSON.stringify(item));
	let tempList = formItemList.value;
	tempList[itemConfigIndex.value] = item;
	formItemList.value = tempList;
	console.log(JSON.stringify(formItemList.value));
};

const handleDeleteItem = (index: number) => {
	formItemList.value.splice(index, 1);
};
</script>
<style scoped lang="scss"></style>
