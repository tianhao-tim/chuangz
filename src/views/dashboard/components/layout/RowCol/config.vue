<template>
	<g-field-collapse label="行布局" expand>
		<g-field :level="2" label="分栏间隔">
			<g-input-number v-model="config.gutter" />
		</g-field>
	</g-field-collapse>
	<el-divider>列</el-divider>
	<div>
		<draggable v-model="colList" tag="div" item-key="id" handle=".handle">
			<template #item="{ element, index }">
				<div class="flex flex-row items-center pa-1">
					<div style="width: 20%">
						<el-icon class="handle cursor-pointer">
							<Operation />
						</el-icon>
					</div>
					<div>
						<g-input-number v-model="element.span" :min="1" />
					</div>
					<div class="ml5 w-60px">
						<el-button type="danger" :icon="Delete" size="small" circle @click="handleDeleteCol(index)" />
					</div>
				</div>
			</template>
		</draggable>
		<div class="flex items-center justify-center mt10" v-if="getSumColSpan < 24">
			<el-link :icon="Plus" type="primary" :underline="false" @click="handleAddItem">增加列</el-link>
		</div>
	</div>
</template>

<script setup lang="ts" name="TabsConfig">
import { PropType, computed, toRefs } from "vue";
import draggable from "vuedraggable";
import { Plus, Delete } from "@element-plus/icons-vue";
import { DashboardComponent } from "@/views/dashboard/components/types";
import { otpion } from "./config";

const props = defineProps({
	chartConfig: {
		type: Object as PropType<DashboardComponent>,
		required: true
	}
});

const { colList } = toRefs(props.chartConfig.config);

const config = computed(() => {
	return props.chartConfig.config as typeof otpion;
});

const getSumColSpan = computed(() => {
	return colList.value.reduce((pre, cur) => pre + cur.span, 0);
});

const handleAddItem = () => {
	colList.value.push({
		id: new Date().getTime(),
		span: 2,
		component: []
	});
};

const handleDeleteCol = (index: number) => {
	colList.value.splice(index, 1);
};
</script>
<style scoped lang="scss"></style>
