<template>
	<div class="setting-panel-gui">
		<g-field label="表行数" flat>
			<g-input-number v-model="config.rowNum" :min="1" :max="10" :step="1" />
		</g-field>
		<g-field label="数值单位" flat>
			<g-input v-model="config.unit" />
		</g-field>
		<g-field label="轮播方式">
			<el-radio-group v-model="config.carousel">
				<el-radio-button label="single">单行</el-radio-button>
				<el-radio-button label="page">整页</el-radio-button>
			</el-radio-group>
		</g-field>
		<g-field label="轮播时间间隔">
			<g-slider v-model="config.waitTime" :min="1000" :max="3000" :step="100" suffix="ms" />
		</g-field>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from "vue";
import { TableBar } from "./table-bar";

export default defineComponent({
	name: "VTableBarProp",
	props: {
		com: {
			type: Object as PropType<TableBar>,
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
