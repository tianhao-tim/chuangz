<template>
	<div
		class="datav-gui g-input-number"
		:class="[
			`--${size}`,
			{
				'--inline': !!inline,
				'--single': inline === 'inline-single',
				'has-suffix': !!suffix
			}
		]"
	>
		<el-input-number
			:model-value="modelValue"
			:size="size"
			:min="min"
			:max="max"
			:step="step"
			class="is-controls-right"
			@update:model-value="handleInput"
			@change="handleChange"
		/>
		<span v-if="label" class="g-input__caption">
			{{ label }}
		</span>
		<span v-if="suffix" class="g-input-number__suffix">
			{{ suffix }}
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UPDATE_MODEL_EVENT } from "../../../../utils/constants";

export default defineComponent({
	name: "GInputNumber",
	props: {
		modelValue: {
			type: Number,
			default: 0
		},
		label: {
			type: String,
			default: ""
		},
		size: {
			type: String,
			default: "small"
		},
		min: {
			type: Number,
			default: -Infinity
		},
		max: {
			type: Number,
			default: Infinity
		},
		step: {
			type: Number,
			default: 1
		},
		inline: {
			type: [Boolean, String],
			default: false
		},
		suffix: String
	},
	emits: [UPDATE_MODEL_EVENT, "change"],
	setup(props, ctx) {
		const handleInput = (value: number) => {
			ctx.emit(UPDATE_MODEL_EVENT, value);
		};

		const handleChange = (currentValue: number, oldValue: number) => {
			ctx.emit("change", currentValue, oldValue);
		};

		return {
			handleInput,
			handleChange
		};
	}
});
</script>
<style lang="scss" scoped>
@import "input-number";
</style>
