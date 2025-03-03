<template>
	<div class="zoom-toolbar-wrap">
		<el-icon :size="25" color="#409EFF" @click="incrementZoomSize">
			<CirclePlusFilled />
		</el-icon>
		<span @click="visibleScaleList = true"> {{ modelValue }}% </span>
		<el-popover :visible="visibleScaleList" width="56" placement="top" trigger="click" popper-class="editor-popover" :show-arrow="false" :offset="8">
			<div class="scale-value-list">
				<div v-for="s in scaleList" :key="s" class="scale-value-item" @click="submitScale(s)">
					{{ `${s}%` }}
				</div>
			</div>
			<template #reference>
				<i class="v-icon-arrow-down open-icon" @click.stop="showScaleList" />
			</template>
		</el-popover>
		<el-icon :size="25" color="#409EFF" @click="decreaseZoomSize">
			<RemoveFilled />
		</el-icon>
	</div>
</template>

<script setup lang="ts" name="ZoomControl">
import { ref } from "vue";
import { UPDATE_MODEL_EVENT } from "@/utils/constants";

const props = defineProps({
	modelValue: Number
});
const visibleScaleList = ref(false);

const scaleList = ref([200, 150, 100, 75, 50]);

const emits = defineEmits([UPDATE_MODEL_EVENT]);

const incrementZoomSize = () => {
	emits(UPDATE_MODEL_EVENT, props.modelValue + 1);
};
const decreaseZoomSize = () => {
	emits(UPDATE_MODEL_EVENT, props.modelValue - 1);
};
const hideScaleList = () => {
	visibleScaleList.value = false;
	document.removeEventListener("click", hideScaleList, false);
};

const showScaleList = () => {
	visibleScaleList.value = true;
	document.addEventListener("click", hideScaleList, false);
};

const submitScale = (scale: number) => {
	emits(UPDATE_MODEL_EVENT, scale);
	hideScaleList();
};
</script>
<style scoped lang="scss">
.zoom-toolbar-wrap {
	box-shadow: var(--el-box-shadow);
	padding: 10px;
	display: flex;
	flex-direction: row;
	align-content: center;
	justify-content: center;
	align-items: center;
	border-radius: 5px;

	.el-icon {
		margin: 5px 10px;
		cursor: pointer;
		user-select: none;
	}

	span {
		user-select: none;
		font-size: var(--el-font-size-base);
		color: var(--el-text-color-primary);
		margin: 0 5px;
	}
}
.scale-value-list {
	font-size: 12px;
	background: var(--el-bg-color-page);
	border: var(--el-border);
	user-select: none;

	.scale-value-item {
		padding: 5px 0;
		color: var(--el-text-color-primary);
		text-align: center;
		cursor: pointer;
		transition: 0.2s;

		&:hover {
			color: var(--el-color-primary-light-5);
			background: var(--el-bg-color-page);
		}

		&:not(:first-child) {
			border-top: var(--el-border);
		}
	}
}
</style>
