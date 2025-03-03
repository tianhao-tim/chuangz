<template>
	<el-dialog v-model="dialogVisible" title="动态值" draggable @close="handleClose">
		<div class="description-text mb20 pl10">
			<i class="tduck icon-tishi"></i>
			点击左侧可以插入动态值
		</div>
		<el-row :gutter="10">
			<el-col :span="12">
				<div class="left-wrap">
					<el-tree :data="allFormItemList" :props="defaultProps" @node-click="handleNodeClick" />
				</div>
			</el-col>
			<el-col :span="12">
				<el-input type="textarea" id="textarea" rows="10" v-model="dynamicValueInput" placeholder="点击左侧可以插入动态值" />
			</el-col>
		</el-row>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="handleSubmit"> 确认 </el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from "vue";
import { UPDATE_MODEL_EVENT } from "@/utils/constants";
import { getFormFieldList } from "@/api/modules/form";

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false
	},
	dynamicValue: {
		type: String,
		default: ""
	},
	formKey: {
		type: String,
		default: ""
	}
});
const defaultProps = {
	children: "children",
	label: "label"
};

const handleNodeClick = ({ value }) => {
	insertText("${" + value + "}");
};
const dynamicValueInput = ref(props.dynamicValue);

const insertText = myValue => {
	const myField = document.querySelector("#textarea") as any;
	if (myField.selectionStart || myField.selectionStart === 0) {
		let startPos = myField.selectionStart;
		let endPos = myField.selectionEnd;
		dynamicValueInput.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
		nextTick();
		myField.focus();
		myField.setSelectionRange(endPos + myValue.length, endPos + myValue.length);
	} else {
		dynamicValueInput.value += myValue;
	}
};

const handleSubmit = () => {
	emits("submit", dynamicValueInput.value);
	dialogVisible.value = false;
};

const dialogVisible = ref(props.modelValue);
watch(
	() => props.modelValue,
	async val => {
		dialogVisible.value = val;
		if (val) {
			let res = await getFormFieldList(props.formKey);
			allFormItemList.value = res.data;
		}
	}
);
const allFormItemList = ref([]);

const emits = defineEmits([UPDATE_MODEL_EVENT, "submit"]);

const handleClose = () => {
	emits(UPDATE_MODEL_EVENT, false);
};
</script>

<style lang="scss" scoped>
.left-wrap {
	border: var(--el-border);
}
</style>
