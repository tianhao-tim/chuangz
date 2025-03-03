<template>
	<el-dialog v-model="state.visible" title="维度设置" width="40%" :before-close="handleClose">
		<el-form :model="form" label-width="120px">
			<el-form-item label="维度名称">
				<el-input v-model="form.label" />
			</el-form-item>
			<el-form-item label="日期格式" v-if="isDateType">
				<el-radio-group v-model="form.dateFormat">
					<el-radio-button v-for="key in Object.keys(dateFormat)" :key="key" :label="key">{{ dateFormat[key] }}</el-radio-button>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="handleClose">取消</el-button>
				<el-button type="primary" @click="handleConfirm">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup name="DimensionSettings">
import { reactive, watch, toRef, computed } from "vue";

interface Field {
	id: string;
	label: string;
	value?: string;
	dateFormat?: string;
}

interface Props {
	field: Field;
	dialogVisible: boolean;
}

interface State {
	field: Field;
	visible: boolean;
}

// 日期格式
const dateFormat = {
	YEAR: "年",
	MONTH: "月",
	DAY: "日",
	WEEK: "周",
	HOUR: "时",
	MINUTE: "分",
	SECOND: "秒"
};

const props = withDefaults(defineProps<Props>(), {
	field: () => ({ id: "", label: "" }),
	dialogVisible: false
});
const emits = defineEmits(["update:dialogVisible", "confirm"]);

const state = reactive<State>({
	visible: props.dialogVisible,
	field: { ...props.field }
});

const form = toRef(state, "field");

watch(
	() => props.field,
	val => {
		state.field = { ...val };
	}
);

watch(
	() => props.dialogVisible,
	val => {
		console.log("dialogVisible", val);
		state.visible = val;
	}
);

const isDateType = computed(() => {
	// 包含 date 或者 time
	return state.field.id.includes("date") || state.field.id.includes("Time");
});

const handleClose = () => {
	emits("update:dialogVisible", false);
};

const handleConfirm = () => {
	emits("confirm", form.value);
};
</script>

<style lang="scss" scoped></style>
