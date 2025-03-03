<template>
	<div class="datav-wrapper" :style="wrapperStyle">
		<div  autoresize id="cesiumContainer"></div>
	</div>
</template>

<script setup name="VcesiumMap" lang="ts">
import {computed, onMounted, PropType, toRef} from "vue";
import * as Cesium from "cesium";
import { BasicMap } from "./cesium-map";

const props = defineProps({
	com: {
		type: Object as PropType<BasicMap>,
		required: true
	}
});
const config = toRef(props.com, "config");
const attr = toRef(props.com, "attr");
const wrapperStyle = computed(() => {
	return {
		transform: "translateZ(0)",
		width: `${attr.value.w}px`,
		height: `${attr.value.h}px`
	};
});

const cameraPositions = [
	{ lon: 116.29421699792147, lat: 40.04092779976567, height: 20},
	{ lon: 116.29431669792257, lat: 40.04092879976477, height: 20},
	{ lon: 116.29411609792367, lat: 40.04082979976387, height: 20}
	// 添加更多摄像头位置...
];
const option  = {
	infoBox: false,
	shouldAnimate: true,
	sceneMode: Cesium.SceneMode.SCENE3D,
	timeline: false,
	animation: false,
	fullscreenButton: false,
	geocoder: false,
	homeButton: false,
	sceneModePicker: false,
	scene3DOnly: false,
	selectionIndicator: false,
	navigationHelpButton: false,
	shadows: false,
}
onMounted(() => {
	const viewer = new Cesium.Viewer('cesiumContainer', );

/*	viewer._cesiumWidget._creditContainer.style.display = "none";
	viewer.scene.fxaa = false;
	viewer.scene.postProcessStages.fxaa.enabled = true;

	if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
		viewer.resolutionScale = window.devicePixelRatio;
	}

	viewer.scene.globe.show = true;
	// viewer.scene.screenSpaceCameraController.enableInputs = false; // 禁用鼠标控制

	// 将三维球定位到中国
	viewer.camera.setView({
		// fromDegrees()方法，将经纬度和高程转换为世界坐标
		destination: Cesium.Cartesian3.fromDegrees(116.29967988095092, 40.0401389753888, 1000.0),
		orientation: {
			heading: 6.283185307179586,
			// 视角
			pitch: -1.5686521559334161,
			roll: 0,
		}
	});
	// 将相机视角定位到指定位置
	viewer.scene.camera.setView({
		destination: Cesium.Cartesian3.fromDegrees(
			116.29421699792147,
			40.04092779976567,
			100
		),
		orientation: {
			heading : Cesium.Math.toRadians(0),
			pitch : Cesium.Math.toRadians(-90),
			roll : 0.0
		}
	});
	// let entity = null;
	cameraPositions.forEach((position, index) => {
		const entity = viewer.entities.add({
			position: Cesium.Cartesian3.fromDegrees(position.lon, position.lat, position.height),
			viewFrom: new Cesium.Cartesian3(0, 0, 0),
			point: {
				pixelSize: 10,
				color: Cesium.Color.BLUE,
			},
		});
	});
	// console.log(12211,entity)
	// viewer.trackedEntity = entity;*/

});

</script>

<style scoped>
.box {
	width: 8rem;
	height: 8rem;
}
#cesiumContainer {
	width: 100%;
	height: 100%;
}
</style>
