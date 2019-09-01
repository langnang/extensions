/* eslint import/no-extraneous-dependencies: 0 */
import {
  MetricsPanelCtrl
} from 'app/plugins/sdk';
import TimeSeries from 'app/core/time_series2';
import kbn from 'app/core/utils/kbn';
import cardwidth from './cardwidth';

import _ from 'lodash';
import mapRenderer from './map_renderer';
import DataFormatter from './data_formatter';
import './css/worldmap-card-panel.css!';

const panelDefaults = {
  maxDataPoints: 1,
  mapCenter: '(0°, 0°)',
  mapCenterLatitude: 0,
  mapCenterLongitude: 0,
  initialZoom: 3,
  valueName: 'total',
  cityName: 'select hostName',
  linkData: [{
    cityName: " ",
    detailName: " ",
    httpUrl: " "
  }],
  circleDefaultMinSize: 4,
  circleMinSize: '',
  circleCurrentSize: 4,
  circleDefaultMaxSize: 30,
  circleMaxSize: '',
  zoomDelta: 0,
  lastZoom: 0,
  isZoomed: false,
  locationData: 'countries',
  thresholds: '0,10',
  colors: ['rgba(12,201,12, 0.8)', 'rgba(255,183,0, 0.8)', 'rgba(255,35,30, 0.8)'],
  unitSingle: '',
  unitPlural: '',
  showLegend: false,
  esMetric: 'Count',
  decimals: 0,
  hideEmpty: false,
  hideZero: false,
  stickyLabels: false,
  ocean: '#ADADAD',
  boundaryStroke: '#ADADAD',
  boundaryFill: '#2B2B2C',
  countryBoundary: '#ADADAD',
  oceanEnable: true,
  boundaryEnable: true,
  locationList: [],
  dataList: [],
  dataMax: '',
  dataMin: '',
  adjFontSize: true,
  FontSize: '70%',
  cardwidth: '90%',
  cards: [{
    title: "Title",
    location: '',
    circleColor: 'rgba(90, 200, 250, 0.8)',
    thresholdsOption: false,
    thresholdsValue: '',
    thresholdsData: '',
    thresholdsDataIndex: '',
    thresholdstmp: [],
    thresholdsLabel: '',
    thresholdsIndex: 0,
    link: '',
    sideDisplay: true,
    sideContent: '',
    data: [],
    circleValue: '',
    cardItems: [{
      name: "item title",
      value: null,
      dataIndex: null,
      cardData: null,
      type: "caption",
      bgColor: 'rgba(30, 30, 30, 0.8)',
      color: '#00FFFF',
      link: '',
      dataTag: '',
      decimals: null,
      postfix: null,
    }],
  }],
};

var cityNameList = new Array();

const mapCenters = {
  '(0°, 0°)': {
    mapCenterLatitude: 0,
    mapCenterLongitude: 0
  },
  'North America': {
    mapCenterLatitude: 40,
    mapCenterLongitude: -100
  },
  'Europe': {
    mapCenterLatitude: 46,
    mapCenterLongitude: 14
  },
  'West Asia': {
    mapCenterLatitude: 26,
    mapCenterLongitude: 53
  },
  'SE Asia': {
    mapCenterLatitude: 10,
    mapCenterLongitude: 106
  },
  'Last GeoHash': {
    mapCenterLatitude: 0,
    mapCenterLongitude: 0
  }
};

