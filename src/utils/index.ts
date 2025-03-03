// @ts-nocheck
import {
	camelize,
	capitalize,
	extend,
	hasOwn,
	hyphenate,
	isArray,
	isFunction,
	isObject,
	isPlainObject,
	isString,
	looseEqual,
	toRawType
} from "@vue/shared";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);
/**
 * Generate shortId
 */
export const generateId = (prefix?: string) => {
	const id = nanoid();
	return prefix ? `${prefix}_${id}` : id;
};

export { isObject, isPlainObject, isArray, isFunction, isString, capitalize, looseEqual, extend, camelize, hasOwn };

export const kebabCase = hyphenate;

/**
 * Remove leading and trailing whitespace and non-word
 * characters from the given string.
 *
 * @param {String} `str`
 * @return {String}
 */
export const chop = (str: string) => {
	if (!isString(str)) return "";
	const re = /^[-_.\W\s]+|[-_.\W\s]+$/g;
	return str.trim().replace(re, "");
};

/**
 * Change casing on the given `string`, optionally
 * passing a delimiter to use between words in the
 * returned string.
 *
 * ```js
 * utils.changeCase('fooBarBaz');
 * //=> 'foo bar baz'
 *
 * utils.changeCase('fooBarBaz' '-');
 * //=> 'foo-bar-baz'
 * ```
 * @return {String}
 * @api public
 * @param str
 * @param fn
 */
// eslint-disable-next-line no-unused-vars
export const changeCase = (str: string, fn?: (str: string) => string) => {
	if (!isString(str)) return "";
	if (str.length === 1) {
		return str.toLowerCase();
	}

	str = chop(str).toLowerCase();

	const re = /[-_.\W\s]+(\w|$)/g;
	return str.replace(re, (_, ch) => {
		return fn ? fn(ch) : "";
	});
};

/**
 * PascalCase the characters in `string`.
 *
 * ```js
 * {{pascalCase "foo bar baz"}}
 * <!-- results in:  'FooBarBaz' -->
 * ```
 * @param {String} `string`
 * @return {String}
 * @api public
 */
export const pascalCase = (str: string) => {
	if (!isString(str)) return "";
	str = changeCase(str, (ch: string) => {
		return ch.toUpperCase();
	});
	return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Generating a random int in range (0, max - 1)
 * @param max {number}
 */
export function getRandomInt(max: number) {
	return Math.floor(Math.random() * Math.floor(max));
}

export const isIE = function (): boolean {
	return !isNaN(Number(document.DOCUMENT_NODE));
};

export const isEdge = function (): boolean {
	return navigator.userAgent.indexOf("Edge") > -1;
};

export const isFirefox = function (): boolean {
	return !!window.navigator.userAgent.match(/firefox/i);
};

export const isMac = () => {
	return /macintosh|mac os x/i.test(navigator.userAgent);
};

export const isBool = (val: unknown) => typeof val === "boolean";
export const isNumber = (val: unknown) => typeof val === "number";
export const isHTMLElement = (val: unknown) => toRawType(val).startsWith("HTML");

export function isUndefined(val: any) {
	return val === void 0;
}

export function isEmpty(val: unknown) {
	if ((!val && val !== 0) || (isArray(val) && !val.length) || (isObject(val) && !Object.keys(val).length)) return true;

	return false;
}

export function isUrl(val: string) {
	return /^[a-zA-z]+:\/\/[^\s]*$/.test(val);
}

export function deduplicate<T>(arr: T[]) {
	return Array.from(new Set(arr));
}

export function toObject<T>(arr: Array<T>): Record<string, T> {
	const res = {};
	for (let i = 0; i < arr.length; i++) {
		if (arr[i]) {
			extend(res, arr[i]);
		}
	}
	return res;
}

export function ArrayToObject<T>(arr: Array<T>, key: string, value: string): Record<string, string> {
	return arr.reduce((prev, curr) => {
		prev[curr[key]] = curr[value];
		return prev;
	}, {});
}

export function StringArrayToObject(arr: string[]): Record<string, string> {
	return arr.reduce((prev, curr) => {
		prev[curr] = curr;
		return prev;
	}, {});
}

export function toJson<T>(data: any, defaultValue: T) {
	try {
		if (!data) {
			return defaultValue;
		}

		if (isString(data)) {
			return JSON.parse(data);
		}

		return data;
	} catch {
		return defaultValue;
	}
}

export const copyText = (text: string) => {
	try {
		const input = document.createElement("textarea");
		input.value = text;
		document.body.appendChild(input);
		input.select();
		document.execCommand("copy");
		document.body.removeChild(input);
		return true;
	} catch (error) {
		return false;
	}
};

/**
 * 获取字符串中 :value 形式的参数
 */
export const getTextParams = (text: string) => {
	const reg = /:([\d\w\u4e00-\u9fa5_$@*]+)/gi;
	return text.match(reg) ?? [];
};

/**
 * 替换字符串中 :value 形式的参数
 */
export const replaceTextParams = (text: string, data: Record<string, string>) => {
	if (Object.keys(data).length === 0) {
		return text;
	}
	const reg = /:([\d\w\u4e00-\u9fa5_$@*]+)/gi;
	return text.replace(reg, (key: string) => {
		return data[key.substr(1)] ?? key;
	});
};

/**
 * 简单计算字符串长度
 */
export const calcStrLen = (str: string) => {
	let len = 0;
	for (let i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
			len += 2;
		} else {
			len++;
		}
	}
	return len;
};

/**
 * 简单计算字符串宽度
 */
let TextCanvas: HTMLCanvasElement | null = null;
export const calcStrWidth = (str: string, font: string) => {
	if (!TextCanvas) {
		TextCanvas = document.createElement("canvas");
	}
	const ctx = TextCanvas.getContext("2d");
	ctx.font = font;
	ctx.font;
	return ctx.measureText(str).width;
};

/**
 * @description 格式化表格单元格默认值
 * @param row 行
 * @param col 列
 * @param callValue 当前单元格值
 * @return {String} 格式化后的值
 * */
export function defaultFormat(row: number, col: number, callValue: any) {
	// 如果当前值为数组,使用 / 拼接（根据需求自定义）
	if (isArray(callValue)) return callValue.length ? callValue.join(" / ") : "--";
	return callValue ?? "--";
}

/**
 * @description 根据枚举列表查询当需要的数据
 * @param callValue 当前单元格值
 * @param enumData 枚举列表
 * @param type 过滤类型（目前只有 tag）
 * @return {String} 格式化后的值
 * */
export function filterEnum(callValue: any, enumData: any[] = [], type?: string): string {
	let filterData = enumData.find(item => item.value === callValue);
	if (type == "tag") return filterData?.tagType ? filterData.tagType : "";
	return filterData ? filterData.label : "--";
}
