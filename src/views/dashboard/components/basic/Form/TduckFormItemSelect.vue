<template>
	<el-row>
		<el-col :span="12">
			<el-select-v2
				v-model="selectedFormInfo.formKey"
				:options="getFormListOptions"
				@change="handleFormChange"
				clearable
				filterable
				placeholder="请选择或者输入表名名搜索"
			/>
		</el-col>
		<el-col :span="12">
			<el-select-v2 v-model="selectedFormInfo.formItemId" :options="getAllFormItemListOptions" placeholder="请选择或者输入表单名称搜索" />
		</el-col>
	</el-row>
</template>

<script setup>
import { ref, reactive, watchEffect, watch, onBeforeMount, computed } from "vue";
import { getFormFieldList, getFormList } from "@/api/modules/form";
const formList = ref([]);
const allFormItemList = ref([]);

const getAllFormItemListOptions = computed(() => {
	return allFormItemList.value.map(item => {
		return {
			label: item.label,
			value: item.value
		};
	});
});
const getFormListOptions = computed(() => {
	return formList.value.map(item => {
		return {
			label: item.textName,
			value: item.formKey
		};
	});
});
onBeforeMount(() => {
	getFormListData();
});

const props = defineProps({
	selectedFormInfo: {
		type: Object,
		required: true,
		default: () => {
			return {
				formKey: "",
				formItemId: ""
			};
		}
	}
});

const selectedFormInfo = reactive({});

const getFormListData = () => {
	getFormList().then(res => {
		formList.value = res.data;
		selectedFormInfo.formKey = props.selectedFormInfo.formKey;
		selectedFormInfo.formItemId = props.selectedFormInfo.formItemId;
	});
};

const handleFormChange = async () => {
	selectedFormInfo.formItemId = "";
};

watchEffect(async () => {
	if (!selectedFormInfo.formKey) {
		return;
	}
	let res = await getFormFieldList(selectedFormInfo.formKey);
	allFormItemList.value = res.data;
});

watchEffect(async () => {
	if (!formList.value) {
		getFormListData();
	}
	selectedFormInfo.formKey = props.selectedFormInfo.formKey;
	selectedFormInfo.formItemId = props.selectedFormInfo.formItemId;
});

watch(
	[() => selectedFormInfo.formItemId, () => selectedFormInfo.formKey],
	() => {
		emits("change", selectedFormInfo);
	},
	{ deep: true, immediate: false }
);

const emits = defineEmits(["change"]);
</script>

<style scoped></style>
