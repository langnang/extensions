import BMap from "./../map.baidu";

export default class Point extends BMap.Point {
  constructor($lng, $lat) {
    super($lng, $lat);
    console.log(this);
  }
}
