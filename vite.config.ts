import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import { resolve } from "path";
import {viteStaticCopy } from "vite-plugin-static-copy"
import styleImport from 'vite-plugin-style-import';

// import AutoImport from "unplugin-auto-import/vite";
// import Components from "unplugin-vue-components/vite";
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";


const cesiumBaseUrl = "cesiumStatic"
const cesiumSource = "node_modules/cesium/Build/Cesium"

export default defineConfig(({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return {
		base: process.env.VITE_PUBLIC_PATH,
		define:{
			CESIUM_BASE_URL: JSON.stringify(`/${cesiumBaseUrl}`)
		},
		plugins: [
			vue(),
			// * EsLint 报错信息显示在浏览器界面上
			// * name 可以写在 script 标签上
			VueSetupExtend(),
			viteStaticCopy({
				targets:[
					{src:`${cesiumSource}/ThirdParty`,dest:cesiumBaseUrl},
					{src:`${cesiumSource}/Workers`,dest:cesiumBaseUrl},
					{src:`${cesiumSource}/Assets`,dest:cesiumBaseUrl},
					{src:`${cesiumSource}/Widgets`,dest:cesiumBaseUrl}
				]
			}),

			// 自动导入ele组件 官方推荐 开发起来卡的一比 放弃
			// AutoImport({
			// 	resolvers: [ElementPlusResolver()]
			// }),
			// Components({
			// 	resolvers: [ElementPlusResolver()]
			// }),
		],
		resolve: {
			// 配置别名
			alias: {
				"@": resolve(__dirname, "src"),
				'cesium': resolve(__dirname, cesiumSource)
			},
			extensions: [".js", ".json", ".ts", ".vue"] // 使用路径别名时想要省略的后缀名
		},
		server: {
			proxy: {
				// 选项写法
				// 此时会通过上面的代理规则，将源地址代理到目标地址，从而访问目标地址的接口
				// 需要注意的是 /api开头的 /不能丢，正则匹配也是
				"/tduck-api": {
					target: "http://localhost:8997", // 所要代理的目标地址
					rewrite: path => path.replace(/^\/api/, ""), // 重写传过来的path路径，比如 `/api/index/1?id=10&name=zs`（注意:path路径最前面有斜杠（/），因此，正则匹配的时候不要忘了是斜杠（/）开头的；选项的 key 也是斜杠（/）开头的）
					changeOrigin: true // true/false, 默认值:false - 将主机报头的来源更改为目标URL
				}
			}
		},
		build: {
			chunkSizeWarningLimit: 2048
		}
	};
});
