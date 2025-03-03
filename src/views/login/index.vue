<template>
	<div class="login" :style="getWrapStyle">
		<div class="login-weaper">
			<div class="login-right">
				<div class="login-main">
					<h4 class="login-title">XHReport</h4>
					<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
						<el-form-item prop="username">
							<el-input v-model="loginForm.username" auto-complete="off" placeholder="请输入账号名" :prefix-icon="User" type="text" />
						</el-form-item>
						<el-form-item prop="password">
							<el-input v-model="loginForm.password" show-password auto-complete="off" placeholder="请输入密码" :prefix-icon="Lock" />
						</el-form-item>
						<el-row type="flex" justify="center" align="middle" class="mb8">
							<!--							<el-col :span="20">-->
							<!--								<el-checkbox v-model="loginForm.rememberMe"> 记住密码 </el-checkbox>-->
							<!--							</el-col>-->
						</el-row>
						<el-form-item style="width: 100%">
							<el-button size="small" :loading="loading" class="login-submit" style="width: 100%" type="primary" @click="login(loginFormRef)">
								<span v-if="!loading">登录</span>
								<span v-else>登 录 中...</span>
							</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
		<!--  底部  -->
		<div class="el-login-footer"></div>
	</div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import type { ElForm } from "element-plus";
import { ElMessage } from "element-plus";
import { User, Lock } from "@element-plus/icons-vue";

import { accountLogin, getUserInfo } from "@/api/modules/user";
import { useGlobalStore } from "@/store";

const globalStore = useGlobalStore();

// 定义 formRef（校验规则）
type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
	username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

type AccountLoginForm = {
	username: string;
	password: string;
};

// 登录表单数据
const loginForm = reactive<AccountLoginForm>({
	username: "",
	password: ""
});
const loading = ref<boolean>(false);

const router = useRouter();
// login
const login = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async valid => {
		if (valid) {
			loading.value = true;
			try {
				const res = await accountLogin(loginForm.username, loginForm.password);
				globalStore.setToken(res.data as string);
				ElMessage.success("登录成功！");
				const userRes = await getUserInfo();
				globalStore.setUserInfo(userRes.data.user);
				router.push({ name: "home" });
			} finally {
				loading.value = false;
			}
		}
	});
};

onMounted(async () => {});

const getWrapStyle = computed(() => {
	return {};
});
</script>

<style scoped lang="scss">
.login {
	height: 100%;
	width: 100%;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	background-repeat: no-repeat;
	background-image: url("@/assets/images/login_bg.svg");
	background-size: cover;

	.el-login-footer {
		position: fixed;
		bottom: 20px;
		width: 100%;
		text-align: center;
		color: #fff;
		font-size: 12px;
		letter-spacing: 1px;
	}

	.login-left {
		img {
			width: 100%;
			height: 100%;
		}
	}

	.login-weaper {
		display: flex;
		box-sizing: border-box;
		z-index: 1;
		border: none;
		align-items: center;
		opacity: 1;

		.login-right {
			width: 380px;
			height: 350px;
			padding: 20px;
			position: relative;
			align-items: center;
			box-shadow: 0 3px 20px rgba(0, 21, 41, 0.08);

			display: flex;
			background-color: rgba(255, 255, 255, 1);
			border-radius: 16px;

			.login-main {
				margin: 0 auto;
				width: 70%;

				.login-title {
					color: #333;
					margin-bottom: 40px;
					font-size: 30px;
					text-align: center;
					font-weight: bold;
					font-size: 38px;
				}

				.login-form {
					margin: 10px 0;

					i {
						color: #333;
					}

					.el-form-item {
						margin-bottom: 20px !important;

						.login-submit {
							width: 100%;
							height: 35px;
							border-radius: 8px;
							border-color: #001529ff;
							background-color: #001529ff;
							letter-spacing: 2px;
							font-weight: 300;
						}
					}
				}

				.login-menu {
					margin-top: 30px;
					width: 100%;
					text-align: left;

					a {
						color: #999;
						font-size: 12px;
						margin: 0 8px;
						text-decoration: none;

						&:hover {
							color: #1e9fff;
							text-decoration: underline;
						}
					}
				}
			}
		}
	}
}

.other-login-wrap {
	float: right;

	.login-icon {
		margin: 2px;
	}
}

@media screen and (max-width: 500px) {
	.login-weaper {
		height: 100% !important;
		width: 100% !important;
		opacity: 0.9;
	}
	.login-left {
		display: none !important;
	}
	.login-right {
		border-radius: 0px !important;
		padding: 0px !important;
		width: 100% !important;
		background-color: rgba(255, 255, 255, 1) !important;
	}
	.login-main {
		margin: 0 auto !important;
		width: 70% !important;
	}
}
</style>
