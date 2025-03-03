<template>
	<div class="poster-editor-container">
		<div class="header">
			<poster-header />
		</div>
		<div class="main-container">
			<div class="aside-container">
				<poster-aside />
			</div>
			<div class="content-container">
				<poster-main class="edit-container" />
				<poster-config class="config-container" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="PosterEditor">
import PosterAside from "./aside/index.vue";
import PosterHeader from "./header/index.vue";
import PosterMain from "./main/index.vue";
import PosterConfig from "./config/index.vue";
</script>

<style scoped lang="scss">
.poster-editor-container {
	background-color: var(--el-bg-color-overlay);
	height: 100%;
	overflow: hidden;

	.header {
		height: 59px;
		border-bottom: var(--el-border);
	}

	.main-container {
		height: calc(100% - 59px);
		display: flex;
		flex-direction: row;
		.aside-container {
			height: 100%;
			width: 420px;
			border-right: var(--el-border);
		}

		.content-container {
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: row;
		}

		.edit-container {
			width: 80%;
			height: 100%;
		}

		.config-container {
			width: 20%;
			height: 100%;
		}
	}
}
</style>
