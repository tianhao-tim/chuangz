<template>
	<div class="chart-item-wrapper" @click.stop="emits('selected', chartConfig)">
		<div class="chart-operation-wrapper">
			<el-tag class="mr2">{{ chartConfig.name }}</el-tag>
			<el-popconfirm
				confirm-button-text="确定"
				cancel-button-text="取消"
				:icon="InfoFilled"
				icon-color="#626AEF"
				title="确认删除该组件？"
				width="200"
				@confirm="handleDeleteItem"
			>
				<template #reference>
					<el-icon color="#F56C6C">
						<Delete />
					</el-icon>
				</template>
			</el-popconfirm>
		</div>
		<component
			:is="chartsComponent"
			:chartConfig="chartConfig"
			:themeSetting="themeSetting"
			:themeColor="themeColor"
			class="chart-component"
		></component>
	</div>
</template>

<script setup lang="ts" name="DashboardChartItem">
import { PropType, computed } from "vue";
import { DashboardComponent } from "@/views/dashboard/components/types";
import { InfoFilled } from "@element-plus/icons-vue";

const props = defineProps({
	themeSetting: {
		type: Object,
		required: true
	},
	themeColor: {
		type: Object,
		required: true
	},
	chartConfig: {
		type: Object as PropType<DashboardComponent>,
		required: true
	}
});

// 动态导入组件
const modules = import.meta.glob("../../components/**/**/index.vue", { eager: true }) as any;

const chartsComponent = computed(() => {
	return modules[`../../components/${props.chartConfig.componentType}/${props.chartConfig.componentName}/index.vue`]?.default;
});

const emits = defineEmits(["delete", "selected"]);

const handleDeleteItem = () => {
	emits("delete", props.chartConfig);
};
</script>

<style scoped lang="scss">
.chart-item-wrapper {
	height: 100%;
	width: 100%;
	overflow: hidden;

	.chart-operation-wrapper {
		position: absolute;
		right: 10px;
		top: 5px;
		z-index: 999;

		.el-icon {
			cursor: pointer;
		}
	}
}
</style>
