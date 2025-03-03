<template>
	<div class="wrap">
		<el-drawer v-model="drawer" title="I am the title" direction="ltr" :close-on-click-modal="false">
			<DsFormEditor />
			<el-button @click="refreshData">Close</el-button>
		</el-drawer>
		<component :is="com.name" :com="com" style="margin-left: 500px" />
	</div>
</template>

<script lang="ts" setup>
import "@/datav/styles/index.scss";
import { ref, watch, provide, toRef } from "vue";
import DsFormEditor from "@/datav/screen-editor/config-panel/data-center-panel/api-editors/ds-form-editor.vue";
import { setComponentData } from "@/datav/mixins/useDataCenter";
// import BasicRing from "@/datav/charts/pie/basic-ring/src/basic-ring";
// import VBasicRing from "@/datav/charts/pie/basic-ring/src/index.vue";

// let basicRing = new BasicRing();
// basicRing.initData();
// basicRing.loadData();

// console.log(basicRing);

const com = ref({
	id: "PieOneValue_fR5KhxXen",
	name: "VPieOneValue",
	type: "com",
	alias: "指标占比饼图",
	icon: "v-icon-chart-pie",
	img: "http://localhost:3000/com-thum/pie-one-value-368-208.png",
	locked: false,
	hided: false,
	selected: true,
	hovered: false,
	renameing: false,
	attr: {
		x: 594,
		y: 388,
		w: 350,
		h: 150,
		deg: 0,
		opacity: 1,
		filpV: false,
		filpH: false
	},
	projectId: 0,
	config: {
		global: {
			fontFamily: "Microsoft Yahei",
			radius: ["90%", "75%"],
			roseType: false,
			borderRadius: 5
		},
		label: {
			show: true,
			position: "outside",
			textStyle: {
				fontSize: 12,
				color: "rgba(255, 255, 255, 0.6)",
				fontWeight: "normal"
			},
			formatter: "",
			alignTo: "none",
			bleedMargin: 10,
			distanceToLabelLine: 5
		},
		legend: {
			show: true,
			position: "bottom-center",
			orient: "horizontal",
			textStyle: {
				fontSize: 12,
				color: "#90a0ae",
				fontWeight: "normal"
			},
			symbol: {
				show: true,
				icon: "auto",
				width: 25,
				height: 14,
				gap: 10
			}
		},
		tooltip: {
			show: true,
			textStyle: {
				fontSize: 14,
				color: "#fff",
				fontWeight: "normal"
			},
			background: {
				padding: {
					h: 5,
					v: 5
				},
				color: "rgba(0, 0, 0, 0.65)"
			}
		},
		colors: ["#0a73ff", "#43ccff", "#3dabff", "#a0a7e6", "#c4ebad", "#96dee8"],
		series: [
			{
				type: "pie",
				id: "uB_BLv4NNo",
				name: ""
			}
		],
		animation: {
			enabled: true,
			duration: 1000,
			easing: "cubicOut",
			delay: 0
		}
	},
	apis: {
		source: {
			render: "render",
			description: "基本折线图接口",
			useAutoUpdate: false,
			autoUpdate: 1
		}
	},
	apiData: {
		source: {
			comId: "PieOneValue_fR5KhxXen",
			id: "vqrW1pfu2k",
			type: "form",
			config: {
				useFilter: false,
				data: '{\r\n  "label": "人数增涨",\r\n  "value": 40,\r\n  "total": 80\r\n}',
				formConfig: {
					formKey: "",
					indexName: "",
					index: [],
					dimension: []
				}
			}
		}
	},
	events: {
		click: {
			description: "当点击数据项时"
		}
	},
	actions: {}
});

watch(com, () => {
	refreshData();
});

const refreshData = async () => {
	console.log("aaa");
	await setComponentData(com.value.id, "PieOneValue_fR5KhxXen", com.value.apis.source, com.value.apiData.source);
};
// const apiDataConfig = reactive({
// 	config: {
// 		formConfig: {
// 			formKey: "eCElVrCt",
// 			indexName: "form_index_8230",
// 			index: [],
// 			dimension: []
// 		}
// 	}
// });

provide("apiDataConfig", toRef(com.value.apiData, "source"));

const drawer = ref(true);
</script>
<style scoped>
.wrap {
	background-color: #0f2a42;
	height: 100%;
}
</style>
