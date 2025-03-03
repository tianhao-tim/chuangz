<template>
	<div
		id="datav-loading"
		:style="{
			background: 'rgb(15, 42, 66)',
			display: loading ? 'block' : 'none'
		}"
	>
		<a target="_blank" href="javascript:void(0);">
			<img class="datav-logo" :src="`${domain}/datav/datav-loading.gif`" alt="" />
		</a>
	</div>
	<div class="datav-layout" :style="{ visibility: loading ? 'hidden' : 'visible' }">
		<!--    <a-->
		<!--      v-if="pageConfig.useWatermark"-->
		<!--      href="/"-->
		<!--      target="_blank"-->
		<!--      class="datav-watermark"-->
		<!--    >-->
		<!--      <img :src="LOGO" alt="">-->
		<!--    </a>-->
		<div class="scene">
			<div
				v-for="com in coms"
				:key="com.id"
				:style="{
					left: com.attr.x + 'px',
					top: com.attr.y + 'px',
					width: com.attr.w + 'px',
					height: com.attr.h + 'px',
					opacity: com.attr.opacity,
					transform: `rotate(${com.attr.deg}deg) ${com.attr.filpH ? 'scaleX(-1)' : ''} ${com.attr.filpV ? 'scaleY(-1)' : ''}`
				}"
				class="-datav-com absolute"
			>
				<component :is="com.name" :com="com" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { PageConfig } from "@/datav/types/editor";
import { ZoomMode } from "@/datav/types/enums";
import { on, setStyle } from "@/utils/dom";
import { checkPassword, hasPassword, viewScreen } from "@/api/modules/screen";
import { ElMessage, ElMessageBox } from "element-plus";

export default defineComponent({
	name: "Preview",
	props: {
		screenKey: {
			type: [String],
			required: true
		}
	},
	setup(props) {
		const loading = ref(true);
		const screenData = ref();
		const coms = computed(() => screenData.value?.coms);
		const pageConfig = computed(() => screenData.value?.config);
		const domain = window.location.origin;

		const resizeAuto = (width: number, height: number) => {
			const cw = document.documentElement.clientWidth;
			const ch = document.documentElement.clientHeight;
			const ratioX = cw / width;
			const ratioY = ch / height;
			setStyle(document.body, {
				transform: `scale(${ratioX}, ${ratioY})`,
				transformOrigin: "left top",
				backgroundSize: "100% 100%"
			} as CSSStyleDeclaration);
		};

		const resizeWidth = (width: number) => {
			const ratio = document.documentElement.clientWidth / width;
			setStyle(document.body, {
				transform: `scale(${ratio})`,
				transformOrigin: "left top",
				backgroundSize: "100%"
			} as CSSStyleDeclaration);
		};

		const resizeHeight = (width: number, height: number) => {
			const cw = document.documentElement.clientWidth;
			const ch = document.documentElement.clientHeight;
			const ratio = ch / height;
			const gap = (cw - width * ratio) / 2;
			setStyle(document.body, {
				transform: `scale(${ratio})`,
				transformOrigin: "left top",
				backgroundSize: `${(width / cw) * ratio * 100}% 100%`,
				backgroundPosition: `${gap.toFixed(3)}px top`,
				marginLeft: `${gap.toFixed(3)}px`
			} as CSSStyleDeclaration);
		};

		const resizeFull = (width: number, height: number) => {
			const cw = document.documentElement.clientWidth;
			const ch = document.documentElement.clientHeight;
			const ratio = ch / height;
			const gap = (cw - width * ratio) / 2;
			setStyle(document.body, {
				transform: `scale(${ratio})`,
				transformOrigin: "left top",
				backgroundSize: `${(width / cw) * ratio * 100}% 100%`,
				backgroundPosition: `${gap.toFixed(3)}px top`
				// marginLeft: `${gap.toFixed(3)}px`,
			} as CSSStyleDeclaration);

			document.documentElement.style.overflowX = "scroll";
		};

		const resizeNone = () => {
			setStyle(document.body, {
				overflow: "hidden",
				position: "relative"
			} as CSSStyleDeclaration);
		};

		const resize = (config: PageConfig) => {
			switch (config.zoomMode) {
				case ZoomMode.auto:
					resizeAuto(config.width, config.height);
					break;
				case ZoomMode.width:
					resizeWidth(config.width);
					break;
				case ZoomMode.height:
					resizeHeight(config.width, config.height);
					break;
				case ZoomMode.full:
					resizeFull(config.width, config.height);
					break;
				default:
					resizeNone();
					break;
			}
		};

		const initPageInfo = (config: PageConfig) => {
			document.title = screenData.value.name;
			document.querySelector('meta[name="viewport"]').setAttribute("content", `width=${config.width}`);

			setStyle(document.documentElement, {
				overflowX: "hidden",
				overflowY: "visible"
			} as CSSStyleDeclaration);

			setStyle(document.body, {
				width: `${config.width}px`,
				height: `${config.height}px`,
				backgroundImage: `url(${pageConfig.value.bgimage})`,
				backgroundColor: pageConfig.value.bgcolor
			} as CSSStyleDeclaration);

			resize(config);
		};

		const router = useRouter();

		const loadScreen = async () => {
			try {
				// 加载大屏数据
				const { data } = await viewScreen(props.screenKey);
				screenData.value = data;
				if (data) {
					initPageInfo(data.config);

					setTimeout(() => {
						loading.value = false;
					}, 500);

					on(window, "resize", () => {
						resize(pageConfig.value);
					});
				} else {
					to404();
				}
			} catch (error) {
				to404();
			}
		};

		const to404 = () => {
			router.replace({
				name: "404",
				params: { catchAll: "error" }
			});
		};

		const checkPwd = () => {
			ElMessageBox.prompt("请输入访问密码", "提示", {
				confirmButtonText: "确认",
				cancelButtonText: "取消"
			})
				.then(async ({ value }) => {
					const checkRes = await checkPassword(props.screenKey, value);
					if (checkRes.data) {
						await loadScreen();
					} else {
						ElMessage.error("密码错误");
						setTimeout(() => {
							checkPwd();
						}, 500);
					}
				})
				.catch(() => {});
		};

		onMounted(async () => {
			// 检查是否有密码
			const hasPwdRes = await hasPassword(props.screenKey);
			if (hasPwdRes.data) {
				checkPwd();
			} else {
				await loadScreen();
			}
		});

		return {
			loading,
			pageConfig,
			coms,
			domain
		};
	}
});
</script>

<style lang="scss">
html,
body {
	min-width: auto;
}

#datav-loading {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #0f2a42;
	z-index: 2;

	.datav-logo,
	.text-logo {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.datav-logo {
		width: 120px;
	}

	.text-logo {
		margin-top: 73px;
		width: 100px;
	}
}

.datav-layout {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	visibility: hidden;

	.-datav-com.absolute {
		position: absolute !important;
		margin: 0 !important;
	}
}

.datav-watermark {
	position: fixed;
	right: 10px;
	bottom: 10px;
	z-index: 99999999;
	width: 50px;

	img {
		width: 32px;
		height: 32px;
		vertical-align: middle;
	}
}
</style>
