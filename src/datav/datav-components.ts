const baseImgUrl = window.location.origin;

export const bar = {
	type: "bar",
	name: "柱状图",
	icon: "v-icon-chart-bar",
	data: [
		{
			name: "VBasicBar",
			alias: "柱状图",
			img: `${baseImgUrl}/com/basic-bar-332-144.png`,
			thum: `${baseImgUrl}/com-thum/basic-bar-368-208.png`,
			used: true
		},
		{
			name: "VArcBar",
			alias: "玉玦图",
			img: `${baseImgUrl}/com/arc-bar-160-116.png`,
			thum: `${baseImgUrl}/com-thum/arc-bar-368-208.png`,
			used: true
		}
	]
};

export const horizontalBar = {
	type: "horizontal-bar",
	name: "条形图",
	icon: "v-icon-chart-bar",
	data: [
		{
			name: "VHorizontalBar",
			alias: "水平基本柱状图",
			img: `${baseImgUrl}/com/hori-basic-bar-332-144.png`,
			thum: `${baseImgUrl}/com-thum/hori-basic-bar-368-208.png`,
			used: true
		}
	]
};

export const line = {
	type: "line",
	name: "折线图",
	icon: "v-icon-chart-line",
	data: [
		{
			name: "VBasicLine",
			alias: "基本折线图",
			img: `${baseImgUrl}/com/basic-line-332-144.png`,
			thum: `${baseImgUrl}/com-thum/basic-line-368-208.png`,
			used: true
		}
	]
};

export const radar = {
	type: "radar",
	name: "雷达图",
	icon: "v-icon-chart-line",
	data: [
		{
			name: "VBasicRadar",
			alias: "基本雷达图",
			img: `${baseImgUrl}/com/basic-radar.jpg`,
			thum: `${baseImgUrl}/com/basic-radar.jpg`,
			used: true
		}
	]
};

export const area = {
	type: "area",
	name: "区域图",
	icon: "v-icon-chart-line",
	data: [
		{
			name: "VBasicArea",
			alias: "区域图",
			img: `${baseImgUrl}/com/basic-area-332-144.png`,
			thum: `${baseImgUrl}/com-thum/basic-area-368-208.png`,
			used: true
		}
	]
};

export const pie = {
	type: "pie",
	name: "饼环图",
	icon: "v-icon-chart-pie",
	data: [
		{
			name: "VBasicPie",
			alias: "基本饼图",
			img: `${baseImgUrl}/com/basic-pie-160-116.png`,
			thum: `${baseImgUrl}/com-thum/basic-pie-368-208.png`,
			used: true
		},
		{
			name: "VBasicRing",
			alias: "基本环图",
			img: `${baseImgUrl}/com/pie-ring.png`,
			thum: `${baseImgUrl}/com/pie-ring.png`,
			used: true
		},
		{
			name: "VPieOneValue",
			alias: "指标占比饼图",
			img: `${baseImgUrl}/com/pie-one-value-160-116.png`,
			thum: `${baseImgUrl}/com-thum/pie-one-value-368-208.png`,
			used: true
		}
	]
};

export const chart = {
	type: "chart",
	name: "其他",
	icon: "v-icon-other",
	data: [
		{
			name: "VWordCloud",
			alias: "词云",
			img: `${baseImgUrl}/com/word-cloud-160-116.png`,
			thum: `${baseImgUrl}/com-thum/word-cloud-370-208.png`,
			used: true
		},
		{
			name: "VPercentPond",
			alias: "进度池",
			img: `${baseImgUrl}/com/percent-pond.png`,
			thum: `${baseImgUrl}/com/percent-pond.png`,
			used: true
		},
		{
			name: "VWaterLevelPond",
			alias: "水位图",
			img: `${baseImgUrl}/com/water-level-pond.png`,
			thum: `${baseImgUrl}/com/water-level-pond.png`,
			used: true
		},
		{
			name: "VConicalColumnChart",
			alias: "锥形柱图",
			img: `${baseImgUrl}/com/conical-column-chart.png`,
			thum: `${baseImgUrl}/com/conical-column-chart.png`,
			used: true
		},
		{
			name: "VGaugeChart",
			alias: "油量表",
			img: `${baseImgUrl}/com/gauge-charts.png`,
			thum: `${baseImgUrl}/com/gauge-charts.png`,
			used: true
		}
	]
};

export const map = {
	type: "map",
	name: "地图",
	icon: "v-icon-map",
	data: [
		{
			name: "VBasicMap",
			alias: "地图",
			img: `${baseImgUrl}/com/2d-china-332-144.png`,
			thum: `${baseImgUrl}/com-thum/2d-china-368-208.png`,
			used: true
		},
	]
};
export const Cmap = {
	type: "map",
	name: "测试",
	icon: "v-icon-map",
	data: [
		{
			name: "VcesiumMap",
			alias: "测试",
			img: `${baseImgUrl}/com/2d-china-332-144.png`,
			thum: `${baseImgUrl}/com-thum/2d-china-368-208.png`,
			used: true
		},
	]
};

