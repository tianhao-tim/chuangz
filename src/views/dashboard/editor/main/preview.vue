<template>
	<el-dialog v-model="visible" title="预览" fullscreen @close="closeDialog" class="no-padding-dialog" destroy-on-close>
		<template #header="{ titleId, titleClass }">
			<div class="my-header">
				<span :id="titleId" :class="titleClass">预览</span>
				<el-radio-group v-model="layoutMode">
					<el-radio-button label="PC">
						<el-icon>
							<Monitor />
						</el-icon>
					</el-radio-button>
					<el-radio-button label="PAD">
						<el-icon>
							<Cellphone />
						</el-icon>
					</el-radio-button>
					<el-radio-button label="MOBILE">
						<el-icon>
							<Iphone />
						</el-icon>
					</el-radio-button>
				</el-radio-group>
			</div>
		</template>
		<div class="dv-border"></div>
		<div class="main-wrapper">
			<div class="layout-content" :class="`layout-content-${layoutMode}`">
				<DashboardShare :share-key="shareKey" preview-mode />
			</div>
		</div>
	</el-dialog>
</template>
<script setup lang="ts" name="dashboardPreview">
import { ref, watch } from "vue";
import { UPDATE_MODEL_EVENT } from "@/utils/constants";
import DashboardShare from "../../share/index.vue";

const visible = ref(false);

const layoutMode = ref("PC");

interface PreviewProps {
	shareKey: string;
	modelValue: boolean;
}

const props = defineProps<PreviewProps>();

const emit = defineEmits([UPDATE_MODEL_EVENT]);

watch(
	() => props.modelValue,
	async val => {
		visible.value = val;
	}
);

const closeDialog = () => {
	visible.value = false;
	emit(UPDATE_MODEL_EVENT, false);
};
</script>
<style lang="scss" scoped>
.main-wrapper {
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: auto;
}

.dv-border {
	margin-top: 10px;
	border-bottom: var(--el-border);
}
.my-header {
	padding: 5px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 50%;
}

.layout-content {
	background-color: var(--el-bg-color);
	height: 100%;
	width: 100%;
	overflow: hidden;

	&-PC {
		width: 100%;
	}

	&-PAD {
		width: 70%;
	}

	&-MOBILE {
		width: 30%;
	}
}
</style>
