import http from "@/api";

export interface SystemInfoConfig {
	name?: string;
	logoImg?: string;
	copyright?: string;
	webBaseUrl?: string;
	backgroundImage?: string;
	allowThirdPartyLogin?: boolean;
	thirdPartyLoginTypeList?: string[];
}

/**
 *  获取用户信息
 * @returns
 */
export const getSystemInfoConfig = () => {
	return http.get<string>(`/public/systemInfoConfig`);
};
