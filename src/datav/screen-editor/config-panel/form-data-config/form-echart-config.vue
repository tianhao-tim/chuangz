<template>
	<div>
		<div class="option-wrapper">
			<span class="title">
				维度
				<el-tooltip content="“维度”是指数据的属性。举例来说，“城市”维度表示的是发起会话的城市，最多可添加3个" placement="bottom" effect="dark">
					<el-icon><QuestionFilled /></el-icon>
				</el-tooltip>
			</span>
			<el-dropdown
				@command="
					command => {
						handleAddCommand(form.dimension, command);
					}
				"
				max-height="260px"
				placement="bottom-start"
				trigger="click"
			>
				<span class="el-dropdown-link">
					<el-icon :size="18" class="ml10" color="#000000" v-if="form.indexName && form.dimension.length < 3"><Plus /></el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item :command="item.value" v-for="item in props.allFormItemList" :key="item.value">{{ item.label }} </el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
			<div class="field-list dimension-field-list">
				<draggable v-model="form.dimension" item-key="id">
					<template #item="{ element, index }">
						<el-tag
							effect="dark"
							closable
							@click="
								() => {
									dimensionDialogVisible = true;
									handleOpenSettingDialog(element, index);
								}
							"
							@close="
								() => {
									handleCloseTag(form.dimension, index);
								}
							"
						>
							<el-icon class="el-icon--right">
								<Setting />
							</el-icon>
							{{ element.label }}
						</el-tag>
					</template>
				</draggable>
				<div v-if="!form.dimension.length" class="text-color-secondary">选择表单后，可通过+添加维度</div>
			</div>
		</div>
		<div class="option-wrapper">
			<span class="title">
				指标
				<el-tooltip content="“指标”是量化衡量标准。“会话数”指标是指总会话次数，最多可添加3个" placement="bottom" effect="dark">
					<el-icon><QuestionFilled /></el-icon>
				</el-tooltip>
			</span>
			<el-dropdown
				@command="
					command => {
						handleAddIndexCommand(form.index, command);
					}
				"
				max-height="260px"
				placement="bottom-start"
				trigger="click"
			>
				<span class="el-dropdown-link">
					<el-icon :size="18" class="ml10" color="#000000" v-if="form.indexName && form.index.length < getIndexCount"><Plus /></el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item :command="item.value" v-for="item in props.allFormItemList" :key="item.value">{{ item.label }} </el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
			<div class="field-list dimension-field-list">
				<draggable v-model="form.index" item-key="id">
					<template #item="{ element, index }">
						<el-tag
							effect="dark"
							closable
							@click="
								() => {
									indexDialogVisible = true;
									handleOpenSettingDialog(element, index);
								}
							"
							@close="
								() => {
									handleCloseTag(form.index, index);
								}
							"
						>
							<el-icon class="el-icon--right">
								<Setting />
							</el-icon>
							{{ element.label }}
						</el-tag>
					</template>
				</draggable>
				<div v-if="!form.index.length" class="text-color-secondary">选择表单后，可通过+添加维度</div>
			</div>
		</div>
		<el-form-item label="限制条数" class="mt10">
			<el-input-number v-model="form.limit" :min="1" :max="100" label="显示条数" />
		</el-form-item>
		<el-form-item class="mt10">
			<template #label> 排序 </template>
			<el-button @click="handleAddSort" type="primary" class="mb5">增加排序</el-button>
			<el-row v-for="(sort, index) in form.sorts" :key="index" :gutter="20">
				<el-col :span="10">
					<el-select v-model="sort.name">
						<el-option v-for="item in props.allFormItemList" :key="item.value" :label="item.label" :value="item.value"
					/></el-select>
				</el-col>
				<el-col :span="10">
					<el-select v-model="sort.sortType">
						<el-option key="ASC" label="升序" value="ASC"></el-option>
						<el-option key="DESC" label="降序" value="DESC"></el-option>
					</el-select>
				</el-col>
				<el-col :span="2">
					<el-button type="danger" :icon="Delete" circle @click="form.sorts.splice(index, 1)" />
				</el-col>
			</el-row>
		</el-form-item>
		<dimension-settings
			v-if="settingObj.obj"
			:field="settingObj.obj"
			v-model:dialogVisible="dimensionDialogVisible"
			@confirm="
				item => {
					handleSettingConfirm(item, form.dimension);
					dimensionDialogVisible = false;
				}
			"
		/>
		<index-settings
			v-if="settingObj.obj"
			:field="settingObj.obj"
			v-model:dialogVisible="indexDialogVisible"
			@confirm="
				item => {
					handleSettingConfirm(item, form.index);
					indexDialogVisible = false;
				}
			"
		/>
	</div>
</template>

<script lang="ts" setup name="FormEchartConfig">
import { ComputedRef, ref, inject, reactive, computed } from "vue";
import { ApiDataConfig } from "@/datav/types/data-source";
import draggable from "vuedraggable";
import DimensionSettings from "./dimension-settings";
import IndexSettings from "./index-settings";
import { Delete } from "@element-plus/icons-vue";

const apiDataConfig = inject("apiDataConfig") as ComputedRef<ApiDataConfig>;

const form = apiDataConfig.value.config.formConfig;

const props = defineProps<{
	allFormItemList: any[];
}>();

const dimensionDialogVisible = ref(false);

const indexDialogVisible = ref(false);

const settingObj = reactive({
	index: null,
	obj: null,
	visible: false
});

const handleAddCommand = (arr: any[], command: string) => {
	arr.push({
		id: command,
		label: props.allFormItemList.find(item => item.value === command)?.label
	});
};

const handleAddIndexCommand = (arr: any[], command: string) => {
	arr.push({
		id: command,
		label: props.allFormItemList.find(item => item.value === command)?.label,
		aggregateType: "COUNT"
	});
};

const handleCloseTag = (arr: any[], index: number) => {
	arr.splice(index, 1);
};

const handleOpenSettingDialog = (obj: any, index: number) => {
	settingObj.index = index;
	settingObj.obj = obj;
};

const handleSettingConfirm = (item: any, arr: any) => {
	arr[settingObj.index] = { ...item };
};

const handleAddSort = () => {
	form.sorts.push({
		name: "",
		sortType: "ASC"
	});
};

const getIndexCount = computed(() => {
	if (apiDataConfig.value.comId.split("_")[0] === "TableBar") {
		return 1;
	}
	return 3;
});
</script>

<style lang="scss" scoped>
.option-wrapper {
	border: var(--el-border);
	min-height: 24px;
	line-height: 24px;
	padding: 2px 10px;
	margin-top: 10px;
	border-radius: 4px;
	display: flex;
	flex: 24;
	align-items: center;

	.el-icon {
		cursor: pointer;
		flex: 1;
	}

	.icon-disabled {
		color: var(--el-disabled-text-color);
	}

	.title {
		display: inline-block;
		width: 50px;
		flex: 3;
	}

	.field-list {
		flex: 21;
	}
}

.dimension-field-list {
	margin-left: 10px;
}

.dimension-dropdown {
	margin: 2px 5px;
}
</style>
