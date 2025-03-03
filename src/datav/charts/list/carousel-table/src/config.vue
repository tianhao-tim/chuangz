<template>
	<div class="setting-panel-gui">
		<g-field-collapse label="行号" toggle v-model="config.index">
			<g-field label="表头" flat>
				<g-input v-model="config.indexHeader" inline="inline" label="行号文字" />
				<g-input-number v-model="config.indexWidth" :min="1" :max="100" :step="1" inline="inline" label="行号列宽" />
			</g-field>
			<g-field label="行号对齐">
				<el-radio-group v-model="config.indexAlign" size="small">
					<el-radio-button label="left">左对齐</el-radio-button>
					<el-radio-button label="center">居中</el-radio-button>
					<el-radio-button label="right">右对齐</el-radio-button>
				</el-radio-group>
			</g-field>
		</g-field-collapse>
		<g-field-collapse label="通用配置">
			<g-field label="表行数" flat>
				<g-input-number v-model="config.rowNum" :min="1" :max="10" :step="1" />
			</g-field>
			<g-field label="表头高度" flat>
				<g-slider v-model="config.headerHeight" :min="10" :max="50" :step="1" suffix="px" />
			</g-field>
			<g-field label="表头背景">
				<g-color-picker v-model="config.headerBGC" />
			</g-field>
			<g-field label="奇数行背景色">
				<g-color-picker v-model="config.oddRowBGC" />
			</g-field>
			<g-field label="偶数行背景色">
				<g-color-picker v-model="config.evenRowBGC" />
			</g-field>
			<g-field label="轮播方式">
				<el-radio-group v-model="config.carousel">
					<el-radio-button label="single">单行</el-radio-button>
					<el-radio-button label="page">整页</el-radio-button>
				</el-radio-group>
			</g-field>
			<g-field label="轮播时间间隔">
				<g-slider v-model="config.waitTime" :min="1000" :max="3000" :step="100" suffix="ms" />
			</g-field>
			<g-field label="悬停暂停轮播">
				<div class="pt-5">
					<el-switch v-model="config.hoverPause" />
				</div>
			</g-field>
		</g-field-collapse>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from "vue";
import { CarouselTable } from "./carousel-table";

export default defineComponent({
	name: "VCarouselTableProp",
	props: {
		com: {
			type: Object as PropType<CarouselTable>,
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
