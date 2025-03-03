<template>
	<div class="datav-wrapper" :style="wrapperStyle">
		<!-- 重要： -->
		<!--			需要设置-->
		<!--			crossOrigin="anonymous"-->
		<!--			，否则保存画板缩略图会失败-->
		<video
			:style="wrapperStyle"
			ref="vVideoRef"
			class="go-video"
			preload="auto"
			crossOrigin="anonymous"
			playsinline
			autoplay
			:loop="config.loop"
			:muted="config.muted"
			:width="attr.w"
			:height="attr.h"
			:src="config.videoSrc"
		></video>
	</div>
</template>

<script lang="ts" setup>
import { defineComponent, PropType, computed, toRef } from "vue";
import { MainVideo } from "./main-video";

const props = defineProps({
	com: {
		type: Object as PropType<MainVideo>,
		required: true
	}
});

const config = toRef(props.com, "config");
const attr = toRef(props.com, "attr");

const wrapperStyle = computed(() => {
	return {
		transform: "translateZ(0px)",
		width: `${attr.value.w}px`,
		height: `${attr.value.h}px`,
		objectFit: config.value.objectFit
	};
});
</script>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "VMainVideo"
});
</script>
