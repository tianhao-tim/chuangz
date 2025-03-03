<template>
	<g-field-collapse label="饼图设置">
		<g-field :level="2" label="类型">
			<g-select v-model="chartConfig.config.type" :data="fontWeightOptions" size="small" />
		</g-field>
	</g-field-collapse>
	<GlobalSetting :optionData="chartConfig.config" v-if="chartConfig" />
</template>

<script setup lang="ts" name="BasicPieConfig">
import { PropType } from "vue";
import { DashboardComponent } from "@/views/dashboard/components/types";
import GlobalSetting from "@/views/dashboard/components/charts/common/GlobalSetting.vue";
import { PieTypeEnum, PieTypeObject } from "@/views/dashboard/components/charts/BasicPie/config";

defineProps({
	chartConfig: {
		type: Object as PropType<DashboardComponent>,
		required: true
	}
});
const fontWeightOptions = [
	{
		value: PieTypeEnum.NORMAL,
		id: PieTypeObject[PieTypeEnum.NORMAL]
	},
	{
		value: PieTypeEnum.RING,
		id: PieTypeObject[PieTypeEnum.RING]
	},
	{
		value: PieTypeEnum.ROSE,
		id: PieTypeObject[PieTypeEnum.ROSE]
	}
];
</script>
<style scoped lang="scss"></style>
