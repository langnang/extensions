import "./baidumap.css";
import "./baidumap/card.css";
import "./baidumap/cardItem.css";
import BMap, { BMap_Symbol_SHAPE_CIRCLE } from "./map.baidu";
export default class BaiduMap {
  map: any;
  ctrl: any;

  constructor($selector, $ctrl) {
    console.log($selector);
    console.log($ctrl);
    this.map = new BMap.Map($selector);
    this.ctrl = $ctrl;
    this.setCenterAndZoom();
    this.map.enableScrollWheelZoom();
    this.map.enableAutoResize();
    this.map.addControl(new BMap.NavigationControl());
    this.addOverlay();
  }

  refresh() {
    this.setNewMapCenter();
  }
  setNewMapCenter() {
    if (this.ctrl.panel.mapCenter !== "custom") {
      this.ctrl.panel.mapCenterLatitude = this.ctrl.panel.mapCenters[
        this.ctrl.panel.mapCenter
      ].mapCenterLatitude;
      this.ctrl.panel.mapCenterLongitude = this.ctrl.panel.mapCenters[
        this.ctrl.panel.mapCenter
      ].mapCenterLongitude;
    }
    this.map.panTo(
      new BMap.Point(
        this.ctrl.panel.mapCenterLongitude,
        this.ctrl.panel.mapCenterLatitude
      )
    );
  }
  setZoom() {
    this.map.setZoom(parseInt(this.ctrl.panel.initialZoom) || 1);
  }
  setCenterAndZoom() {
    this.map.centerAndZoom(
      new BMap.Point(
        this.ctrl.panel.mapCenterLongitude,
        this.ctrl.panel.mapCenterLatitude
      ),
      this.ctrl.panel.initialZoom
    );
  }
  setMoveToCenter() {}
  addOverlay() {
    this.ctrl.data.map(v => {
      const pt = new BMap.Point(v[0], v[1]);
      const marker = new BMap.Marker(pt, {
        icon: new BMap.Symbol(BMap_Symbol_SHAPE_CIRCLE, {
          scale: parseInt(this.ctrl.panel.circleCurrentSize) * 2,
          fillColor: "#5AC8FA",
          strokeColor: "#5AC8FA",
          strokeWeight: parseInt(this.ctrl.panel.circleCurrentSize) / 2,
          fillOpacity: 0.6
        })
      });
      this.map.addOverlay(marker);
      let opts = {
        title: "123"
      };
      let content = `
      <table>
        <tbody>
          <tr>
            <td>123</td>
            <td>123</td>
          </tr>
        </tbody>
      </table>
      `;
      let infoWindow = new BMap.InfoWindow(content, opts);

      marker.addEventListener("mouseover", () => {
        this.map.openInfoWindow(infoWindow, pt);
      });
      marker.addEventListener("mouseout", () => {
        this.map.closeInfoWindow(infoWindow, pt);
      });
    });
  }
}