export const title = {
	type: "title",
	name: "标题",
	icon: "v-icon-title",
	data: [
		{
			name: "VMainTitle",
			alias: "通用标题",
			img: `${baseImgUrl}/com/main-title-332-144.png`,
			thum: `${baseImgUrl}/com-thum/main-title-370-208.png`,
			used: true
		},
		{
			name: "VMarquee",
			alias: "跑马灯",
			img: `${baseImgUrl}/com/marquee-332-144.png`,
			thum: `${baseImgUrl}/com-thum/marquee-370-208.png`,
			used: true
		},
		{
			name: "VNumberTitleFlop",
			alias: "数字翻牌器",
			img: `${baseImgUrl}/com/number-title-flop-160-116.png`,
			thum: `${baseImgUrl}/com-thum/number-title-flop-370-208.png`,
			used: true
		},
		{
			name: "VParagraph",
			alias: "多行文本",
			img: `${baseImgUrl}/com/paragraph-160-116.png`,
			thum: `${baseImgUrl}/com-thum/paragraph-370-208.png`,
			used: true
		},
		{
			name: "VTimer",
			alias: "时间器",
			img: `${baseImgUrl}/com/timer-160-116.png`,
			thum: `${baseImgUrl}/com-thum/timer-370-208.png`,
			used: true
		}
	]
};

export const list = {
	type: "list",
	name: "列表",
	icon: "v-icon-view-list",
	data: [
		{
			name: "VCarouselTable",
			alias: "轮播列表",
			img: `${baseImgUrl}/com/carousel-table-332-144.png`,
			thum: `${baseImgUrl}/com-thum/carousel-table-370-208.png`,
			used: true
		},
		{
			name: "VTableBar",
			alias: "轮播列表柱状图",
			img: `${baseImgUrl}/com/table-bar-332-144.png`,
			thum: `${baseImgUrl}/com-thum/table-bar-370-208.png`,
			used: true
		}
	]
};

export const material = {
	type: "material",
	name: "素材",
	icon: "v-icon-material",
	data: [
		{
			name: "VBgBox",
			alias: "自定义背景块",
			img: `${baseImgUrl}/com/bg-box-334-144.png`,
			thum: `${baseImgUrl}/com-thum/bg-box-370-208.png`,
			used: true
		},
		{
			name: "VBorderBox",
			alias: "图片边框",
			img: `${baseImgUrl}/com/border-box-162-116.png`,
			thum: `${baseImgUrl}/com-thum/border-box-370-208.png`,
			used: true
		},
		{
			name: "VDecoration",
			alias: "图片装饰",
			img: `${baseImgUrl}/com/decoration-162-116.png`,
			thum: `${baseImgUrl}/com-thum/decoration-370-208.png`,
			used: true
		},
		{
			name: "VMainImg",
			alias: "单张图片",
			img: `${baseImgUrl}/com/main-img-334-144.png`,
			thum: `${baseImgUrl}/com-thum/main-img-370-208.png`,
			used: true
		},
		{
			name: "VMainVideo",
			alias: "视频",
			img: `${baseImgUrl}/com/video.png`,
			thum: `${baseImgUrl}/com/video.png`,
			used: true
		}
	]
};

export const border = {
	type: "border",
	name: "边框",
	icon: "v-icon-chart-bar",
	data: [
		{
			name: "VDvBorder1",
			alias: "边框1",
			img: `${baseImgUrl}/com/border/border-1.png`,
			thum: `${baseImgUrl}/com/border/border-1.png`,
			used: true
		},
		{
			name: "VDvBorder2",
			alias: "边框2",
			img: `${baseImgUrl}/com/border/border-2.png`,
			thum: `${baseImgUrl}/com/border/border-2.png`,
			used: true
		},
		{
			name: "VDvBorder3",
			alias: "边框3",
			img: `${baseImgUrl}/com/border/border-3.png`,
			thum: `${baseImgUrl}/com/border/border-3.png`,
			used: true
		},
		{
			name: "VDvBorder4",
			alias: "边框4",
			img: `${baseImgUrl}/com/border/border-4.png`,
			thum: `${baseImgUrl}/com/border/border-4.png`,
			used: true
		},
		{
			name: "VDvBorder5",
			alias: "边框5",
			img: `${baseImgUrl}/com/border/border-5.png`,
			thum: `${baseImgUrl}/com/border/border-5.png`,
			used: true
		},
		{
			name: "VDvBorder6",
			alias: "边框6",
			img: `${baseImgUrl}/com/border/border-6.png`,
			thum: `${baseImgUrl}/com/border/border-6.png`,
			used: true
		},
		{
			name: "VDvBorder7",
			alias: "边框7",
			img: `${baseImgUrl}/com/border/border-7.png`,
			thum: `${baseImgUrl}/com/border/border-7.png`,
			used: true
		},
		{
			name: "VDvBorder8",
			alias: "边框8",
			img: `${baseImgUrl}/com/border/border-8.png`,
			thum: `${baseImgUrl}/com/border/border-8.png`,
			used: true
		},
		{
			name: "VDvBorder9",
			alias: "边框9",
			img: `${baseImgUrl}/com/border/border-9.png`,
			thum: `${baseImgUrl}/com/border/border-9.png`,
			used: true
		},
		{
			name: "VDvBorder10",
			alias: "边框10",
			img: `${baseImgUrl}/com/border/border-10.png`,
			thum: `${baseImgUrl}/com/border/border-10.png`,
			used: true
		},
		{
			name: "VDvBorder11",
			alias: "边框11",
			img: `${baseImgUrl}/com/border/border-11.png`,
			thum: `${baseImgUrl}/com/border/border-11.png`,
			used: true
		},
		{
			name: "VDvBorder12",
			alias: "边框12",
			img: `${baseImgUrl}/com/border/border-12.png`,
			thum: `${baseImgUrl}/com/border/border-12.png`,
			used: true
		},
		{
			name: "VDvBorder13",
			alias: "边框13",
			img: `${baseImgUrl}/com/border/border-13.png`,
			thum: `${baseImgUrl}/com/border/border-13.png`,
			used: true
		}
	]
};

