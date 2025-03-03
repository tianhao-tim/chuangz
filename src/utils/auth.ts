import Cookies from "js-cookie";

const TokenKey = "Admin-Token";

export const AUTH_HEADER_NAME = "Authorization";

// 获取token
export function getToken() {
	// 此处与TokenKey相同，此写法解决初始化时Cookies中不存在TokenKey报错
	return "Bearer " + Cookies.get(TokenKey);
}

// 设置token
export function setToken(token: string) {
	if (getTLD()) {
		return Cookies.set(TokenKey, token, { domain: getTLD() });
	}
	Cookies.set(TokenKey, token);
}

// 删除token
export function removeToken() {
	Cookies.remove(TokenKey);
}

/**
 *  获取顶级域名
 * @returns {string}
 */
function getTLD() {
	const hostname = window.location.hostname;
	const hostnameArray = hostname.split(".");
	// 如果是ip地址 或者是localhost
	if (hostnameArray.length === 1) return null;
	// 如果是三级域名 xx.xxx.xxx.com 或者是xxx.xx.com.cn 放弃
	if (hostnameArray.length > 3) return null;
	let i = 0;
	for (i = hostnameArray.length - 1; i > -1; i--) {
		if (hostnameArray[i].length > 2 && i !== hostnameArray.length - 1) {
			break;
		}
	}
	let tldArray = [];
	for (let j = i; j < hostnameArray.length; j++) {
		tldArray.push(hostnameArray[j]);
	}
	return tldArray.join(".");
}
