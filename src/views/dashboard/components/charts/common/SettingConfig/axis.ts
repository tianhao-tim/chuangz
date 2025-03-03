export const axisConfig = {
	// X轴位置
	xposition: [
		{
			value: "顶部",
			id: "top"
		},
		{
			value: "底部",
			id: "bottom"
		}
	],
	// Y轴位置
	yposition: [
		{
			value: "左侧",
			id: "left"
		},
		{
			value: "右侧",
			id: "right"
		}
	],
	// 线条
	splitLint: {
		lineStyle: {
			type: [
				{
					value: "实线",
					id: "solid"
				},
				{
					value: "虚线",
					id: "dashed"
				},
				{
					value: "点线",
					id: "dotted"
				}
			]
		}
	},
	// 视觉映射
	visualMap: {
		orient: [
			{
				value: "竖直",
				id: "vertical"
			},
			{
				value: "水平",
				id: "horizontal"
			}
		]
	}
};
