<template>
	<g-field-collapse label="轮播" expand>
		<g-field :level="2" label="自动切换">
			<el-switch v-model="config.autoplay" />
		</g-field>
		<g-field :level="2" label="轮播时间：ms">
			<g-input-number v-model="config.interval" :min="1" size="small"></g-input-number>
		</g-field>
		<g-field :level="2" label="轮播样式">
			<el-radio-group v-model="config.type" size="small">
				<el-radio-button label="">默认</el-radio-button>
				<el-radio-button label="card" :disabled="config.direction === 'vertical'">卡片</el-radio-button>
			</el-radio-group>
		</g-field>
		<g-field :level="2" label="方向">
			<el-radio-group v-model="config.direction" size="small">
				<el-radio-button label="vertical" :disabled="config.type === 'card'">垂直</el-radio-button>
				<el-radio-button label="horizontal">水平</el-radio-button>
			</el-radio-group>
		</g-field>
	</g-field-collapse>
	<el-divider>数据</el-divider>
	<div>
		<draggable v-model="datasetList" tag="div" item-key="id" handle=".handle">
			<template #item="{ element }">
				<div class="flex flex-row items-center pa-1">
					<div style="width: 20%">
						<el-icon class="handle cursor-pointer">
							<Operation />
						</el-icon>
					</div>
					<div>
						<el-row :gutter="10" class="mt5">
							<el-col :span="20">
								<el-input v-model="element.name" size="small" />
							</el-col>
							<el-col :span="2">
								<el-button type="danger" :icon="Delete" size="small" circle />
							</el-col>
							<el-col :span="20">
								<el-input v-model="element.image" size="small" />
							</el-col>
							<el-col :span="2">
								<el-upload
									ref="uploadRef"
									:action="uploadHost"
									:headers="uploadHeaders"
									:on-progress="openUploadLoading"
									:on-success="response => handleUploadSuccess(response, element)"
									:show-file-list="false"
									accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP"
								>
									<template #trigger>
										<el-button type="primary" :icon="UploadFilled" size="small" circle />
									</template>
								</el-upload>
							</el-col>
						</el-row>
					</div>
				</div>
			</template>
		</draggable>
		<div class="flex items-center justify-center mt10">
			<el-link :icon="Plus" type="primary" :underline="false" @click="handleAddItem">增加选项</el-link>
		</div>
	</div>
</template>

<script setup lang="ts" name="CarouselConfig">
import { PropType, computed, toRefs } from "vue";
import { DashboardComponent } from "@/views/dashboard/components/types";
import { uploadHost, uploadHeaders, openUploadLoading, closeLoading } from "@/utils/uploadUtil";
import { Delete, UploadFilled, Operation, Plus } from "@element-plus/icons-vue";
import draggable from "vuedraggable";

const props = defineProps({
	chartConfig: {
		type: Object as PropType<DashboardComponent>,
		required: true
	}
});

const config = computed(() => {
	return props.chartConfig.config;
});

const { list: datasetList } = toRefs(props.chartConfig.config?.dataset);

const handleUploadSuccess = (response: any, item: any) => {
	item.image = response.data;
	closeLoading();
};
const handleAddItem = () => {
	datasetList.value.push({
		id: new Date().getTime(),
		name: "",
		image: ""
	});
};
</script>
<style scoped lang="scss"></style>
