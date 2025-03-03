<template>
	<div class="setting-panel-gui">
		<g-field-collapse label="全局">
			<g-field :level="2" tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体" label="字体">
				<g-select v-model="config.global.fontFamily" :data="fontFamilys" />
			</g-field>
			<g-field :level="2" label="边距" :is-flat="true">
				<g-input-number v-model="config.global.margin.top" :min="-1000" :max="1000" :step="1" suffix="px" inline="inline" label="顶部" />
				<g-input-number v-model="config.global.margin.bottom" :min="-1000" :max="1000" :step="1" suffix="px" inline="inline" label="底部" />
				<g-input-number v-model="config.global.margin.left" :min="-1000" :max="1000" :step="1" suffix="px" inline="inline" label="左侧" />
				<g-input-number v-model="config.global.margin.right" :min="-1000" :max="1000" :step="1" suffix="px" inline="inline" label="右侧" />
			</g-field>
			<g-field :level="2" label="组内间距">
				<g-slider v-model="config.global.innerPadding" :min="-1000" :max="1000" :step="1" suffix="px" />
			</g-field>
			<g-field :level="2" label="组间间距">
				<g-slider v-model="config.global.outerPadding" :min="-1000" :max="1000" :step="1" suffix="px" />
			</g-field>
			<g-field :level="2" tooltip="不设时自适应，可以是绝对值例如 40 或者百分数例如 60%。" label="柱子宽度">
				<g-select-suggest v-model="config.global.barWidth" :data="['auto']" />
			</g-field>
			<g-field-collapse v-model="config.global.background.show" :toggle="true" label="背景色">
				<g-field :level="2" label="颜色">
					<g-color-picker v-model="config.global.background.color" />
				</g-field>
			</g-field-collapse>
		</g-field-collapse>
		<g-field-collapse v-model="config.label.show" :toggle="true" label="柱子标注">
			<g-field :level="2" label="位置">
				<g-select v-model="config.label.position" :data="echartsLabelPositions" />
			</g-field>
			<g-field :level="2" label="文本样式" :is-flat="true">
				<g-input-number v-model="config.label.textStyle.fontSize" :min="12" :max="100" :step="1" suffix="px" inline="inline" label="字号" />
				<g-color-picker v-model="config.label.textStyle.color" inline="inline" label="颜色" />
				<g-select v-model="config.label.textStyle.fontWeight" :data="fontWeights" inline="inline" label="字体粗细" />
			</g-field>
			<g-field :level="2" label="水平偏移">
				<g-slider v-model="config.label.offsetX" :min="-1000" :max="1000" :step="1" />
			</g-field>
			<g-field :level="2" label="垂直偏移">
				<g-slider v-model="config.label.offsetY" :min="-1000" :max="1000" :step="1" />
			</g-field>
		</g-field-collapse>
		<g-field-collapse v-model="config.tooltip.show" :toggle="true" label="提示框">
			<g-field-collapse label="文本样式">
				<g-field :level="2" label="字号">
					<g-input-number v-model="config.tooltip.textStyle.fontSize" :min="12" :max="100" :step="1" suffix="px" />
				</g-field>
				<g-field :level="2" label="颜色">
					<g-color-picker v-model="config.tooltip.textStyle.color" />
				</g-field>
				<g-field :level="2" label="字体粗细">
					<g-select v-model="config.tooltip.textStyle.fontWeight" :data="fontWeights" />
				</g-field>
			</g-field-collapse>
			<g-field-collapse label="弹框背景">
				<g-field :level="2" label="背景边距" :is-flat="true">
					<g-input-number v-model="config.tooltip.background.padding.h" :min="0" :max="100" :step="1" suffix="px" inline="inline" label="水平" />
					<g-input-number v-model="config.tooltip.background.padding.v" :min="0" :max="100" :step="1" suffix="px" inline="inline" label="垂直" />
				</g-field>
				<g-field :level="2" label="背景色">
					<g-color-picker v-model="config.tooltip.background.color" />
				</g-field>
			</g-field-collapse>
			<g-field-collapse v-model="config.tooltip.pointer.show" :toggle="true" label="轴指示器">
				<g-field :level="2" label="线型样式" :is-flat="true">
					<g-select v-model="config.tooltip.pointer.line.type" :data="lineStyles" inline="inline" label="类型" />
					<g-input-number v-model="config.tooltip.pointer.line.width" :min="0" :max="100" :step="1" suffix="px" inline="inline" label="粗细" />
					<g-color-picker v-model="config.tooltip.pointer.line.color" inline="inline-single" label="颜色" />
					<g-input-number
						v-if="config.tooltip.pointer.line.type === 'dashed'"
						v-model="config.tooltip.pointer.line.dashedLength"
						:min="0"
						:max="100"
						:step="1"
						suffix="px"
						inline="inline"
						label="长度"
					/>
					<g-input-number
						v-if="config.tooltip.pointer.line.type === 'dashed'"
						v-model="config.tooltip.pointer.line.dashedSpace"
						:min="0"
						:max="100"
						:step="1"
						suffix="px"
						inline="inline"
						label="间距"
					/>
				</g-field>
			</g-field-collapse>
		</g-field-collapse>
		<g-field-collapse v-model="config.legend.show" :toggle="true" label="图例">
			<g-field :level="2" label="位置">
				<g-select v-model="config.legend.position" :data="legendLocations" />
			</g-field>
			<g-field :level="2" label="布局方式">
				<el-radio-group v-model="config.legend.orient">
					<el-radio-button v-for="em in orients" :key="em.id" :label="em.id">
						{{ em.value }}
					</el-radio-button>
				</el-radio-group>
			</g-field>
			<g-field :level="2" label="文本样式" :is-flat="true">
				<g-input-number v-model="config.legend.textStyle.fontSize" :min="0" :max="100" :step="1" suffix="px" inline="inline" label="字号" />
				<g-color-picker v-model="config.legend.textStyle.color" inline="inline" label="颜色" />
				<g-select v-model="config.legend.textStyle.fontWeight" :data="fontWeights" inline="inline-single" label="字体粗细" />
			</g-field>
			<g-field-collapse v-model="config.legend.symbol.show" :toggle="true" label="图例图标">
				<g-field :level="2" label="图标">
					<g-select-shape v-model="config.legend.symbol.icon" :shapes="legendIcons" />
				</g-field>
				<g-field :level="2" label="宽度">
					<g-input-number v-model="config.legend.symbol.width" :min="0" :max="100" :step="1" suffix="px" />
				</g-field>
				<g-field :level="2" label="高度">
					<g-input-number v-model="config.legend.symbol.height" :min="0" :max="100" :step="1" suffix="px" />
				</g-field>
				<g-field :level="2" label="间隔">
					<g-input-number v-model="config.legend.symbol.gap" :min="-1000" :max="1000" :step="1" suffix="px" />
				</g-field>
			</g-field-collapse>
			<g-field-collapse v-model="config.legend.page.enabled" :toggle="true" label="翻页功能">
				<g-field :level="2" label="容器尺寸" :is-flat="true">
					<g-input-number v-model="config.legend.page.size.width" :min="0" :max="1000" :step="1" suffix="px" inline="inline" label="宽度" />
					<g-input-number v-model="config.legend.page.size.height" :min="0" :max="1000" :step="1" suffix="px" inline="inline" label="高度" />
				</g-field>
				<g-field :level="2" label="翻页按钮" :is-flat="true">
					<g-input-number v-model="config.legend.page.button.size" :min="0" :max="100" :step="1" suffix="px" inline="inline" label="尺寸" />
					<g-color-picker v-model="config.legend.page.button.color" inline="inline" label="颜色" />
					<g-color-picker v-model="config.legend.page.button.inactiveColor" inline="inline-single" label="禁用颜色" />
				</g-field>
				<g-field :level="2" label="页码颜色">
					<g-color-picker v-model="config.legend.page.pageNumColor" />
				</g-field>
			</g-field-collapse>
		</g-field-collapse>
		<g-field-collapse
			label="系列"
			mode="layout"
			default-layout="horizontal"
			:features="['vertical', 'horizontal', 'copy', 'add', 'remove']"
			:list="config.series"
			:min="1"
			:max="5"
			tab="系列"
			:add-item="handleAddSeriesItem"
		>
			<template #default="slotProps">
				<g-field :level="2" label="填充类型">
					<el-radio-group v-model="slotProps.item.color.type">
						<el-radio-button v-for="em in fillTypes" :key="em.id" :label="em.id">
							{{ em.value }}
						</el-radio-button>
					</el-radio-group>
				</g-field>
				<g-field v-if="slotProps.item.color.type === 'solid'" :level="2" label="颜色">
					<g-color-picker v-model="slotProps.item.color.value" />
				</g-field>
				<g-field v-if="slotProps.item.color.type === 'gradient'" :level="2" label="开始颜色">
					<g-color-picker v-model="slotProps.item.color.from" />
				</g-field>
				<g-field v-if="slotProps.item.color.type === 'gradient'" :level="2" label="结束颜色">
					<g-color-picker v-model="slotProps.item.color.to" />
				</g-field>
			</template>
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
import { defineComponent, PropType, toRef } from "vue";
import {
	animationEasings,
	axisTypes,
	echartsLabelPositions,
	fillTypes,
	fontFamilys,
	fontWeights,
	hAligns,
	legendIcons,
	legendLocations,
	lineStyles,
	orients,
	timeFormats,
	titleLocations,
	valueFormats
} from "@/datav/charts/select-options";
import { ArcBar, ArcBarSeries } from "./arc-bar";

export default defineComponent({
	name: "VHorizontalBarProp",
	props: {
		com: {
			type: Object as PropType<ArcBar>,
			required: true
		}
	},
	setup(props) {
		const config = toRef(props.com, "config");

		const handleAddSeriesItem = () => {
			return new ArcBarSeries(`系列${config.value.series.length + 1}`);
		};

		return {
			config,
			handleAddSeriesItem,

			fontFamilys,
			echartsLabelPositions,
			fontWeights,
			axisTypes,
			titleLocations,
			lineStyles,
			timeFormats,
			hAligns,
			valueFormats,
			legendLocations,
			orients,
			legendIcons,
			fillTypes,
			animationEasings
		};
	}
});
</script>
