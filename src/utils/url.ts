/**
 * 获取项目基础路径
 */
export const getBasePath = () => {
	return `${window.location.origin}${import.meta.env.VITE_ROUTER_BAE_PATH}`;
};

/**
 * 获取请求接口路径
 */
export const getApiBasePath = () => {
	return import.meta.env.VITE_APP_BASE_API as string;
};
