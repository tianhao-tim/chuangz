<template>
	<el-dialog v-model="dialogVisible" title="数据源" width="50%" :before-close="handleClose">
		<el-form label-position="left" label-width="100px">
			<el-form-item label="数据来源">
				<el-radio-group v-model="form.dataSourceType">
					<el-radio-button label="MyForm">我的表单</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="数据表">
				<el-select v-model="form.formKey" filterable clearable placeholder="可输入文字进行搜索" @change="handleFormChange">
					<el-option v-for="f in formList" :key="f.id" :label="f.textName" :value="f.formKey" />
				</el-select>
			</el-form-item>
			<el-divider />
			<div class="option-wrapper">
				<span class="title">
					<el-icon><QuestionFilled /></el-icon>
					维度
				</span>
				<el-dropdown @command="handleDimensionCommand" max-height="260px" placement="bottom-start" trigger="click">
					<span class="el-dropdown-link">
						<el-icon :size="18" class="ml10" color="#000000" v-if="form.formKey"><Plus /></el-icon>
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item :command="item.formItemId" v-for="item in allFormItemList" :key="item.formItemId"
								>{{ item.textLabel }}
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
				<div class="field-list dimension-field-list">
					<draggable v-model="form.dimension" item-key="id">
						<template #item="{ element, index }">
							<el-dropdown
								size="small"
								trigger="click"
								placement="bottom-start"
								class="dimension-dropdown"
								@command="
									command => {
										handleFieldCommand(command, element);
									}
								"
							>
								<el-tag
									effect="dark"
									closable
									@close="
										() => {
											handleCloseTag(form.dimension, index);
										}
									"
								>
									<el-icon class="el-icon--right">
										<arrow-down />
									</el-icon>
									{{ d }}
								</el-tag>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item command="rename">修改显示名</el-dropdown-item>
										<el-dropdown-item>Action 2</el-dropdown-item>
										<el-dropdown-item>Action 3</el-dropdown-item>
										<el-dropdown-item>Action 4</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</template>
					</draggable>
					<div v-if="!form.dimension.length" class="text-color-secondary">选择表单后，可通过+添加维度</div>
				</div>
			</div>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watchEffect } from "vue";
import { getFormItemList, getFormList } from "@/api/modules/form";
import draggable from "vuedraggable";

const dialogVisible = ref(true);

const form = reactive({
	// 数据来源类型
	dataSourceType: "MyForm",
	formKey: "",
	index: [],
	dimension: []
});

const formList = ref([]);
const allFormItemList = ref([]);

onMounted(() => {
	getFormListData();
});

watchEffect(async () => {
	let res = await getFormItemList(form.formKey);
	allFormItemList.value = res.data;
});

const getFormListData = () => {
	getFormList().then(res => {
		formList.value = res.data;
	});
};

const handleClose = (done: () => void) => {
	ElMessageBox.confirm("Are you sure to close this dialog?")
		.then(() => {
			done();
		})
		.catch(() => {
			// catch error
		});
};
const handleDimensionCommand = (command: string) => {
	form.dimension.push({
		id: command,
		label: allFormItemList.value.find(item => item.formItemId === command)?.textLabel
	});
};

const handleFormChange = () => {
	form.index = [];
	form.dimension = [];
};

const handleCloseTag = (arr: any[], index: number) => {
	arr.splice(index, 1);
};
const handleFieldCommand = (command: string, tag: any) => {
	if (command === "rename") {
		ElMessageBox.prompt("请输入新的显示名称", "", {
			confirmButtonText: "确定",
			cancelButtonText: "取消"
		}).then(({ value }) => {
			tag.label = value;
		});
	}
};
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
		width: 30px;
		flex: 2;
	}

	.field-list {
		flex: 22;
	}
}

.dimension-field-list {
	margin-left: 10px;
}

.dimension-dropdown {
	margin: 2px 5px;
}
</style>
