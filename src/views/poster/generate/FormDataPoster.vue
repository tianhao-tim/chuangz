<template>
	<div class="form-data-poster-wrapper">
		<div v-html="descTextHtml"></div>
		<div class="poster-image">
			<el-image style="width: 90%; height: 90%" :src="posterImageUrl" fit="scale-down" :preview-src-list="[posterImageUrl]" />
		</div>
		<div class="flex-center">
			<el-button type="primary" @click="downloadPosterImage" size="small" icon="Download">下载</el-button>
		</div>
	</div>
</template>

<script setup lang="ts" name="FormDataPoster">
import { onMounted, ref } from "vue";
import { generateFormDataPoster } from "@/api/modules/poster";
import { ElLoading } from "element-plus";
import { useRoute } from "vue-router";
import axios from "axios";
const route = useRoute();

const linkKey = route.params.linkKey as string;
const dataId = route.query.dataId as any;

const posterImageUrl = ref<string>(null);
const descTextHtml = ref<string>(null);

onMounted(() => {
	const loadingInstance = ElLoading.service({
		fullscreen: true,
		text: "生成中，请稍后..."
	});
	generateFormDataPoster(linkKey, dataId).then((res: any) => {
		if (res.data) {
			const { imageUrl, descText } = res.data;
			posterImageUrl.value = imageUrl;
			descTextHtml.value = `${descText}`;
			loadingInstance.close();
		}
	});
});

const downloadPosterImage = () => {
	axios.get(posterImageUrl.value, { responseType: "blob" }).then(res => {
		const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
		const link = document.createElement("a");
		link.href = downloadUrl;
		link.setAttribute("download", "poster.png");
		document.body.appendChild(link);
		link.click();
		link.remove();
	});
};
</script>

<style scoped lang="scss">
.form-data-poster-wrapper {
	padding: 50px;
}
.poster-image {
	display: flex;
	justify-content: center;
	margin-top: 20px;
	height: 50vh;
	width: 100%;
}
</style>
