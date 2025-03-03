<template>
	<GlobalSetting :optionData="chartConfig.config" v-if="chartConfig" />
	<!-- 漏斗图 -->
	<g-field-collapse v-for="(item, index) in seriesList" :key="index" :label="`漏斗图`">
		<g-field label="排序">
			<g-select v-model="item.sort" :data="FunnelOrderEnumList" size="small" />
		</g-field>
		<g-field-collapse label="范围">
			<g-field :label="`顶部距离：px`">
				<g-input-number v-model="item.top" :min="0" :max="300"></g-input-number>
			</g-field>
		</g-field-collapse>

		<g-field-collapse label="区块">
			<g-field label="边框大小">
				<g-input-number v-model="item.itemStyle.borderWidth" :min="0" :max="10" size="small" />
			</g-field>
			<g-field label="边框颜色">
				<g-color-picker v-model="item.itemStyle.borderColor" size="small" />
			</g-field>
			<g-field label="间隔">
				<g-input-number v-model="item.gap" :min="0" :max="20" size="small" />
			</g-field>
		</g-field-collapse>

		<g-field-collapse label="标签">
			<g-field :level="2" label="是否显示" v-model="item.label.show" toggle> </g-field>
			<g-field :level="2" label="位置">
				<g-select v-model="item.label.position" :data="FunnelLabelPositionEnumList" size="small" />
			</g-field>
			<g-field :level="2" label="大小">
				<g-input-number v-model="item.label.fontSize" :min="0" size="small" />
			</g-field>
			<g-field :level="2" label="悬停时大小">
				<g-input-number v-model="item.emphasis.label.fontSize" :min="0" size="small" />
			</g-field>
		</g-field-collapse>
	</g-field-collapse>
</template>

<script setup lang="ts" name="FunnelConfig">
import { PropType, computed } from "vue";
import { DashboardComponent } from "@/views/dashboard/components/types";
import GlobalSetting from "@/views/dashboard/components/charts/common/GlobalSetting.vue";
import { option, FunnelOrderEnumList, FunnelLabelPositionEnumList } from "./config";

const props = defineProps({
	chartConfig: {
		type: Object as PropType<typeof option & DashboardComponent>,
		required: true
	}
});

const seriesList = computed(() => {
	return props.chartConfig.config.series;
});
</script>
<style scoped lang="scss"></style>
