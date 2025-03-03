<template>
	<a class="drop-list-item" href="javascript:;" @click="handleClick">
		<i v-if="icon" :class="icon" />
		<span class="drop-text" :class="icon ? '' : ' --no-icon'">
			<slot />
		</span>
	</a>
</template>
<script lang="ts">
import { defineComponent, inject } from "vue";

export default defineComponent({
	name: "GDropListItem",
	props: {
		icon: String
	},
	setup() {
		const handleClick = inject("hidePopover") as () => void;

		return {
			handleClick
		};
	}
});
</script>
