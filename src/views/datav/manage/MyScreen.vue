<template>
	<div class="my-screen">
		<div class="screen">
			<div class="screen-info">
				<div class="screen-img" :style="thumbnailStyle"></div>
				<div class="screen-edit">
					<div class="screen-button">
						<router-link :to="{ name: 'DesignScreen', params: { screenKey: screen.shareKey } }" class="edit-wrap">
							<el-button type="primary" size="small">
								<i class="tduck icon-edit"></i>
								编辑
							</el-button>
						</router-link>
						<div class="main-button">
							<el-tooltip placement="bottom" effect="light" :show-after="1000" content="修改">
								<span class="button-span" @click="handleUpdateScreen">
									<i class="tduck icon-xiugai"></i>
								</span>
							</el-tooltip>
							<el-tooltip placement="bottom" effect="light" :show-after="1000" content="复制">
								<span class="button-span" @click="confirmCopyProject">
									<i class="tduck icon-fuzhi"></i>
								</span>
							</el-tooltip>
							<el-tooltip placement="bottom" effect="light" :show-after="1000" content="删除">
								<span class="button-span" @click="confirmDeleteProject">
									<i class="tduck icon-shanchu"></i>
								</span>
							</el-tooltip>
						</div>
					</div>
					<router-link :to="{ name: 'Screen', params: { screenKey: screen.shareKey } }" target="_blank" class="preview">
						<el-tooltip placement="bottom" effect="light" :show-after="1000" content="预览">
							<i class="tduck icon-zitiyulan"></i>
						</el-tooltip>
					</router-link>
					<div class="public" @click="doPublish">
						<el-tooltip placement="bottom" effect="light" :show-after="1000" content="发布">
							<i class="tduck icon-fabu"></i>
						</el-tooltip>
					</div>
				</div>
			</div>
			<div class="screen-main">
				<div class="main-name">
					<el-tooltip :content="screen.name" placement="top" effect="light" :show-after="1000">
						<div class="screen-name-input">
							<input v-model.trim="screenName" class="input" @blur="onInputBlur" />
						</div>
					</el-tooltip>
					<div class="publish-info">
						<span class="dot" :class="{ published: publishState.published }"></span>
						<span>{{ publishState.text }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, inject, PropType, ref, toRefs } from "vue";
import { MessageBoxUtil, MessageUtil } from "@/utils/messageUtil";
import { Screen } from "@/datav/types/project";
import * as api from "@/api/modules/screen";

const props = defineProps({
	screen: {
		type: Object as PropType<Screen>,
		required: true
	}
});
const emit = defineEmits(["refresh", "update"]);

const { id, name, shareKey, status, thumbnail } = toRefs(props.screen);
const screenName = ref(name.value);
const oldScreenName = ref(name.value);

const thumbnailStyle = computed(() => {
	if (thumbnail.value) {
		return {
			"background-image": `url(${thumbnail.value})`
		};
	}
	return {
		"background-image": `url(${window.location.origin}/datav/default-screen.png)`,
		"background-size": "100%",
		"background-position": "center center",
		"background-repeat": "no-repeat"
	};
});

const publishState = computed(() => {
	const published = status.value === 1;
	return {
		published,
		text: published ? "已发布" : "未发布"
	};
});

const onInputBlur = async () => {
	if (screenName.value) {
		try {
			await api.saveScreen({ id: id.value, name: screenName.value });
			name.value = screenName.value;
		} catch (error) {
			MessageUtil.error(MessageUtil.format(error));
		}
	} else {
		screenName.value = oldScreenName.value;
	}
};

const confirmCopyProject = async () => {
	await api.copyScreen(id.value);
	emit("refresh");
};

const confirmDeleteProject = () => {
	MessageBoxUtil.confirmAsync(`<b>${screenName.value}</b> 删除后无法恢复，确认删除？`, async () => {
		await api.deleteScreen(id.value);
		emit("refresh");
	});
};

const publish = inject("publish") as Function;

const doPublish = () => {
	publish(shareKey.value);
};

const handleUpdateScreen = () => {
	emit("update", props.screen, false);
};
</script>

<style lang="scss" scoped>
.my-screen {
	margin: 16px 22px 16px 0;
}

.screen {
	display: flex;
	flex-direction: column;
	width: 258px;
	height: 184px;
	border: 1px solid var(--el-border-color);
	transition: 0.2s;
	box-shadow: var(--el-box-shadow-light);
	border-radius: 8px;

	.screen-info {
		width: 100%;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		.screen-img {
			width: inherit;
			height: 146px;
			background-size: 100% 100%;
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;
		}

		.screen-edit {
			position: absolute;
			opacity: 0;
			display: flex;
			width: 100%;
			height: 100%;
			pointer-events: none;
			align-items: center;
			justify-content: center;
			transition: opacity 0.2s;
			background-color: var(--el-bg-color-overlay);
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;

			.edit-wrap {
				.edit {
					min-width: 116px;
					padding: 0 30px;
					font-size: 16px;
				}
			}

			.main-button {
				display: flex;
				justify-content: space-around;
				font-size: 19px;
				padding-top: 15px;
				align-items: center;
				color: var(--el-color-white);
			}

			.screen-button {
				text-align: center;

				.button-span {
					padding: 0 10px;
					white-space: nowrap;
					cursor: pointer;
					transition: color 0.2s;
					color: var(--el-color-primary);

					&:hover {
						color: var(--el-color-primary);
					}

					.iconfont {
						font-size: 16px;
					}
				}
			}

			.preview {
				position: absolute;
				top: 10px;
				right: 35px;
			}

			.public {
				position: absolute;
				top: 10px;
				right: 10px;
				color: var(--el-color-primary);
				cursor: pointer;
				transition: color 0.2s;
			}

			.preview,
			.public {
				color: var(--el-color-primary);
				cursor: pointer;
				transition: color 0.2s;

				&:hover {
					color: var(--el-color-primary);
				}
			}
		}
	}

	&:hover {
		border: var(--el-border);

		.screen-info {
			.screen-edit {
				opacity: 0.8;
				pointer-events: all;
			}
		}
	}

	.screen-main {
		.main-name {
			height: 36px;
			display: flex;
			align-items: center;
			position: relative;
			justify-content: space-between;
			color: #fff;
			padding: 0 10px;

			.screen-name-input {
				cursor: pointer;
				font-size: 14px;
				color: #303133;
				display: flex;
				align-items: center;
				flex: 1;

				.input {
					width: 120px;
					color: var(--el-text-color-primary);
					background: 0 0;
					padding: 0 5px;
					line-height: 28px;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					outline: none;
					border: 1px solid transparent;

					&:hover {
						color: var(--el-text-color-primary);
					}

					&:focus {
						border: 1px solid var(--el-color-primary);
					}
				}
			}

			.publish-info {
				align-items: center;
				display: flex;
				color: var(--el-text-color-secondary);

				.dot {
					content: "";
					margin-right: 5px;
					display: inline-block;
					width: 8px;
					height: 8px;
					border-radius: 5px;
					background-color: var(--el-color-primary);

					&.published {
						background-color: var(--el-color-success);
					}
				}
			}
		}
	}
}
</style>
