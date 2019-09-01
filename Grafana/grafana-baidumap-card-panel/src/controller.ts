import { MetricsPanelCtrl } from "grafana/app/plugins/sdk";
import TimeSeries from "grafana/app/core/time_series2";

import * as _ from "lodash";
import DataFormatter from "./data_formatter";
import "./css/worldmap-panel.css";
import $ from "jquery";
import "./css/leaflet.css";

import BaiduMap from "./lib/baidumap";

import BMap from "./lib/map.baidu";
const panelDefaults = {
  maxDataPoints: 1,
  mapCenter: "(0°, 0°)",
  mapCenters: {},
  mapCenterLatitude: 0,
  mapCenterLongitude: 0,
  initialZoom: 4,
  valueName: "total",
  cityName: "select hostName",
  linkData: [
    {
      cityName: " ",
      detailName: " ",
      httpUrl: " "
    }
  ],
  circleDefaultMinSize: 4,
  circleMinSize: "",
  circleCurrentSize: 4,
  circleDefaultMaxSize: 30,
  circleMaxSize: "",
  zoomDelta: 0,
  lastZoom: 0,
  isZoomed: false,
  locationData: "countries",
  thresholds: "0,10",
  colors: [
    "rgba(12,201,12, 0.8)",
    "rgba(255,183,0, 0.8)",
    "rgba(255,35,30, 0.8)"
  ],
  unitSingle: "",
  unitPlural: "",
  showLegend: false,
  esMetric: "Count",
  decimals: 0,
  hideEmpty: false,
  hideZero: false,
  stickyLabels: false,
  ocean: "#ADADAD",
  boundaryStroke: "#ADADAD",
  boundaryFill: "#2B2B2C",
  countryBoundary: "#ADADAD",
  oceanEnable: true,
  boundaryEnable: true,
  locationList: [],
  dataList: [],
  dataMax: "",
  dataMin: "",
  adjFontSize: true,
  FontSize: "70%",
  cardwidth: "90%",
  cards: [
    {
      title: "Title",
      location: "",
      circleColor: "rgba(90, 200, 250, 0.8)",
      thresholdsOption: false,
      thresholdsValue: "",
      thresholdsData: "",
      thresholdsDataIndex: "",
      thresholdstmp: [],
      thresholdsLabel: "",
      thresholdsIndex: 0,
      link: "",
      sideDisplay: true,
      sideContent: "",
      data: [],
      circleValue: "",
      cardItems: [
        {
          name: "item title",
          value: null,
          dataIndex: null,
          cardData: null,
          type: "caption",
          bgColor: "rgba(30, 30, 30, 0.8)",
          color: "#00FFFF",
          link: "",
          dataTag: "",
          decimals: null,
          postfix: null
        }
      ]
    }
  ]
};

const mapCenters = {
  "(0°, 0°)": { mapCenterLatitude: 0, mapCenterLongitude: 0 },
  "North America": { mapCenterLatitude: 40, mapCenterLongitude: -100 },
  Europe: { mapCenterLatitude: 46, mapCenterLongitude: 14 },
  "West Asia": { mapCenterLatitude: 26, mapCenterLongitude: 53 },
  "SE Asia": { mapCenterLatitude: 10, mapCenterLongitude: 106 },
  "Last GeoHash": { mapCenterLatitude: 0, mapCenterLongitude: 0 }
};

panelDefaults.mapCenters = mapCenters;

export default class BaiduMapCtrl extends MetricsPanelCtrl {
  static templateUrl = "partials/module.html";

  dataFormatter: DataFormatter;
  locations: any;
  tileServer: string;
  saturationClass: string;
  map: any;
  series: any;
  data: any;
  mapCenterMoved: boolean;

  /** @ngInject **/
  constructor($scope, $injector, contextSrv) {
    super($scope, $injector);

    _.defaults(this.panel, panelDefaults);

    this.dataFormatter = new DataFormatter(this);

    this.events.on("init-edit-mode", this.onInitEditMode.bind(this));
    this.events.on("data-received", this.onDataReceived.bind(this));
    this.events.on("panel-teardown", this.onPanelTeardown.bind(this));
    this.events.on("data-snapshot-load", this.onDataSnapshotLoad.bind(this));

    this.loadLocationDataFromFile();
  }

  loadLocationDataFromFile(reload?) {
    if (this.map && !reload) {
      return;
    }

    if (this.panel.snapshotLocationData) {
      this.locations = this.panel.snapshotLocationData;
      return;
    }

    if (this.panel.locationData === "jsonp endpoint") {
      if (!this.panel.jsonpUrl || !this.panel.jsonpCallback) {
        return;
      }

      $.ajax({
        type: "GET",
        url: this.panel.jsonpUrl + "?callback=?",
        contentType: "application/json",
        jsonpCallback: this.panel.jsonpCallback,
        dataType: "jsonp",
        success: res => {
          this.locations = res;
          this.render();
        }
      });
    } else if (this.panel.locationData === "json endpoint") {
      if (!this.panel.jsonUrl) {
        return;
      }

      $.getJSON(this.panel.jsonUrl).then(res => {
        this.locations = res;
        this.render();
      });
    } else if (this.panel.locationData === "table") {
      // .. Do nothing
    } else if (
      this.panel.locationData !== "geohash" &&
      this.panel.locationData !== "json result"
    ) {
      $.getJSON(
        "public/plugins/grafana-worldmap-panel/data/" +
          this.panel.locationData +
          ".json"
      ).then(this.reloadLocations.bind(this));
    }
  }

