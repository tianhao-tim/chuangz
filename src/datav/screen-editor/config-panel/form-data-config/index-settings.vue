<template>
	<el-dialog v-model="state.visible" title="指标设置" width="40%" :before-close="handleClose">
		<el-form :model="form" label-width="100px">
			<el-form-item label="指标名称">
				<el-input v-model="form.label" />
			</el-form-item>
			<el-form-item label="聚合类型">
				<el-radio-group v-model="form.aggregateType" v-if="isNumberType">
					<el-radio-button label="SUM">求和</el-radio-button>
					<el-radio-button label="AVG">平均值</el-radio-button>
					<el-radio-button label="MAX">最大值</el-radio-button>
					<el-radio-button label="MIN">最小值</el-radio-button>
					<el-radio-button label="COUNT">计数</el-radio-button>
				</el-radio-group>
				<el-radio-group v-model="form.aggregateType" v-else>
					<el-radio-button label="COUNT">计数</el-radio-button>
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

<script lang="ts" setup name="IndexSettings">
import { reactive, watch, ref, computed } from "vue";

interface Field {
	id: string;
	label: string;
	aggregateType?: string;
	value?: string;
}

interface Props {
	field: Field;
	dialogVisible: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	field: () => ({ id: "", label: "", aggregateType: "COUNT" }),
	dialogVisible: false
});
const emits = defineEmits(["update:dialogVisible", "confirm"]);

const state = reactive({
	visible: props.dialogVisible
});

const form = ref({ ...props.field });
watch(
	() => props.field,
	val => {
		form.value = val;
	}
);

watch(
	() => props.dialogVisible,
	val => {
		state.visible = val;
	}
);

const handleClose = () => {
	emits("update:dialogVisible", false);
};

const handleConfirm = () => {
	emits("confirm", form.value);
};

/**
 * 是数字类型的指标，才能设置聚合类型
 */
const isNumberType = computed(() => {
	return form.value.id && form.value.id.indexOf("number") > -1;
});
</script>

<style lang="scss" scoped></style>
