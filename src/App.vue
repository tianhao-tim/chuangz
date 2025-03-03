<template>
	<el-config-provider :size="size" :z-index="zIndex" :locale="locale">
		<router-view />
	</el-config-provider>
</template>

<script>
import { defineComponent, onBeforeMount } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import setIntroduction from "@/utils/setIconfont";

export default defineComponent({
	components: {
		ElConfigProvider
	},
	setup() {
		// 设置初始化，防止刷新时恢复默认
		onBeforeMount(() => {
			// 设置批量第三方 icon 图标
			setIntroduction.cssCdn();
			// 设置批量第三方 js
			setIntroduction.jsCdn();
		});

		console.log("当前版本：1.0.0");
		return {
			locale: zhCn,
			zIndex: 3000,
			size: "default"
		};
	}
});
</script>
<style></style>
