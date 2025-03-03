import http from "@/api";

/**
 *  账号登录
 * @param username
 * @param password
 */
export const accountLogin = (username: string, password: string) => {
	return http.post(`/login`, { username, password });
};

export interface UserInfo {
	user: {
		id: number;
		nickName: string;
		avatar: string;
	};
}

// 用户密码重置
export function resetUserPwd(id, password) {
	const data = {
		id,
		password
	};
	return http.put("/system/user/resetPwd", data);
}

// 查询用户个人信息
export function getUserProfile() {
	return http.get("/system/user/profile");
}

// 修改用户个人信息
export function updateUserProfile(data) {
	return http.put("/system/user/profile", data);
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
	return http.post(`/system/user/profile/updatePwd?oldPassword=${oldPassword}&newPassword=${newPassword}`);
}

// 用户头像上传
export function uploadAvatar(data) {
	return http.post("/system/user/profile/avatar", data);
}

/**
 *  获取用户信息
 * @returns
 */
export const getUserInfo = () => {
	return http.get<UserInfo>(`/getInfo`);
};