export default class WorldmapCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector, contextSrv) {
    super($scope, $injector);
    this.cardTypes = [{
        text: 'Caption',
        value: 'caption'
      },
      {
        text: 'Data',
        value: 'data'
      },
      {
        text: 'Information',
        value: 'info'
      }
    ];
    // this.fontSizes = ['80%', '90%', '100%', '110%', '120%', '130%', '150%', '160%', '180%', '200%', '220%', '250%'];
    this.fontCalc = [{
        text: '60%',
        value: '0.6vw'
      },
      {
        text: '70%',
        value: '0.8vw'
      },
      {
        text: '80%',
        value: '1vw'
      },
      {
        text: '100%',
        value: '1.4vw'
      },
      {
        text: '110%',
        value: '1.6vw'
      },
      {
        text: '120%',
        value: '1.8vw'
      },
      {
        text: '130%',
        value: '2vw'
      },
      {
        text: '140%',
        value: '2.2vw'
      },
      {
        text: '150%',
        value: '2.4vw'
      },
      {
        text: '160%',
        value: '2.6vw'
      },
      {
        text: '180%',
        value: '3vw'
      },
      {
        text: '200%',
        value: '3.4vw'
      },
      {
        text: '220%',
        value: '3.8vw'
      },
      {
        text: '230%',
        value: '4vw'
      },
    ];
    this.cardWidthList = cardwidth.defaultValues;
    this.cardWidthChange = cardwidth.cardWidthChange;
    // if (this.scope.$$listeners.isWisePaas) {
    this.setMapProvider(contextSrv);
    _.defaults(this.panel, panelDefaults);

