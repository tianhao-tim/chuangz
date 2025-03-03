/*
  需求：给整个页面添加背景水印。

  思路：
    1、使用 canvas 特性生成 base64 格式的图片文件，设置其字体大小，颜色等。
    2、将其设置为背景图片，从而实现页面或组件水印效果

  使用：设置水印文案，颜色，字体大小即可
  <div v-waterMarker="{text:'版权所有',textColor:'rgba(180, 180, 180, 0.4)'}"></div>
*/

import type { DirectiveBinding } from "vue";
export const addWaterMarker = (str: any, font: any, textColor: any) => {
	// 水印文字，父元素，字体，文字颜色
	const id = "1.23452384164.123412416";
	if (document.getElementById(id) !== null) document.body.removeChild(<HTMLElement>document.getElementById(id));
	const can = document.createElement("canvas");
	can.width = 200;
	can.height = 130;
	const cans: any = can.getContext("2d");
	cans.rotate((-20 * Math.PI) / 180);
	cans.font = font || "12px Vedana";
	cans.fillStyle = textColor || "rgba(200, 200, 200, 0.30)";
	cans.textBaseline = "Middle";
	cans.fillText(str, can.width / 10, can.height / 2);
	const div = document.createElement("div");
	div.id = id;
	div.style.pointerEvents = "none";
	div.style.top = "0px";
	div.style.left = "0px";
	div.style.position = "fixed";
	div.style.zIndex = "10000000";
	div.style.width = `${document.documentElement.clientWidth}px`;
	div.style.height = `${document.documentElement.clientHeight}px`;
	div.style.background = `url(${can.toDataURL("image/png")}) left top repeat`;
	document.body.appendChild(div);
};

// 删除水印
export const delWaterMarker = () => {
	let id = "1.23452384164.123412416";
	if (document.getElementById(id) !== null) document.body.removeChild(<HTMLElement>document.getElementById(id));
};

export const waterMarker = {
	mounted(el: DirectiveBinding, binding: DirectiveBinding) {
		addWaterMarker(binding.value.text, binding.value.font, binding.value.textColor);
	}
};

export default waterMarker;
