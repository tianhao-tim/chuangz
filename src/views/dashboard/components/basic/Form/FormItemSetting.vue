<template>
	<el-dialog v-model="dialogVisible" title="设置" width="50%" draggable class="no-padding-dialog">
		<el-steps :active="stepActive" simple finish-status="success" class="mt10" align-center>
			<el-step title="基础" :icon="Edit"></el-step>
			<el-step title="数据联动" :icon="Tools" />
		</el-steps>
		<el-form :model="formData" label-width="120px" v-if="formData && stepActive === 0" class="mt10 w-11\/12">
			<el-form-item label="选项名" required>
				<el-input v-model="formData.label" />
			</el-form-item>
			<el-form-item label="类型" required>
				<el-select v-model="formData.type">
					<el-option label="文本" :value="FormItemType.INPUT" />
					<el-option label="下拉" :value="FormItemType.SELECT" />
					<el-option label="日期" :value="FormItemType.DATE_PICKER" />
				</el-select>
			</el-form-item>
			<el-form-item label="是否必填" required>
				<el-switch v-model="formData.required" />
			</el-form-item>
			<el-form-item required>
				<template #label>
					<span>查询值key</span>
					<el-tooltip
						effect="dark"
						content="在数据联动查询时唯一的标识，如果不知道填什么可以随便填一个，如果图表的数据来源都是表单可以选择绑定表单字段"
						placement="top"
					>
						<el-icon>
							<QuestionFilled />
						</el-icon>
					</el-tooltip>
				</template>
				<el-input v-model="formData.vModel" />
			</el-form-item>
			<el-form-item label="占位提示">
				<el-input v-model="formData.placeholder" />
			</el-form-item>
			<el-form-item label="绑定表单">
				<tduck-form-item-select @change="handleBindFormChange" :selected-form-info="formData.bindFormInfo" />
			</el-form-item>
			<!--			item-->
			<el-form-item label="下拉选项" v-if="formData.type === FormItemType.SELECT">
				<div>
					<div>
						<el-button @click="handleAddOption" type="primary">增加</el-button>
					</div>
					<el-row v-for="(op, index) in formData.options" :key="index">
						<el-col :span="10">
							<el-input v-model="op.label" placeholder="请输入下拉显示值" />
						</el-col>
						<el-col :span="10" :offset="1">
							<el-input v-model="op.value" placeholder="请输入下拉选中值" />
						</el-col>
						<el-col :span="1" :offset="1">
							<el-button circle type="danger" :icon="Delete" @click="handleDeleteOption(index)"></el-button>
						</el-col>
					</el-row>
				</div>
			</el-form-item>
		</el-form>
		<div v-if="stepActive === 1" class="mt10 data-mapping-wrapper">
			<div class="flex min-h">
				<div class="right-border min-h w33">
					<div class="d-title">1.选择需要联动的图表</div>
					<el-tree ref="treeRef" :data="dashboardChartList" show-checkbox node-key="id" :props="defaultProps" @check="handleChartSelected" />
				</div>
				<div class="right-border min-h w33">
					<div class="d-title">
						2.联动字段映射
						<el-tooltip content="默认映射为同表单项同名字段，在表单提交时会把数值传递给配置联动的组件。" placement="top">
							<el-icon class="header-icon">
								<QuestionFilled />
							</el-icon>
						</el-tooltip>
					</div>
					<el-collapse accordion class="ml2" v-if="selectedChartList && selectedChartList.length">
						<el-collapse-item :title="chart.name" :name="chart.id" v-for="chart in selectedChartList" :key="chart.id">
							<div>
								<span clsss="mr4">{{ formData.vModel }}</span>
								<el-tag clsss="ml2"> 映射为</el-tag>
								<el-input v-model="mappingFields[chart.id]" size="small" />
							</div>
						</el-collapse-item>
					</el-collapse>
					<el-empty v-else></el-empty>
				</div>
				<div class="right-border min-h w33">
					<div class="d-title">3.联动方式映射</div>
					<el-select v-model="formData.filterType" placeholder="请选择条件" class="m5">
						<el-option v-for="c in dataFilterTypeConstant" :key="c.value" :label="c.label" :value="c.value" />
					</el-select>
				</div>
			</div>
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="success" @click="handleNextStep"> {{ stepActive === 0 ? "下一步" : "上一步" }} </el-button>
				<el-button type="primary" @click="handleSubmit" v-if="stepActive === 1"> 确认 </el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts" name="FormItemSetting">