    this.dataFormatter = new DataFormatter(this, kbn);

    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('panel-teardown', this.onPanelTeardown.bind(this));
    this.events.on('data-snapshot-load', this.onDataSnapshotLoad.bind(this));
    this.loadLocationDataFromFile();
    // }

  }

  setMapProvider(contextSrv) {
    this.tileServer = contextSrv.user.lightTheme ? 'CartoDB Positron' : 'CartoDB Dark';
    this.setMapSaturationClass();
  }

  getCityNameOptions(arr) {
    return this.mapToTextValue(cityNameList);
  }
  setMapSaturationClass() {
    if (this.tileServer === 'CartoDB Dark') {
      this.saturationClass = 'map-darken';
    } else {
      this.saturationClass = '';
    }
  }

  loadLocationDataFromFile(reload) {
    if (this.map && !reload) return;

    if (this.panel.snapshotLocationData) {
      this.locations = this.panel.snapshotLocationData;
      return;
    }

    if (this.panel.locationData === 'jsonp endpoint') {
      if (!this.panel.jsonpUrl || !this.panel.jsonpCallback) return;

      window.$.ajax({
        type: 'GET',
        url: this.panel.jsonpUrl + '?callback=?',
        contentType: 'application/json',
        jsonpCallback: this.panel.jsonpCallback,
        dataType: 'jsonp',
        success: (res) => {
          this.locations = res;
          this.render();
        }
      });
    } else if (this.panel.locationData === 'json endpoint') {
      if (!this.panel.jsonUrl) return;

      window.$.getJSON(this.panel.jsonUrl).then((res) => {
        this.locations = res;
        this.render();
      });
    } else if (this.panel.locationData === 'table') {
      // .. Do nothing
    } else if (this.panel.locationData !== 'geohash' && this.panel.locationData !== 'json result' && this.panel.locationData !== 'json scada' && this.panel.locationData !== 'json rmm') {
      window.$.getJSON('public/plugins/grafana-worldmap-card-panel/data/' + this.panel.locationData + '.json')
        .then(this.reloadLocations.bind(this));
    }
  }

  reloadLocations(res) {
    this.locations = res;
    this.refresh();
  }

  onPanelTeardown() {
    if (this.map) this.map.remove();
  }

  onInitEditMode() {
    this.addEditorTab('Worldmap', 'public/plugins/grafana-worldmap-card-panel/partials/editor.html', 2);
    this.addEditorTab('WISE-PaaS', 'public/plugins/grafana-worldmap-card-panel/partials/WISE-PaaS.html', 3);
  }

  onDataReceived(dataList) {
    if (!dataList) return;
    var linkDataString = JSON.stringify(this.panel.linkData);
    this.panel.linkData = JSON.parse(linkDataString);
    if (this.dashboard.snapshot && this.locations) {
      this.panel.snapshotLocationData = this.locations;
    }

    const data = [];

    if (this.panel.locationData === 'geohash') {
      this.dataFormatter.setGeohashValues(dataList, data);
    } else if (this.panel.locationData === 'table') {
      const tableData = dataList.map(DataFormatter.tableHandler.bind(this));
      this.dataFormatter.setTableValues(tableData, data);
    } else if (this.panel.locationData === 'json result') {
      this.series = dataList;
      this.dataFormatter.setJsonValues(data);
    } else if (this.panel.locationData === 'json scada') {
      this.series = dataList;
      this.dataFormatter.setJsonScada(data);
    } else if (this.panel.locationData === 'json rmm') {
      this.series = dataList;
      this.dataFormatter.setJsonRMM(data);
    } else {
      this.series = dataList.map(this.seriesHandler.bind(this));
      this.dataFormatter.setValues(data);
    }
    this.data = data;

    if (this.data.length && this.panel.mapCenter === 'Last GeoHash') {
      this.centerOnLastGeoHash();
    } else {
      this.render();
    }
    cityNameList = [];
    for (var i = 0; i < data.length; i++) {
      cityNameList.push(data[i].locationName);
    }
  }

  centerOnLastGeoHash() {
    mapCenters[this.panel.mapCenter].mapCenterLatitude = _.last(this.data).locationLatitude;
    mapCenters[this.panel.mapCenter].mapCenterLongitude = _.last(this.data).locationLongitude;
    this.setNewMapCenter();
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

  setNewMapCenter() {
    if (this.panel.mapCenter !== 'custom') {
      this.panel.mapCenterLatitude = mapCenters[this.panel.mapCenter].mapCenterLatitude;
      this.panel.mapCenterLongitude = mapCenters[this.panel.mapCenter].mapCenterLongitude;
    }
    this.mapCenterMoved = true;
    this.render();
  }

  setZoom() {
    this.map.setZoom(this.panel.initialZoom || 1);
  }

  onChangeCityName() {
    this.refresh();
  }

  toggleLegend() {
    if (!this.panel.showLegend) {
      this.map.removeLegend();
    }
    this.render();
  }

  toggleStickyLabels() {
    this.map.clearCircles();
    this.render();
  }

  changeThresholds() {
    //this.map.legend.update();
    this.render();
  }


  changeLocationData() {
    this.loadLocationDataFromFile(true);

    if (this.panel.locationData === 'geohash') {
      this.render();
    }
    this.refresh();
  }

  addCard() {
    var newCardData = {
      title: "Title",
      location: '',
      circleColor: 'rgba(90, 200, 250, 0.8)',
      thresholdsOption: false,
      thresholdsValue: '',
      thresholdsData: '',
      thresholdsDataTag: '',
      thresholdstmp: [],
      thresholdsIndex: 0,
      link: '',
      sideDisplay: true,
      sideContent: '',
      data: [],
      cardItems: [],
    };
    this.panel.cards.push(newCardData);
    this.refresh();
  }

  removeCard($index) {
    this.panel.cards.splice($index, 1);
    this.refresh();
  }

  addCardItem($index) {
    var newCardItem = {
      name: "item title",
      value: null,
      dataIndex: null,
      cardData: null,
      type: "caption",
      bgColor: 'rgba(30, 30, 30, 0.8)',
      color: '#00FFFF',
      link: '',
      dataTag: ''
    };
    this.panel.cards[$index].cardItems.push(newCardItem);
    this.refresh();
  }

  deleteCardItem(pindex, index) {
    this.panel.cards[pindex].cardItems.splice(index, 1);
    this.render();
  }

  addLinked() {
    var newLinkData = {
      cityName: "",
      detailName: "",
      httpUrl: ""
    };
    this.panel.linkData.push(newLinkData);
    this.refresh();
  }
  removeLink($index) {
    this.panel.linkData.splice($index, 1);
    this.refresh();
  }

  mapToTextValue(result) {
    return _.map(result, function (d, i) {
      if (d && d.text && d.value) {
        return {
          text: d.text,
          value: d.value
        };
      } else if (_.isObject(d)) {
        return {
          text: d,
          value: i
        };
      }
      return {
        text: d,
        value: d
      };
    });
  }

  /* eslint class-methods-use-this: 0 */
  link(scope, elem, attrs, ctrl) {
    mapRenderer(scope, elem, attrs, ctrl);
  }
}

WorldmapCtrl.templateUrl = 'module.html';