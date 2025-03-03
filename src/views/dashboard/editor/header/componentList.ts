export const list = [
	{
		title: "图表组件",
		icon: "fa fa-bar-chart",
		type: "charts",
		componentName: "charts",
		components: [
			{
				title: "柱形图",
				icon: "fa fa-bar-chart",
				type: "charts",
				componentName: "BasicBar"
			},
			{
				title: "饼图",
				icon: "fa fa-pie-chart",
				type: "charts",
				componentName: "BasicPie"
			},
			{
				title: "折线图",
				icon: "fa fa-line-chart",
				type: "charts",
				componentName: "BasicLine"
			},
			{
				title: "雷达图",
				icon: "tduck icon-leidatu",
				type: "charts",
				componentName: "BasicRadar"
			},
			{
				title: "漏斗图",
				icon: "tduck icon-loudoutu",
				type: "charts",
				componentName: "Funnel"
			}
		]
	},
	{
		title: "基础组件",
		icon: "fa fa-bars",
		type: "basic",
		componentName: "basic",
		components: [
			{
				title: "表单",
				icon: "fa fa-wpforms",
				type: "basic",
				componentName: "Form"
			},
			{
				title: "轮播",
				icon: "tduck icon-shouyelunbotu",
				type: "basic",
				componentName: "Carousel"
			},
			{
				title: "图片",
				icon: "fa fa-file-image-o",
				type: "basic",
				componentName: "Image"
			},
			{
				title: "文本",
				icon: "fa fa-text-width",
				type: "basic",
				componentName: "Text"
			},
			{
				title: "按钮",
				icon: "tduck icon-anniu",
				type: "basic",
				componentName: "Button"
			}
		]
	},
	{
		title: "布局组件",
		icon: "tduck icon-buju",
		type: "layout",
		componentName: "layout",
		components: [
			{
				title: "Tabs选项卡",
				icon: "tduck icon-tabs",
				type: "layout",
				componentName: "Tabs"
			},
			{
				title: "栅格布局",
				icon: "tduck icon-zhage",
				type: "layout",
				componentName: "RowCol"
			}
		]
	},
	{
		title: "数据组件",
		icon: "tduck icon-shuju",
		type: "data",
		componentName: "data",
		components: [
			{
				title: "表格",
				icon: "tduck icon-biaoge",
				type: "data",
				componentName: "Table"
			},
			{
				title: "列表",
				icon: "tduck icon-danlieliebiao",
				type: "data",
				componentName: "List"
			}
		]
	},
	{
		title: "首页组件",
		icon: "tduck icon-zhuye",
		type: "home",
		componentName: "home",
		components: [
			{
				title: "统计卡片",
				icon: "tduck icon-tubiao-qiapian",
				type: "home",
				componentName: "Statistics"
			},
			{
				title: "快捷导航",
				icon: "tduck icon-daohang",
				type: "home",
				componentName: "Navigation"
			}
			// {
			// 	title: "项目",
			// 	icon: "tduck icon-tabs",
			// 	type: "home",
			// 	componentName: "Tabs"
			// },
			// {
			// 	title: "代办",
			// 	icon: "tduck icon-tabs",
			// 	type: "home",
			// 	componentName: "Tabs"
			// },
			// {
			// 	title: "最新通知",
			// 	icon: "tduck icon-zhage",
			// 	type: "home",
			// 	componentName: "RowCol"
			// }
		]
	}
];

export const createComponentConfig = async (type: string, componentName: string) => {
	const comModule = await import(`../../components/${type}/${componentName}/config.ts`);
	return new comModule.default();
};
