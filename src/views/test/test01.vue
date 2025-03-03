<template>
	{{ modelValue }}
	<pagination-select v-model="modelValue" :getPageData="getFormPageList" :query-page-params="params" :option-props="optionProps" />
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import PaginationSelect from "@/components/PaginationSelect/index.vue";
import { getFormPageList } from "@/api/modules/form";
const modelValue = ref();
const params = reactive({
	formKey: ""
});
const optionProps = reactive({
	label: "textName",
	value: "formKey"
});
</script>

<style>
.parent {
	width: 200px;
	height: 200px;
	position: absolute;
	top: 100px;
	left: 100px;
	border: 1px solid #000;
	user-select: none;
}
</style>
