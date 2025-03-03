<template>
	<div
		class="datav-gui g-color-picker"
		:class="[
			`--${size}`,
			{
				'--inline': !!inline,
				'--single': inline === 'inline-single'
			}
		]"
	>
		<div class="g-color-picker__inner">
			<el-input :model-value="modelValue" :size="size" @update:model-value="handleInput" />
			<el-color-picker
				:model-value="modelValue"
				:size="size"
				:show-alpha="showAlpha"
				:predefine="predefine"
				popper-class="is-dark"
				@update:model-value="handleInput"
			/>
		</div>
		<span v-if="label" class="g-input__caption">
			{{ label }}
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UPDATE_MODEL_EVENT } from "../../../../utils/constants";

export default defineComponent({
	name: "GColorPicker",
	props: {
		modelValue: {
			type: String,
			required: true
		},
		showAlpha: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			default: "small"
		},
		predefine: Array,
		label: {
			type: String,
			default: ""
		},
		inline: {
			type: [Boolean, String],
			default: false
		}
	},
	emits: [UPDATE_MODEL_EVENT],
	setup(props, ctx) {
		const handleInput = (value: number) => {
			ctx.emit(UPDATE_MODEL_EVENT, value);
		};

		return {
			handleInput
		};
	}
});
</script>
<style lang="scss" scoped>
@import "color-picker";
</style>
