<template>
	<div class="setting-panel-gui">
		<g-field label="形状">
			<el-radio-group v-model="config.shape">
				<el-radio-button v-for="em in shapes" :key="em.value" :label="em.value">{{ em.label }}</el-radio-button>
			</el-radio-group>
		</g-field>
		<g-field :level="2" label="波浪数量">
			<g-input-number v-model="config.waveNum" :min="0" />
		</g-field>
		<g-field :level="2" label="波浪高度">
			<g-input-number v-model="config.waveHeight" :min="0" />
		</g-field>
		<g-field :level="2" label="波浪透明度">
			<g-input-number v-model="config.waveOpacity" :min="0" />
		</g-field>
		<g-field :level="2" label="信息格式化	">
			<g-input v-model="config.formatter" />
		</g-field>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from "vue";
import { WaterLevelPond } from "./water-level-pond";

export default defineComponent({
	name: "VWaterLevelPondProp",
	props: {
		com: {
			type: Object as PropType<WaterLevelPond>,
			required: true
		}
	},
	setup(props) {
		const config = toRef(props.com, "config");
		const shapes = [
			{
				value: "circle",
				label: "矩形"
			},
			{
				value: "roundRect",
				label: "圆角矩形"
			},
			{
				value: "round",
				label: "圆形"
			}
		];

		return {
			config,
			shapes
		};
	}
});
</script>
