/* eslint-disable */
/**
 * 因map.baidu.js将所有变量赋值至window中
 * 为避免js检查报错过多
 * 在此文件中全部注册为本地
 */
import "./map.baidu.js";
// @ts-ignore
export default window.BMap;
// @ts-ignore
export const BMap_Symbol_SHAPE_CIRCLE = window.BMap_Symbol_SHAPE_CIRCLE;
// @ts-ignore
export const BMAP_ANCHOR_TOP_LEFT = window.BMAP_ANCHOR_TOP_LEFT;
// @ts-ignore
export const BMAP_NAVIGATION_CONTROL_SMALL =
  // @ts-ignore
  window.BMAP_NAVIGATION_CONTROL_SMALL;
export const createImageBitmap = window.createImageBitmap;
