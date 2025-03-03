<template>
	<el-dialog v-model="dialogVisible" title="关联表单" draggable @close="handleClose">
		<div class="description-text mb20 pl10">
			<i class="tduck icon-tishi"></i>
			没有配置动态值的海报组件会按照设计海报时的默认值填充
		</div>
		<el-form :model="form" label-width="80px">
			<el-form-item label="关联名称" prop="formKey">
				<el-input v-model="form.name" placeholder="请输入名称" class="dw50" />
			</el-form-item>
			<el-form-item label="关联表单" prop="formKey">
				<el-select-v2 v-model="form.formKey" :options="formList" clearable filterable placeholder="请选择或者输入表单名称搜索" />
			</el-form-item>
			<el-form-item label="描述内容" prop="formKey">
				<tinymce v-model="form.descText" />
			</el-form-item>
			<el-form-item label="字段映射">
				<el-table :data="form.fields" style="width: 100%">
					<el-table-column prop="value" label="组件Id" />
					<el-table-column prop="name" label="组件名称" />
					<el-table-column prop="dynamicValue" label="动态值" :show-overflow-tooltip="true" />
					<el-table-column label="操作">
						<template #default="{ row }">
							<el-link icon="Setting" type="primary" @click="handleSettingDynamicValue(row)">动态值</el-link>
						</template>
					</el-table-column>
				</el-table>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" v-throttle="handleSaveFormLink"> 确认 </el-button>
			</span>
		</template>
	</el-dialog>
	<dynamic-value-dialog
		v-model="dynamicValuedDialogVisible"
		:dynamic-value="dynamicValuedRow.dynamicValue"
		:form-key="form.formKey"
		@submit="handleSaveDynamicValue"
	/>
</template>

<script lang="ts" setup>
import { inject, ref, watch } from "vue";
import { UPDATE_MODEL_EVENT } from "@/utils/constants";
import { getFormList } from "@/api/modules/form";
import { usePosterStore } from "@/store/modules/poster";
import { MessageUtil } from "@/utils/messageUtil";
import DynamicValueDialog from "./DynamicValueDialog.vue";
import Tinymce from "@/components/Tinymce/index.vue";
import { savePosterFormLink } from "@/api/modules/poster";
import { PosterWidget, PosterWidgetType } from "@/views/poster/editor/types/poster";

const defaultFormLink = {
	name: "",
	formKey: "",
	descText: "",
	fields: []
};
type FormLinkType = typeof defaultFormLink;

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false
	},
	formLink: {
		type: Object,
		default: () => {}
	}
});

const form = ref<Object | FormLinkType>(props.formLink || defaultFormLink);

watch(
	() => props.formLink,
	val => {
		form.value = val;
		initPosterFields();
	}
);

const dynamicValuedDialogVisible = ref(false);
const dynamicValuedRow = ref({
	dynamicValue: null,
	index: null
});

const posterKey = inject("posterKey");

const handleSaveFormLink = () => {
	dialogVisible.value = false;
	savePosterFormLink({
		...form.value,
		posterKey: posterKey
	}).then(res => {
		if (res.data) {
			MessageUtil.success("保存成功");
			emits("change", res.data);
		}
	});
};
const handleSettingDynamicValue = row => {
	if (!form.value.formKey) {
		MessageUtil.error(`请先选择关联表单`);
		return false;
	}
	dynamicValuedRow.value = row;
	dynamicValuedDialogVisible.value = true;
};

const handleSaveDynamicValue = val => {
	dynamicValuedRow.value.dynamicValue = val;
};

// 初始化海报字段列表
const posterStore = usePosterStore();
const initPosterFields = () => {
	// 旧的动态值
	const oldDynamicValue = form.value.fields
		? form.value.fields.reduce((acc, cur) => {
				acc[cur.value] = cur.dynamicValue;
				return acc;
		  }, {})
		: {};
	form.value.fields = [];
	posterStore.posterWidgetList.forEach((item: PosterWidget) => {
		if (item.type === PosterWidgetType.TEXT) {
			form.value.fields.push({
				value: item.id,
				name: item.name,
				dynamicValue: oldDynamicValue[item.id] || null
			});
		}
	});
};
const formList = ref([]);
const getFormListData = () => {
	getFormList().then(res => {
		if (res.data) {
			formList.value = res.data.map((item: any) => {
				return {
					label: item.textName,
					value: item.formKey
				};
			});
		}
	});
};

const dialogVisible = ref(props.modelValue);
watch(
	() => props.modelValue,
	val => {
		dialogVisible.value = val;
		if (val) {
			getFormListData();
			initPosterFields();
		}
	}
);

const emits = defineEmits([UPDATE_MODEL_EVENT, "change"]);

const handleClose = () => {
	emits(UPDATE_MODEL_EVENT, false);
};
</script>

<style lang="scss" scoped></style>