import { computed, nextTick, PropType, Ref, ref, watch } from "vue";
import { Delete, Edit, Tools } from "@element-plus/icons-vue";
import { cloneDeep } from "lodash-es";
import { ChartFormItem, FormItemType } from "./config";
import { dataFilterTypeConstant } from "@/utils/tduckForm";
import { useDashboardStore } from "@/store/modules/dashboard";
import TduckFormItemSelect from "@/views/dashboard/components/basic/Form/TduckFormItemSelect.vue";
import { ElTree } from "element-plus";
import { DashboardComponent } from "@/views/dashboard/components/types";

const props = defineProps({
	itemConfig: {
		type: Object as PropType<ChartFormItem>,
		required: true
	},
	chartConfig: {
		type: Object as PropType<DashboardComponent>,
		required: true
	}
});

const dashboardStore = useDashboardStore();

const dashboardChartList = computed(() => {
	// 排除掉本身
	return dashboardStore.componentList.filter(item => item.id !== props.chartConfig.id);
});

const defaultProps = {
	children: "children",
	label: "name"
};

const treeRef = ref<InstanceType<typeof ElTree>>();

// 选中映射的图标Id
const selectedMappingChartsId = ref(props.itemConfig.selectedMappingChartsId || []);
//字段映射关系
const mappingFields = ref(props.itemConfig.mappingFields || {}) as Ref<Map<string, string>>;

const handleChartSelected = (data, { checkedKeys }) => {
	selectedMappingChartsId.value = checkedKeys;
	mappingFields.value = checkedKeys.reduce((pre, cur) => {
		pre[cur] = formData.value.vModel;
		return pre;
	}, {});
};
const selectedChartList = computed(() => {
	return dashboardStore.componentList.filter(item => {
		return selectedMappingChartsId.value?.includes(item.id);
	});
});

const dialogVisible = ref(false);

const formData: Ref<ChartFormItem> = ref({
	...props.itemConfig
});

watch(
	() => props.itemConfig,
	(nv: any) => {
		formData.value = { ...nv };
	},
	{ immediate: true }
);

const handleOpen = () => {
	stepActive.value = 0;
	dialogVisible.value = true;
};

const emits = defineEmits(["update"]);

const handleSubmit = () => {
	dialogVisible.value = false;
	stepActive.value = 0;
	formData.value.mappingFields = cloneDeep(mappingFields.value);
	formData.value.selectedMappingChartsId = cloneDeep(selectedMappingChartsId.value);
	emits("update", formData.value);
};

const handleAddOption = () => {
	if (!formData.value.options) {
		formData.value.options = [];
	}
	formData.value.options.push({
		label: "",
		value: ""
	});
};
const handleDeleteOption = (index: number) => {
	formData.value.options.splice(index, 1);
};
defineExpose({
	handleOpen
});

const stepActive = ref(0);
const handleNextStep = () => {
	stepActive.value = stepActive.value === 0 ? 1 : 0;
	if (stepActive.value === 1) {
		selectedMappingChartsId.value = props.itemConfig.selectedMappingChartsId || [];
		mappingFields.value = props.itemConfig.mappingFields;
		nextTick(() => {
			treeRef.value?.setCheckedKeys(selectedMappingChartsId.value);
		});
	}
};

const handleBindFormChange = (formInfo: any) => {
	formData.value.bindFormInfo = cloneDeep(formInfo);
	formData.value.vModel = formInfo.formItemId;
};
</script>
<style scoped lang="scss">
.data-mapping-wrapper {
	min-height: 300px;

	.d-title {
		font-size: var(--el-font-size-base);
		font-weight: bold;
		margin-bottom: 10px;
		margin-left: 15px;
	}

	.min-h {
		min-height: 300px;
	}

	.el-row {
		height: 100%;
	}

	//除了最后一个.el-col
	.el-col:not(:last-child) {
		border-right: var(--el-border-color) solid 1px;
	}
	.w33 {
		width: 33.333333%;
	}
}
</style>
