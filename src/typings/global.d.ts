// * Vite
declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
	VITE_APP_BASE_API: string;
	VITE_ROUTER_BAE_PATH: string;
	VITE_PUBLIC_PATH: string;
	VITE_PORT: number;
}
