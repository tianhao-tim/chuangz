<template>
	<el-drawer v-model="drawer" title="I am the title" direction="ltr" :close-on-click-modal="false">
		<DsFormEditor />
	</el-drawer>
</template>

<script lang="ts" setup>
import "@/datav/styles/index.scss";
import { ref, reactive, provide } from "vue";
import DsFormEditor from "@/datav/screen-editor/config-panel/data-center-panel/api-editors/ds-form-editor.vue";

const apiDataConfig = reactive({
	config: {
		formConfig: {
			formKey: "eCElVrCt",
			indexName: "form_index_8230",
			index: [],
			dimension: []
		}
	}
});

provide("apiDataConfig", apiDataConfig);

const drawer = ref(true);
</script>
