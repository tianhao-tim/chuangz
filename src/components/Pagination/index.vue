<template>
	<el-pagination
		:currentPage="pageable.current"
		:page-size="pageable.size"
		:page-sizes="[10, 25, 50, 100]"
		:background="true"
		layout="total, sizes, prev, pager, next, jumper"
		:total="pageable.total"
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
	></el-pagination>
</template>

<script setup lang="ts" name="pagination">
interface Pageable {
	current: number;
	size: number;
	total: number;
}

interface PaginationProps {
	pageable: Pageable;
	handleSizeChange: (size: number) => void;
	handleCurrentChange: (currentPage: number) => void;
}

defineProps<PaginationProps>();
</script>
