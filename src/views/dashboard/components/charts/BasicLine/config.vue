<template>
	<GlobalSetting :optionData="chartConfig.config" v-if="chartConfig" />
	<g-field-collapse v-for="(item, index) in seriesList" :key="index" :label="`折线图-${index + 1}`">
		<g-field-collapse label="线条">
			<g-field :level="2" label="颜色">
				<g-color-picker size="small" v-model="item.lineStyle.color"></g-color-picker>
			</g-field>
			<g-field :level="2" label="宽度">
				<g-input-number v-model="item.lineStyle.width" :min="1" :max="100" size="small" placeholder="自动计算"></g-input-number>
			</g-field>
			<g-field :level="2" label="类型">
				<g-select v-model="item.lineStyle.type" size="small" :data="lineConf.lineStyle.type"></g-select>
			</g-field>
		</g-field-collapse>
		<g-field-collapse label="实心点">
			<g-field :level="2" label="大小">
				<g-input-number v-model="item.symbolSize" :min="1" :max="100" size="small" placeholder="自动计算"></g-input-number>
			</g-field>
		</g-field-collapse>
		<g-field-collapse label="标签" toggle v-model="item.label.show">
			<g-field label="大小">
				<g-input-number v-model="item.label.fontSize" size="small" :min="1"></g-input-number>
			</g-field>
			<g-field label="颜色">
				<g-color-picker size="small" v-model="item.label.color"></g-color-picker>
			</g-field>
			<g-field label="位置">
				<g-select
					v-model="item.label.position"
					:data="[
						{ id: 'top', value: 'top' },
						{ id: 'left', value: 'left' },
						{ id: 'right', value: 'right' },
						{ id: 'bottom', value: 'bottom' }
					]"
				/>
			</g-field>
		</g-field-collapse>
	</g-field-collapse>
</template>

<script setup lang="ts" name="BasicLineConfig">
import { PropType, computed } from "vue";
import { DashboardComponent } from "@/views/dashboard/components/types";
import GlobalSetting from "@/views/dashboard/components/charts/common/GlobalSetting.vue";
import { lineConf } from "../common/SettingConfig/line";

const props = defineProps({
	chartConfig: {
		type: Object as PropType<DashboardComponent>,
		required: true
	}
});

const seriesList = computed(() => {
	return props.chartConfig.config.series;
});
</script>

<style scoped lang="scss"></style>
