<template>
	<div class="setting-panel-gui">
		<g-field :level="2" label="边框宽度">
			<g-input-number v-model="config.borderWidth" :min="0" />
		</g-field>
		<g-field :level="2" label="边框间隙">
			<g-input-number v-model="config.borderGap" :min="0" />
		</g-field>
		<g-field :level="2" label="线条间隙">
			<g-input-number v-model="config.lineDash" :min="0" />
		</g-field>
		<g-field :level="2" label="文字颜色">
			<g-color-picker v-model="config.textColor" />
		</g-field>
		<g-field :level="2" label="边框半径">
			<g-input-number v-model="config.borderRadius" :min="0" />
		</g-field>
		<g-field :level="2" label="局部渐变">
			<el-switch v-model="config.localGradient" />
		</g-field>
		<g-field :level="2" label="信息格式化	">
			<g-input v-model="config.formatter" />
		</g-field>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from "vue";
import { PercentPond } from "./percent-pond";

export default defineComponent({
	name: "VPercentPondProp",
	props: {
		com: {
			type: Object as PropType<PercentPond>,
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
