import { DatavComponent } from "@/datav/types/datav-component";
import { ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData } from "@/datav/types/data-source";
import { getStaticData } from "@/api/modules/data";
import { EChartEasing } from "@/datav/charts/echarts-animation";

/**
 * BasicMap
 */
export class BasicMap extends DatavComponent {
	config = {
		global: {
			fontFamily: "Microsoft Yahei",
			margin: {
				top: 40,
				bottom: 50,
				left: 60,
				right: 30
			},
			connectNulls: false
		},
		mapRegion: {
			adcode: "china",
			showHainanIsLands: true
		},
		tooltip: {
			show: true,
			trigger: "item"
		},
		visualMap: {
			show: false,
			orient: "vertical",
			pieces: [
				{ gte: 1000, label: ">1000" }, // 不指定 max，表示 max 为无限大（Infinity）。
				{ gte: 600, lte: 999, label: "600-999" },
				{ gte: 200, lte: 599, label: "200-599" },
				{ gte: 50, lte: 199, label: "49-199" },
				{ gte: 10, lte: 49, label: "10-49" },
				{ lte: 9, label: "<9" } // 不指定 min，表示 min 为无限大（-Infinity）。
			],
			inRange: {
				// 渐变颜色，从小到大
				color: ["#c3d7df", "#5cb3cc", "#8abcd1", "#66a9c9", "#2f90b9", "#1781b5"]
			},
			textStyle: {
				color: "#fff"
			}
		},
		geo: {
			show: false,
			type: "map",
			roam: false,
			map: "china",
			selectedMode: false, //是否允许选中多个区域
			zoom: 1
		},
		series: [
			{
				name: "",
				type: "effectScatter",
				coordinateSystem: "geo",
				symbolSize: 4,
				legendHoverLink: true,
				showEffectOn: "render",
				rippleEffect: {
					scale: 6,
					color: "#FFFFFF",
					brushType: "fill"
				},
				tooltip: {
					show: true,
					backgroundColor: "rgba(0,0,0,.6)",
					borderColor: "rgba(147, 235, 248, .8)",
					textStyle: {
						color: "#FFF"
					}
				},
				label: {
					formatter: "{b}",
					fontSize: 11,
					offset: [0, 2],
					position: "bottom",
					textBorderColor: "#fff",
					textShadowColor: "#000",
					textShadowBlur: 10,
					textBorderWidth: 0,
					color: "#FFFFFF",
					show: true
				},
				itemStyle: {
					color: "#FFFFFF",
					borderColor: "rgba(225,255,255,2)",
					borderWidth: 4,
					shadowColor: "#E1FFFF",
					shadowBlur: 10
				}
			},
			{
				name: "区域",
				type: "map",
				map: "china",
				selectedMode: false,
				zoom: 1,
				geoIndex: 1,
				tooltip: {
					show: true,
					backgroundColor: "#00000060",
					borderColor: "rgba(147, 235, 248, 0.8)",
					textStyle: {
						color: "#FFFFFF",
						fontSize: 12
					}
				},
				label: {
					show: false,
					color: "#FFFFFF",
					fontSize: 12
				},
				emphasis: {
					disabled: false,
					label: {
						color: "#FFFFFF",
						fontSize: 12
					},
					itemStyle: {
						areaColor: "#389BB7",
						shadowColor: "#389BB7",
						borderWidth: 1
					}
				},
				itemStyle: {
					borderColor: "#93EBF8",
					borderWidth: 1,
					areaColor: {
						type: "radial",
						x: 0.5,
						y: 0.5,
						r: 0.8,
						colorStops: [
							{
								offset: 0,
								color: "#93ebf800" // 0% 处的颜色
							},
							{
								offset: 1,
								color: "#93ebf820" // 100% 处的颜色
							}
						],
						globalCoord: false
					},
					shadowColor: "#80D9F842",
					shadowOffsetX: -2,
					shadowOffsetY: 2,
					shadowBlur: 10
				}
			}
		],
		animation: {
			enabled: true,
			duration: 1000,
			easing: EChartEasing.cubicOut,
			delay: 0
		}
	};

	apis: Partial<ApiConfigMap>;
	apiData: Partial<ApiDataConfigMap>;

	events: Record<string, any>;

	actions: Record<string, any>;

	constructor() {
		super("BasicMap", { w: 500, h: 300 });

		this.initData();
	}

	initData() {
		this.apis = initApiConfig({
			// fields: Object.assign({}, ...fields),
			description: "基本地图"
		});

		this.apiData = initApiData(this.id);

		this.events = {
			click: {
				description: "当点击数据项时"
				// fields: Object.assign({}, ...fields),
			}
		};
		this.actions = {};
		return this;
	}

	async loadData() {
		try {
			// 组件静态数据来源，当前项目统一管理目录：public/data/*
			// 如：public/data/demo/data.json 简写为 => demo/data
			const path = "map/basic-map";
			const res = await getStaticData(this.id, path);
			this.apiData.source.config.data = JSON.stringify(res.data);
		} catch (error) {
			throw error;
		}
	}
}

export default BasicMap;
