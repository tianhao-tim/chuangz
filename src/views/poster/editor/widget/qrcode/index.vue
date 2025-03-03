<template>
	<qrcode-vue
		class="qrcode"
		:value="widgetConfig.url"
		:size="widgetConfig.width"
		:level="widgetConfig.level"
		:margin="widgetConfig.margin"
		:background="widgetConfig.bgColor"
		:foreground="widgetConfig.fgColor"
	/>
</template>

<script setup lang="ts" name="QrcodeWidget">
import { PropType } from "vue";
import QrcodeVue from "qrcode.vue";
import { QrcodeWidget } from "@/views/poster/editor/widget/qrcode/qrcodeWidget";

defineProps({
	widgetConfig: {
		type: Object as PropType<QrcodeWidget>,
		required: true
	}
});
</script>

<style scoped lang="scss">
.qrcode {
	user-select: none;
	height: 100%;
	width: 100%;
}
</style>
