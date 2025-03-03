import { MessageUtil } from "./messageUtil";
import { ElLoading } from "element-plus";
import { useGlobalStore } from "@/store";

interface FileInfo {
	name: string;
	size: number;
}

interface UploadOption {
	allowType: string;
	allowSize: number;
}

export const uploadHost = `${import.meta.env.VITE_APP_BASE_API}common/upload` || "";

export const uploadHeaders = {
	Authorization: useGlobalStore().token
};

let loadingInstance = null as any;
export const openUploadLoading = () => {
	loadingInstance = ElLoading.service({
		text: "正在上传文件"
	});
};

export const closeLoading = () => {
	loadingInstance.close();
};

export const validAllowImg = (file: FileInfo, option: Partial<UploadOption>) => {
	const opt: UploadOption = {
		allowType: "gif|jpeg|jpg|png",
		allowSize: 2,
		...option
	};
	const regx = new RegExp(`\\.(${opt.allowType})$`, "i");
	if (!regx.test(file.name)) {
		MessageUtil.error(`上传图片的格式只能是 ${opt.allowType} 中的一种！`);
		return false;
	}

	if (file.size / 1024 / 1024 > opt.allowSize) {
		MessageUtil.error(`上传图片的大小不能超过 ${opt.allowSize}MB！`);
		return false;
	}

	return true;
};

export const dataURLtoBlob = (dataURL: string) => {
	const data = window.atob(dataURL.split(",")[1]);
	const ia = new Uint8Array(data.length);
	for (let i = 0; i < data.length; i++) {
		ia[i] = data.charCodeAt(i);
	}
	return new Blob([ia], { type: "image/png" });
};
