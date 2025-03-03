import { kebabCase } from "@/utils";

export async function createComponent(name: string) {
	// 特殊处理datav的边框和装饰组件 不然每个都要写一个组件
	let number = null;
	if (name.indexOf("DvBorder") >= 0 || name.indexOf("DvDecoration") >= 0) {
		// 正则提取数字
		number = name.replace("VDvBorder", "").replace("VDvDecoration", "");
		name = name.replace(number, "");
	}
	let path = kebabCase(name.substring(1));
	let componentName = name.substring(1);
	console.log(componentName,path,name)
	switch (componentName) {
		// bar
		case "BasicBar":
		case "HorizontalBar":
		case "ArcBar": {
			const comModule = await import(`./bar/${path}/src/${path}.ts`);
			return new comModule.default();
		}

		// line
		case "BasicLine":
		case "BasicArea": {
			const comModule = await import(`./line/${path}/src/${path}.ts`);
			return new comModule.default();
		}

		// bar
		case "BasicPie":
		case "BasicRing":
		case "PieOneValue": {
			const comModule = await import(`./pie/${path}/src/${path}.ts`);
			return new comModule.default();
		}

		// radar
		case "BasicRadar": {
			const comModule = await import(`./radar/${path}/src/${path}.ts`);
			return new comModule.default();
		}

		// map
		case "BasicMap": {
			const comModule = await import(`./map/${path}/src/${path}.ts`);
			return new comModule.default();
		}
		case "cesiumMap": {
			const comModule = await import(`./map/${path}/src/${path}.ts`);
			return new comModule.default();
		}

		// chart
		case "WordCloud":
		case "PercentPond":
		case "WaterLevelPond":
		case "ConicalColumnChart":
		case "GaugeChart": {
			const comModule = await import(`./chart/${path}/src/${path}.ts`);
			return new comModule.default();
		}

		// text
		case "MainTitle":
		case "Marquee":
		case "NumberTitleFlop":
		case "Paragraph":
		case "Timer": {
			const comModule = await import(`./text/${path}/src/${path}.ts`);
			return new comModule.default();
		}

		// media
		case "BgBox":
		case "BorderBox":
		case "Decoration":
		case "MainImg":
		case "MainVideo": {
			const comModule = await import(`./media/${path}/src/${path}.ts`);
			return new comModule.default();
		}

		// list
		case "CarouselTable":
		case "TableBar": {
			const comModule = await import(`./list/${path}/src/${path}.ts`);
			return new comModule.default();
		}
		case "DvBorder":
		case "DvDecoration": {
			const comModule = await import(`./datav/${path}/src/${path}.ts`);
			return new comModule.default(number);
		}

		default:
			throw Error(`Unknown component type: ${name}.`);
	}
}
