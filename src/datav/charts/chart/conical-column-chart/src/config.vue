<template>
	<div class="setting-panel-gui">
		<g-field :level="2" label="文字大小">
			<g-input-number v-model="config.fontSize" :min="0" />
		</g-field>
		<g-field :level="2" label="图片边长">
			<g-input-number v-model="config.imgSideLength" :min="0" />
		</g-field>
		<g-field :level="2" label="文字颜色">
			<g-color-picker v-model="config.textColor" />
		</g-field>
		<g-field :level="2" label="柱颜色">
			<g-color-picker v-model="config.columnColor" />
		</g-field>

		<g-field :level="2" label="显示数值">
			<el-switch v-model="config.showValue" />
		</g-field>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from "vue";
import { ConicalColumnChart } from "./conical-column-chart";

export default defineComponent({
	name: "VPercentPondProp",
	props: {
		com: {
			type: Object as PropType<ConicalColumnChart>,
			required: true
		}
	},
	setup(props) {
		const config = toRef(props.com, "config");

		return {
			config
		};
	}
});
</script>
