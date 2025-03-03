<template>
	<div class="setting-panel-gui">
		<g-field label="视屏地址">
			<g-input v-model="config.videoSrc" />
		</g-field>
		<g-field label="循环播放">
			<el-switch v-model="config.loop" />
		</g-field>
		<g-field label="静音">
			<el-switch v-model="config.muted" />
		</g-field>
		<g-field label="样式">
			<el-select v-model="config.objectFit">
				<el-option label="填充" value="fill" />
				<el-option label="适应" value="contain" />
				<el-option label="覆盖" value="cover" />
				<el-option label="缩放" value="scale-down" />
				<el-option label="平铺" value="none" />
			</el-select>
		</g-field>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from "vue";
import { MainVideo } from "./main-video";

export default defineComponent({
	name: "VMainVideoProp",
	props: {
		com: {
			type: Object as PropType<MainVideo>,
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
