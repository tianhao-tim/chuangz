<template>
	<div class="flex w-full h-full min-h-24 justify-center items-center">
		<el-button icon="Plus" v-contextmenu:contextmenu="{ trigger: ['click'] }">添加组件</el-button>
		<v-contextmenu ref="contextmenu">
			<v-contextmenu-submenu :title="menu.title" v-for="menu in list" :key="menu.componentName">
				<v-contextmenu-item v-for="com in menu.components" :key="com.componentName" @click="handleClickMenu(com)">{{ com.title }}</v-contextmenu-item>
			</v-contextmenu-submenu>
		</v-contextmenu>
	</div>
</template>

<script setup lang="ts" name="addComponent">
import { createComponentConfig, list } from "../../../editor/header/componentList";

const emits = defineEmits(["add"]);

const handleClickMenu = async (com: any) => {
	const config = await createComponentConfig(com.type, com.componentName);
	emits("add", config);
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
import { directive, Contextmenu, ContextmenuItem, ContextmenuDivider, ContextmenuSubmenu, ContextmenuGroup } from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";

export default defineComponent({
	components: {
		[Contextmenu.name]: Contextmenu,
		[ContextmenuItem.name]: ContextmenuItem,
		[ContextmenuDivider.name]: ContextmenuDivider,
		[ContextmenuSubmenu.name]: ContextmenuSubmenu,
		[ContextmenuGroup.name]: ContextmenuGroup
	},
	directives: {
		contextmenu: directive
	}
});
</script>

<style scoped lang="scss"></style>