  reloadLocations(res) {
    this.locations = res;
    this.refresh();
  }

  onPanelTeardown() {
    if (this.map) {
      // this.map.remove();
    }
    this.render();
  }

  onInitEditMode() {
    this.addEditorTab(
      "Baidumap",
      "public/plugins/grafana-baidumap-panel/partials/editor.html",
      2
    );
    this.addEditorTab(
      "WISE-PaaS",
      "public/plugins/grafana-baidumap-panel/partials/WISE-PaaS.html",
      3
    );
  }

  onDataReceived(dataList) {
    console.log(dataList);
    if (!dataList || dataList[0].type !== "table") {
      return;
    }

    let data: any = [],
      latKey: number,
      lngKey: number;
    dataList[0].columns.map((v, k) => {
      // console.log(v.text, k);
      if (v.text === "latitude") {
        latKey = k;
      }

      if (v.text === "longitude") {
        lngKey = k;
      }
    });

    dataList[0].rows.map(rv => {
      data.push([parseFloat(rv[lngKey]), parseFloat(rv[latKey])]);
    });

    // console.log(data);
    // if (this.dashboard.snapshot && this.locations) {
    //   this.panel.snapshotLocationData = this.locations;
    // }

    // const data = [];

    // if (this.panel.locationData === "geohash") {
    //   this.dataFormatter.setGeohashValues(dataList, data);
    // } else if (this.panel.locationData === "table") {
    //   const tableData = dataList.map(DataFormatter.tableHandler.bind(this));
    //   this.dataFormatter.setTableValues(tableData, data);
    // } else if (this.panel.locationData === "json result") {
    //   this.series = dataList;
    //   this.dataFormatter.setJsonValues(data);
    // } else {
    //   this.series = dataList.map(this.seriesHandler.bind(this));
    //   this.dataFormatter.setValues(data);
    // }
    this.data = data;

    // this.updateThresholdData();

    if (
      this.map &&
      this.data.length &&
      this.panel.mapCenter === "Last GeoHash"
    ) {
      // this.centerOnLastGeoHash();
    } else {
      // this.render();
    }
    this.render();
  }

  onDataSnapshotLoad(snapshotData) {
    this.onDataReceived(snapshotData);
  }
  seriesHandler(seriesData) {
    const series = new TimeSeries({
      datapoints: seriesData.datapoints,
      alias: seriesData.target
    });

    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
    return series;
  }
  updateThresholdData() {
    this.data.thresholds = this.panel.thresholds.split(",").map(strValue => {
      return Number(strValue.trim());
    });
    while (_.size(this.panel.colors) > _.size(this.data.thresholds) + 1) {
      // too many colors. remove the last one.
      this.panel.colors.pop();
    }
    while (_.size(this.panel.colors) < _.size(this.data.thresholds) + 1) {
      // not enough colors. add one.
      const newColor = "rgba(50, 172, 45, 0.97)";
      this.panel.colors.push(newColor);
    }
  }

  setNewMapCenter() {
    if (this.panel.mapCenter !== "custom") {
      this.panel.mapCenterLatitude =
        mapCenters[this.panel.mapCenter].mapCenterLatitude;
      this.panel.mapCenterLongitude =
        mapCenters[this.panel.mapCenter].mapCenterLongitude;
    }
    this.mapCenterMoved = true;
    this.map.panTo(
      new BMap.Point(
        this.panel.mapCenterLongitude,
        this.panel.mapCenterLatitude
      )
    );
    this.render();
  }
  setZoom() {
    this.map.setZoom(parseInt(this.panel.initialZoom) || 1);
  }
  link(scope, elem, attrs, ctrl) {
    ctrl.events.on("render", () => {
      render();
      ctrl.renderingCompleted();
    });

    function render() {
      if (!ctrl.data) {
        return;
      }

      const mapContainer = elem.find(".mapcontainer");

      if (mapContainer[0].id.indexOf("{{") > -1) {
        return;
      }

      // if (!ctrl.map) {
      // console.log(BMap);
      ctrl.BaiduMap = new BaiduMap(mapContainer[0], ctrl);
      ctrl.map = ctrl.BaiduMap.map;

      // var mapType1 = new BMap.MapTypeControl({
      //   mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
      //   anchor: BMAP_ANCHOR_TOP_LEFT
      // });
      // var overView = new BMap.OverviewMapControl();
      // var overViewOpen = new BMap.OverviewMapControl({
      //   isOpen: true,
      //   anchor: BMAP_ANCHOR_BOTTOM_RIGHT
      // });
      // //添加地图类型和缩略图
      // ctrl.map.addControl(mapType1); //2D图，混合图
      // ctrl.map.addControl(overView); //添加默认缩略地图控件
      // ctrl.map.addControl(overViewOpen); //右下角，打开
      // //移除地图类型和缩略图
      // ctrl.map.removeControl(mapType1); //移除2D图，混合图
      // ctrl.map.removeControl(overView);
      // ctrl.map.removeControl(overViewOpen);
      // map.addControl(new BMap.NavigationControl());
      // console.log(ctrl.map);
      // } else {
      ctrl.BaiduMap.refresh();
      // }

      // setTimeout(() => {
      //   ctrl.map.resize();
      // }, 1);

      // if (ctrl.mapCenterMoved) {
      // ctrl.map.panToMapCenter();
      // }

      // if (!ctrl.map.legend && ctrl.panel.showLegend) {
      // ctrl.map.createLegend();
      // }

      // ctrl.map.drawCircles();
    }
  }
}
