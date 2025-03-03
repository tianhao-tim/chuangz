import type { App } from "vue";
import VMainTitle from "./text/main-title";
import VMarquee from "./text/marquee";
import VNumberTitleFlop from "./text/number-title-flop";
import VParagraph from "./text/paragraph";
import VTimer from "./text/timer";
import VBasicBar from "./bar/basic-bar";
import VArcBar from "./bar/arc-bar";
import VHorizontalBar from "./bar/horizontal-bar";
import VWordCloud from "./chart/word-cloud";
import VPercentPond from "./chart/percent-pond";
import VWaterLevelPond from "./chart/water-level-pond";
import VConicalColumnChart from "./chart/conical-column-chart";
import VGaugeChart from "./chart/gauge-chart";
import VBasicLine from "./line/basic-line";
import VBaseArea from "./line/basic-area";
import VBasePie from "./pie/basic-pie";
import VBasicRing from "./pie/basic-ring";
import VPieOneValue from "./pie/pie-one-value";
import VBasicRadar from "./radar/basic-radar";
import VBasicMap from "./map/basic-map";
import VcesiumMap from "./map/cesium-map";
import VCarouselTable from "./list/carousel-table";
import VTableBar from "./list/table-bar";

import VBgBox from "./media/bg-box";
import VBorderBox from "./media/border-box";
import VDecoration from "./media/decoration";
import VMainImg from "./media/main-img";
import VMainVideo from "./media/main-video";

import VDvBorder from "./datav/dv-border";
import VDvDecoration from "./datav/dv-decoration";

const components = [
	VMainTitle,
	VNumberTitleFlop,
	VBasicBar,
	VArcBar,
	VBaseArea,
	VHorizontalBar,
	VBasePie,
	VPieOneValue,
	VBasicRadar,
	VBasicRing,
	VBasicMap,
	VcesiumMap,
	VMarquee,
	VParagraph,
	VTimer,
	VWordCloud,
	VPercentPond,
	VWaterLevelPond,
	VConicalColumnChart,
	VGaugeChart,
	VBasicLine,
	VBgBox,
	VBorderBox,
	VDecoration,
	VMainImg,
	VCarouselTable,
	VTableBar,
	VMainVideo,
	VDvBorder,
	VDvDecoration
];

const install = (app: App): void => {
	components.forEach(component => {
		app.use(component);
	});
};

export default {
	install
};
