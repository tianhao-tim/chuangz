<template>
	<div>
		<el-select
			v-model="stateData.selectValue"
			@change="handleSelectionChange"
			clearable
			popper-class="page-select-popper"
			v-bind="{ ...selectProps }"
		>
			<template #empty>
				<div class="empty-wrap">
					<el-input size="small" v-model="stateData.filterName" clearable placeholder="请输入名称进行查询" @input="handleFilterName" />
					<div class="table-empty">
						<img src="@/assets/images/notData.png" alt="notData" />
						<div>暂无数据</div>
					</div>
				</div>
			</template>
			<div class="query-input-wrap">
				<el-input
					class="query-input"
					size="small"
					v-model="stateData.filterName"
					clearable
					placeholder="请输入名称进行查询"
					@input="handleFilterName"
				/>
			</div>
			<el-option
				v-for="item in stateData.options"
				:key="item.value"
				:label="item.label"
				:value="item.value"
				:style="{ width: `${optionMaxWidth}px` }"
			></el-option>
			<el-pagination
				class="mt10"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="stateData.currentPage"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="stateData.pageSize"
				layout="prev, pager, next"
				hide-on-single-page
				small
				:total="stateData.total"
			></el-pagination>
		</el-select>
	</div>
</template>

<script setup lang="ts" name="PaginationSelect">
import { reactive, watch, onMounted } from "vue";
import { debounce } from "lodash-es";

interface PaginationProps {
	// 选中值
	modelValue: string;
	// 选项最大宽度
	optionMaxWidth?: number;
	// 获取数据的参数
	queryPageParams: any;
	// 获取数据方法
	getPageData: (params: any) => Promise<any>;
	// option 取值字段名
	optionProps: {
		label: string;
		value: string;
	};
	selectProps?: any;
}

const props = defineProps<PaginationProps>();
const emit = defineEmits(["update:modelValue", "change"]);
const stateData = reactive({
	selectValue: props.modelValue,
	filterName: "",
	currentPage: 1,
	pageSize: 10,
	total: 100,
	options: []
});

watch(
	() => props.queryPageParams,
	() => {
		fetchData();
	},
	{ deep: true }
);

const handleSelectionChange = val => {
	emit("update:modelValue", val);
	emit("change", val);
};
const handleSizeChange = (pageSize: number) => {
	stateData.pageSize = pageSize;
	fetchData(true);
};
const handleCurrentChange = (page: number) => {
	stateData.currentPage = page;
	fetchData(true);
};
const handleFilterName = debounce(() => {
	fetchData(true);
}, 250);

const fetchData = (inputSearch: boolean = false) => {
	let params = {};
	if (!inputSearch) {
		params = { ...props.queryPageParams };
	}
	props.getPageData({ ...params, current: stateData.currentPage, name: stateData.filterName, size: stateData.pageSize }).then(res => {
		const { records, total } = res.data;
		stateData.options = records.map((item: any) => ({
			value: item[props.optionProps.value || "value"],
			label: item[props.optionProps.label || "label"]
		}));
		stateData.total = total;
	});
};
onMounted(() => {
	fetchData();
});
</script>
<style lang="scss" scoped>
.empty-wrap {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 3px;
	.table-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 20px;
		img {
			width: 50px;
			height: 30px;
		}
	}
}
.query-input-wrap {
	padding: 3px;
}
</style>
