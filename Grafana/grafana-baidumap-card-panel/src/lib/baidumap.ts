import "./baidumap.css";
import "./baidumap/card.css";
import "./baidumap/cardItem.css";
import BMap, {
  BMap_Symbol_SHAPE_CIRCLE,
  BMAP_NAVIGATION_CONTROL_SMALL
} from "./map.baidu";
export default class BaiduMap {
  map: any;
  ctrl: any;

  constructor($selector, $ctrl) {
    // console.log($selector);
    // console.log($ctrl);
    this.map = new BMap.Map($selector);
    this.ctrl = $ctrl;
    this.setCenterAndZoom();
    this.map.enableScrollWheelZoom();
    this.map.enableAutoResize();
    this.map.addControl(
      new BMap.NavigationControl({
        type: BMAP_NAVIGATION_CONTROL_SMALL
      })
    );
    this.addOverlay();
    this.setStyle();
  }

  // refresh() {
  //   this.setNewMapCenter();
  // }
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
  setStyle() {
    let styleArray: any = [];
    // 陆地
    styleArray.push({
      featureType: "land",
      elementType: "all",
      stylers: {
        visibility: this.ctrl.panel.boundaryEnable === true ? "on" : "off",
        color: this.ctrl.panel.boundaryFill
      }
    });

    // 水系
    styleArray.push({
      featureType: "water",
      elementType: "geometry",
      stylers: {
        visibility: this.ctrl.panel.oceanEnable === true ? "on" : "off",
        color: this.ctrl.panel.ocean
      }
    });
    // 国界
    styleArray.push({
      featureType: "boundary",
      elementType: "all",
      stylers: {
        visibility: this.ctrl.panel.boundaryEnable === true ? "on" : "off",
        color: this.ctrl.panel.boundaryStroke
      }
    });

    // 国家
    styleArray.push({
      featureType: "country",
      elementType: "labels.text.fill",
      stylers: {
        color: "#0f0e0e",
        weight: 30
      }
    });

    // 道路
    styleArray.push(
      {
        featureType: "road",
        elementType: "geometry",
        stylers: {
          visibility: "off"
        }
      },
      {
        featureType: "road",
        elementType: "labels",
        stylers: {
          visibility: "off"
        }
      }
    );
    this.map.setMapStyle({
      styleJson: styleArray
      // styleJson: styleArray
    });
    // console.log(JSON.stringify(styleArray));
    // {
    //   featureType: "road",
    //   elementType: "geometry",
    //   stylers: {
    //     visibility: "off"
    //   }
    // },
    // {
    //   featureType: "road",
    //   elementType: "labels",
    //   stylers: {
    //     visibility: "off"
    //   }
    // },
    // {
    //   featureType: "country",
    //   elementType: "labels.text.fill",
    //   stylers: {
    //     color: "#4d4040ff",
    //     weight: 40
    //   }
    // },
    // {
    //   featureType: "country",
    //   elementType: "labels.text",
    //   stylers: {
    //     fontsize: 36
    //   }
    // }
  }
  addOverlay() {
    if (!this.ctrl.data) {
      return;
    }
    this.ctrl.data.map(vData => {
      const pt = new BMap.Point(vData[0], vData[1]);
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

      this.ctrl.panel.cards.map(vCard => {
        if (vCard.location === "") {
          return;
        }
        const loc = vCard.location.split("_");
        // console.log(loc);
        if (
          parseFloat(loc[0]) !== vData[0] ||
          parseFloat(loc[1]) !== vData[1]
        ) {
          return;
        }
        const marker = new BMap.Marker(pt, {
          icon: new BMap.Symbol(BMap_Symbol_SHAPE_CIRCLE, {
            scale: parseInt(this.ctrl.panel.circleCurrentSize) * 2,
            fillColor: vCard.circleColor,
            strokeColor: vCard.circleColor,
            strokeWeight: parseInt(this.ctrl.panel.circleCurrentSize) / 2,
            fillOpacity: 0.6
          })
        });
        this.map.addOverlay(marker);
        let opts = {
          title: vCard.title
        };

        let content = `<table><tbody>`;
        vCard.cardItems.map(vItem => {
          content += `<tr><td>${vItem.name}</td><td>${vItem.value}</td></tr>`;
        });
        content += `</tbody></table>`;
        let infoWindow = new BMap.InfoWindow(content, opts);

        marker.addEventListener("mouseover", () => {
          this.map.openInfoWindow(infoWindow, pt);
        });
        marker.addEventListener("mouseout", () => {
          this.map.closeInfoWindow(infoWindow, pt);
        });
      });
      // let opts = {
      //   title: "123"
      // };
      // let content = `
      // <table>
      //   <tbody>
      //     <tr>
      //       <td>123</td>
      //       <td>123</td>
      //     </tr>
      //   </tbody>
      // </table>
      // `;
      // let infoWindow = new BMap.InfoWindow(content, opts);

      // marker.addEventListener("mouseover", () => {
      //   this.map.openInfoWindow(infoWindow, pt);
      // });
      // marker.addEventListener("mouseout", () => {
      //   this.map.closeInfoWindow(infoWindow, pt);
      // });
    });
  }
}
