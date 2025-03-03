<template>
	<textarea :id="tinymceId" style="visibility: hidden" />
</template>

<script setup lang="ts">
import { defineProps, ref, watch, onMounted, onUnmounted } from "vue";
import { plugins, toolbar } from "./config";
import { AUTH_HEADER_NAME, getToken } from "@/utils/auth";
import { generateId } from "@/utils";
import { getApiBasePath, getBasePath } from "@/utils/url";
import { useScriptTag } from "@vueuse/core";
const props = defineProps({
	modelValue: {
		type: String,
		required: true,
		default: ""
	},
	toolbar: {
		type: Array,
		required: false,
		default: () => null
	}
});

const editorInstance = ref();

const tinymceId = ref(`tinymce${+new Date()}${generateId()}`);
const emits = defineEmits(["update:modelValue", "init", "change"]);

onMounted(() => {
	const token = getToken();
	const uploadUrl = `${getApiBasePath()}/user/file/upload`;
	// eslint-disable-next-line global-require
	let conf = {
		selector: `#${tinymceId.value}`,
		language: "zh_CN",
		menubar: "false",
		icons: "tduck",
		skin: "tduck",
		// skin_url: "/tinymce/skins/ui/tduck",
		// content_css: "/tinymce/skins/content/tduck",
		cache_suffix: "?v=0.0.3",
		plugins,
		fontsize_formats: "11px 12px 14px 16px 18px 24px 36px 48px",
		toolbar: props.toolbar ? props.toolbar : toolbar,
		toolbar_drawer: "sliding",
		toolbar_mode: "sliding",
		height: 200,
		// fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
		branding: false,
		object_resizing: false,
		end_container_on_empty_block: true,
		powerpaste_word_import: "clean",
		code_dialog_height: 450,
		code_dialog_width: 1000,
		advlist_bullet_styles: "square",
		advlist_number_styles: "default",
		default_link_target: "_blank",
		entity_encoding: "row", // 所有字符都将以非实体形式保存，避免出现部分符号变成 html 编码
		link_title: false,
		statusbar: false,
		content_style: "img {max-width:100%;}",
		nonbreaking_force_tab: true,
		// 自定义图片上传逻辑
		images_upload_handler(blobInfo, succFun, failFun) {
			const file = blobInfo.blob(); // 转化为易于理解的file对象
			const xhr = new XMLHttpRequest();
			xhr.withCredentials = false;
			xhr.open("POST", uploadUrl);
			xhr.setRequestHeader(AUTH_HEADER_NAME, token);
			xhr.onload = function () {
				if (xhr.status !== 200) {
					failFun(`HTTP Error: ${xhr.status}`);
					return;
				}
				const json = JSON.parse(xhr.responseText);
				if (!json || typeof json.data !== "string") {
					failFun(`Invalid JSON: ${xhr.responseText}`);
					return;
				}
				succFun(json.data);
			};
			const formData = new FormData();
			formData.append("file", file, file.name); // 此处与源文档不一样
			xhr.send(formData);
		},
		setup: editor => {
			editorInstance.value = editor;
			onInited(editor);
		},
		init_instance_callback(editor) {
			if (props.modelValue) editor.setContent(props.modelValue);
		}
	};
	const { load } = useScriptTag(
		getBasePath() + "/tinymce/tinymce.min.js",
		// on script tag loaded.
		() => {
			console.log(getTinymce());
			console.log("tinymce loaded");
			// conf = Object.assign(conf, useAttrs());
			getTinymce().init(conf);
			// change input undo redo keyup
		},
		{ manual: true }
	);
	load();
});

const onInited = editor => {
	// change input undo redo keyup
	editor.on("change input undo redo", e => {
		onChanged(e, editor);
	});
	emits("init", editor);
};

const onChanged = (e, editor) => {
	if (!editor) editor = editorInstance.value.editor;

	const content = editor.getContent();
	emits("update:modelValue", content);
	emits("change", content);
};

watch(
	() => props.modelValue,
	(val, oldVal) => {
		if (!editorInstance.value || !editorInstance.value.initialized) return;
		if (oldVal === val || val === editorInstance.value.getContent()) return;
		editorInstance.value.setContent(val);
	}
);

const getTinymce = () => {
	const root = typeof window !== "undefined" ? window : null;
	return root && "tinymce" in root ? root.tinymce : null;
};

onUnmounted(() => {
	if (!window.tinymce) return;
	const tinymceInstance = window.tinymce.get(tinymceId);
	if (tinymceInstance) {
		tinymceInstance.destroy();
	}
});
</script>
<style>
/* 在el-dialog中tinymce z-index 被太小而被遮挡时要加这两句 */
.tox-tinymce-aux {
	z-index: 99999 !important;
}

.tinymce.ui.FloatPanel {
	z-index: 99;
}
</style>
