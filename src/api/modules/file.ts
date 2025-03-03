import http from "@/api";

/**
 * 上传文件
 * @param data
 */
export function upload(data: any) {
	return http.post("datav/upload", data);
}
