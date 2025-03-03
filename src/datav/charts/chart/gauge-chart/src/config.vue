<template>
	<div class="setting-panel-gui" />
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from "vue";
import { GaugeChart } from "./gauge-chart";

export default defineComponent({
	name: "VGaugeChartProp",
	props: {
		com: {
			type: Object as PropType<GaugeChart>,
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