export const decoration = {
	type: "decoration",
	name: "装饰",
	icon: "v-icon-chart-bar",
	data: [
		{
			name: "VDvDecoration1",
			alias: "装饰1",
			img: `${baseImgUrl}/com/decoration/decoration-1.png`,
			thum: `${baseImgUrl}/com/decoration/decoration-1.png`,
			used: true
		},
		{
			name: "VDvDecoration2",
			alias: "装饰2",
			img: `${baseImgUrl}/com/decoration/decoration-2.png`,
			thum: `${baseImgUrl}/com/decoration/decoration-2.png`,
			used: true
		},
		{
			name: "VDvDecoration3",
			alias: "装饰3",
			img: `${baseImgUrl}/com/decoration/decoration-3.png`,
			thum: `${baseImgUrl}/com/decoration/decoration-3.png`,
			used: true
		},
		{
			name: "VDvDecoration4",
			alias: "装饰4",
			img: `${baseImgUrl}/com/decoration/decoration-4.png`,
			thum: `${baseImgUrl}/com/decoration/decoration-4.png`,
			used: true
		},
		{
			name: "VDvDecoration5",
			alias: "装饰5",
			img: `${baseImgUrl}/com/decoration/decoration-5.png`,
			thum: `${baseImgUrl}/com/decoration/decoration-5.png`,
			used: true
		},
		{
			name: "VDvDecoration6",
			alias: "装饰6",
			img: `${baseImgUrl}/com/decoration/decoration-6.png`,
			thum: `${baseImgUrl}/com/decoration/decoration-6.png`,
			used: true
		},
		{
			name: "VDvDecoration7",
			alias: "装饰7",
			img: `${baseImgUrl}/com/decoration/decoration-7.png`,
			thum: `${baseImgUrl}/com/decoration/decoration-7.png`,
			used: true
		},
		{
			name: "VDvDecoration8",
			alias: "装饰8",
			img: `${baseImgUrl}/com/decoration/decoration-8.png`,
			thum: `${baseImgUrl}/com/decoration/decoration-8.png`,
			used: true
		},
		{
			name: "VDvDecoration9",
			alias: "装饰9",
			img: `${baseImgUrl}/com/decoration/decoration-9.png`,
			thum: `${baseImgUrl}/com/decoration/decoration-9.png`,
			used: true
		},
		{
			name: "VDvDecoration10",
			alias: "装饰10",
			img: `${baseImgUrl}/com/decoration/decoration-10.png`,
			thum: `${baseImgUrl}/com/decoration/decoration-10.png`,
			used: true
		},
		{
			name: "VDvDecoration11",
			alias: "装饰11",
			img: `${baseImgUrl}/com/decoration/decoration-11.png`,
			thum: `${baseImgUrl}/com/decoration/decoration-11.png`,
			used: true
		},
		{
			name: "VDvDecoration12",
			alias: "装饰12",
			img: `${baseImgUrl}/com/decoration/decoration-12.png`,
			thum: `${baseImgUrl}/com/decoration/decoration-12.png`,
			used: true
		}
	]
};

export const classifications = [
	{
		type: "regular",
		name: "图表",
		icon: "v-icon-chart",
		data: [bar, horizontalBar, line, area, pie, radar, chart]
	},
	{
		type: "map",
		name: "地图",
		icon: "v-icon-map",
		data: [map,Cmap]
	},
	{
		type: "text",
		name: "信息",
		icon: "v-icon-com-info",
		data: [title]
	},
	{
		type: "table",
		name: "表格",
		icon: "v-icon-table",
		data: [list]
	},
	{
		type: "media",
		name: "媒体",
		icon: "v-icon-media",
		data: [material]
	},
	{
		type: "other",
		name: "其他",
		icon: "v-icon-other",
		data: [border, decoration]
	}
];

export function findComByName(name: string) {
	for (let i = 0; i < classifications.length; i++) {
		const classification = classifications[i];
		for (let j = 0; j < classification.data.length; j++) {
			const category = classification.data[j];
			const com = category.data.find(m => m.name === name);
			if (com) {
				return {
					classification,
					category,
					com
				};
			}
		}
	}

	return null;
}
