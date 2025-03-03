<template>
	<el-popover :placement="placement" :trigger="trigger" width="auto" popper-class="drop-list-popover">
		<template #reference>
			<slot />
		</template>
		<slot name="droplist" />
	</el-popover>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
	name: "GDropListPopover",
	props: {
		trigger: {
			type: String,
			default: "click"
		},
		placement: {
			type: String,
			default: "bottom"
		}
	},
	setup() {
		const visible = ref(false);

		return {
			visible
		};
	}
});
</script>
