<template>
	<div class="setting-panel-gui">
		<g-field-collapse label="全局">
			<g-field label="字体" tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体">
				<g-select v-model="config.global.fontFamily" :data="fontFamilys" />
			</g-field>

			<g-field label="环图半径" flat tooltip="环图的半径，值为<number|string>，可设置可视区域百分比">
				<g-input v-model="config.global.radius[0]" inline="inline" label="内半径" />
				<g-input v-model="config.global.radius[1]" inline="inline" label="外半径" />
			</g-field>
		</g-field-collapse>
		<g-field-collapse label="标注" toggle v-model="config.label.show">
			<g-field label="文本样式" flat>
				<g-input-number v-model="config.label.textStyle.fontSize" :min="10" :max="24" :step="1" suffix="px" inline label="字号" />
				<g-select v-model="config.label.textStyle.fontWeight" :data="fontWeights" inline label="字体粗细" />
				<g-color-picker v-model="config.label.textStyle.color" label="颜色" inline="inline-single" />
			</g-field>
		</g-field-collapse>
		<g-field-collapse label="图例" toggle v-model="config.legend.show">
			<g-field label="位置">
				<g-select v-model="config.legend.position" :data="legendLocations" />
			</g-field>
			<g-field label="布局方式">
				<el-radio-group v-model="config.legend.orient">
					<el-radio-button v-for="em in orients" :key="em.value" :label="em.value">{{ em.value }}</el-radio-button>
				</el-radio-group>
			</g-field>
			<g-field label="文本样式" flat>
				<g-input-number v-model="config.legend.textStyle.fontSize" :min="0" :max="24" :step="1" suffix="px" inline label="字号" />
				<g-select v-model="config.legend.textStyle.fontWeight" :data="fontWeights" inline label="字体粗细" />
				<g-color-picker v-model="config.legend.textStyle.color" label="颜色" inline="inline-single" />
			</g-field>
			<g-field-collapse label="图形" v-model="config.legend.symbol.show" toggle>
				<g-field label="图例" flat>
					<g-input-number v-model="config.legend.symbol.width" :min="0" :max="100" :step="1" suffix="px" inline label="宽度" />
					<g-input-number v-model="config.legend.symbol.height" :min="0" :max="100" :step="1" suffix="px" inline label="高度" />
					<g-input-number v-model="config.legend.symbol.gap" :min="-100" :max="100" :step="1" suffix="px" inline label="间隔" />
					<g-select v-model="config.legend.symbol.icon" :data="legendIcons" inline label="形状" />
				</g-field>
			</g-field-collapse>
		</g-field-collapse>
		<g-field-collapse label="提示框" toggle v-model="config.tooltip.show">
			<g-field label="文本样式" flat>
				<g-input-number v-model="config.tooltip.textStyle.fontSize" :min="10" :max="24" :step="1" suffix="px" inline label="字号" />
				<g-select v-model="config.tooltip.textStyle.fontWeight" :data="fontWeights" inline label="字体粗细" />
				<g-color-picker v-model="config.tooltip.textStyle.color" label="颜色" inline="inline-single" />
			</g-field>
			<g-field label="背景样式" flat>
				<g-input-number v-model="config.tooltip.background.padding.h" :min="0" :max="100" :step="1" suffix="px" inline="inline" label="水平边距" />
				<g-input-number v-model="config.tooltip.background.padding.v" :min="0" :max="100" :step="1" suffix="px" inline="inline" label="垂直边距" />
				<g-color-picker v-model="config.tooltip.background.color" label="背景颜色" inline="inline-single" />
			</g-field>
		</g-field-collapse>
		<g-field-collapse v-model="config.animation.enabled" :toggle="true" label="动画">
			<g-field :level="2" label="持续时间">
				<g-input-number v-model="config.animation.duration" :min="0" :step="100" suffix="ms" />
			</g-field>
			<g-field :level="2" label="缓动效果">
				<g-select v-model="config.animation.easing" :data="animationEasings" />
			</g-field>
			<g-field :level="2" label="延迟">
				<g-input-number v-model="config.animation.delay" :min="0" :step="100" suffix="ms" />
			</g-field>
		</g-field-collapse>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "VPieOneValueProp"
});
</script>

<script lang="ts" setup>
import { PropType, toRef } from "vue";
import { fontFamilys, fontWeights, legendLocations, orients, legendIcons, animationEasings } from "@/datav/charts/select-options";
import { PieOneValue } from "./pie-one-value";

const props = defineProps({
	com: {
		type: Object as PropType<PieOneValue>,
		required: true
	}
});

const config = toRef(props.com, "config");
</script>
