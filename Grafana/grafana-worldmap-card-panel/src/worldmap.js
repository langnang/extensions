import _ from 'lodash';
import $ from 'jquery';
import L from './libs/leaflet';
import {
  ocean
} from './ocean';
import {
  twn
} from './twn';
import {
  china
} from './cn';
import {
  countries
} from './countries';
import {
  appEvents
} from 'app/core/core';

const tileServers = {
  'CartoDB Positron': {
    url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd'
  },
  'CartoDB Dark': {
    url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd'
  }
};

const linkStatus = [];

export default class WorldMap {
  constructor(ctrl, mapContainer) {
    this.ctrl = ctrl;
    this.mapContainer = mapContainer;
    this.circles = [];
    this.cards = ctrl.panel.cards;
    this.side = null;
    this.Ocean = null;
    this.CHN = null;
    this.TWN = null;
    this.zoomstart = 0;

    return this.createMap();
  }

  createMap() {
    const mapCenter = window.L.latLng(parseFloat(this.ctrl.panel.mapCenterLatitude), parseFloat(this.ctrl.panel.mapCenterLongitude));
    //this.map = window.L.map(this.mapContainer, {worldCopyJump: true, center: mapCenter,zoom:parseInt(this.ctrl.panel.initialZoom)||3, zoomDelta:0.25,zoomSnap:0, doubleClickZoom:false});
    this.map = window.L.map(this.mapContainer, {
      worldCopyJump: true,
      center: mapCenter,
      zoom: parseInt(this.ctrl.panel.initialZoom) || 3,
      zoomDelta: 0.25,
      zoomSnap: 0,
      doubleClickZoom: false
    })
    this.map.scrollWheelZoom.disable();

    const selectedTileServer = tileServers[this.ctrl.tileServer];
    window.L.tileLayer(selectedTileServer.url, {
      maxZoom: 18,
      subdomains: selectedTileServer.subdomains,
      reuseTiles: true,
      detectRetina: true,
      attribution: selectedTileServer.attribution
    }).addTo(this.map);
  }

  createLegend() {
    //   this.legend = window.L.control({position: 'bottomleft'});
    //   this.legend.onAdd = () => {
    //     this.legend._div = window.L.DomUtil.create('div', 'info legend');
    //     this.legend.update();
    //     return this.legend._div;
    //   };

    //   this.legend.update = () => {
    //     const thresholds = this.ctrl.data.thresholds;
    //     let legendHtml = '';
    //     legendHtml += '<div class="legend-item"><i style="background:' + this.ctrl.panel.colors[0] + '"></i> ' +
    //         '&lt; ' + thresholds[0] + '</div>';
    //     for (let index = 0; index < thresholds.length; index += 1) {
    //       legendHtml +=
    //         '<div class="legend-item"><i style="background:' + this.ctrl.panel.colors[index + 1] + '"></i> ' +
    //         thresholds[index] + (thresholds[index + 1] ? '&ndash;' + thresholds[index + 1] + '</div>' : '+');
    //     }
    //     this.legend._div.innerHTML = legendHtml;
    //   };
    //   this.legend.addTo(this.map);
  }

  createSideDisplay() {
    this.side = window.L.control();
    this.side.onAdd = () => {
      this.side._div = window.L.DomUtil.create('div', 'side-info-container');
      this.side._div.innerHTML = '';
      let cardWidth = this.ctrl.cardWidthChange(this.ctrl.panel.cardwidth);
      this.side._div.style.width = cardWidth;
      this.side.update();
      return this.side._div;
    };
    this.side.update = () => {
      for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i].location !== '') {
          if (this.cards[i].thresholdsOption) {
            if (this.cards[i].thresholdsLabel == this.cards[i].thresholdstmp.length) {
              //always
              this.side._div.innerHTML += this.cards[i].sideContent;
              this.side._div.innerHTML += '<div class="side-display-space"></div>';
            } else if (this.checkNumberNotEmpty(this.cards[i].thresholdsData) && this.cards[i].thresholdsData >= this.cards[i].thresholdstmp[+this.cards[i].thresholdsLabel]) {
              this.side._div.innerHTML += this.cards[i].sideContent;
              this.side._div.innerHTML += '<div class="side-display-space"></div>';
            } else if (this.cards[i].thresholdsLabel == null && this.cards[i].thresholdsIndex === this.cards[i].thresholdstmp.length) {
              //old version
              this.side._div.innerHTML += this.cards[i].sideContent;
              this.side._div.innerHTML += '<div class="side-display-space"></div>';
            }
          } else if (this.cards[i].sideDisplay) {
            this.side._div.innerHTML += this.cards[i].sideContent;
            this.side._div.innerHTML += '<div class="side-display-space"></div>';
          };
        }
      }
    }
    this.side.addTo(this.map);
  }

  // createMarkerCluster() {
  // this.markerClusters = window.L.markerClusterGroup();
  // comment
  // this.markerClusters.addLayer(this.circlesLayer);
  // this.map.addLayer(this.markerClusters);
  // }

  filterEmptyAndZeroValues(data) {
    return _.filter(data, (o) => {
      return !(this.ctrl.panel.hideEmpty && _.isNil(o.value)) && !(this.ctrl.panel.hideZero && o.value === 0);
    });
  }

  clearCircles() {
    if (this.circlesLayer) {
      this.circlesLayer.clearLayers();
      this.removeCircles(this.circlesLayer);
      this.circles = [];
    }
    this.cleardropdownData();
  }

  MapColorSetting() {
    if (this.ctrl.panel.oceanEnable) {
      this.removeOcean();
      this.Ocean = window.L.geoJson(ocean, {
        fill: true,
        stroke: false,
        color: this.ctrl.panel.ocean,
        fillColor: this.ctrl.panel.ocean,
        fillOpacity: 0.8,
      });
      console.log(this.Ocean);
      this.Ocean.addTo(this.map);
    } else {
      this.removeOcean();
    }

    if (this.ctrl.panel.boundaryEnable) {
      this.removeBoundary();
      this.Countries = window.L.geoJson(countries, {
        fill: true,
        color: this.ctrl.panel.boundaryStroke,
        fillColor: this.ctrl.panel.boundaryFill,
        opacity: 0.8,
        fillOpacity: 0.8,
        weight: 2,
      })
      this.Countries.addTo(this.map);

      // this.TWN = window.L.geoJson(twn, {
      //   fill: true,
      //   color: this.ctrl.panel.boundaryStroke,
      //   fillColor: this.ctrl.panel.boundaryFill,
      //   opacity: 0.8,
      //   fillOpacity: 0.8,
      //   weight: 2,
      // });
      // this.TWN.addTo(this.map);

      // this.CHN = window.L.geoJson(china, {
      //   fill: true,
      //   color: this.ctrl.panel.boundaryStroke,
      //   fillColor: this.ctrl.panel.boundaryFill,
      //   opacity: 0.8,
      //   fillOpacity: 0.8,
      //   weight: 2,
      // });
      // this.CHN.addTo(this.map);
    } else {
      this.removeBoundary();
    }

    // var river = window.L.geoJson(river, {
    //   color: this.ctrl.panel.river,
    // }).addTo(this.map);

    // var t = window.L.geoJson(myLines, {
    //   "color": "#ff7800",
    //   "weight": 5,
    //   "opacity": 0.65
    // }).addTo(this.map);
    // var t = window.L.geojson.ajax("./temp.json",{
    //   "color": "#ff7800",
    //   "weight": 5,
    //   "opacity": 0.65
    // }).addTo(this.map);

  }

  drawCircles() {
    this.MapColorSetting();
    // this.removeMarkerCluster();
    this.removeSide();
    this.clearCircles();
    // this.createMarkerCluster();
    this.checkThresholdColorCount();
    this.checkCardLocation();
    this.createCircles();
    // this.map.addLayer(this.markerClusters);
    this.createSideDisplay();
  }

  getFontSize(fontSize) {
    if (this.ctrl.panel.adjFontSize) {
      for (let i = 0; i < this.ctrl.fontCalc.length; i++) {
        if (this.ctrl.fontCalc[i].text === fontSize) {
          return this.ctrl.fontCalc[i].value;
        }
      }
    }
    return fontSize;
  }

  cardSetting(card) {
    var lableStart = '<div class="card-title">' + card.title + '</div>';
    var addLabel = '';
    if (card.cardItems) {
      var tableStart = '<table style="table-layout:fixed;word-wrap: break-word;">'
      for (var ci = 0; ci < card.cardItems.length; ci++) {
        if (card.cardItems[ci].type === 'caption') {
          addLabel += '<tr class="cardCaption" style="font-size:' + this.getFontSize(this.ctrl.panel.FontSize) + ';"><td class colspan="2">' + card.cardItems[ci].name + '</td></tr>';
        } else if (card.cardItems[ci].type === 'data') {
          if (card.cardItems[ci].dataIndex !== null && card.cardItems[ci].dataTag !== null) {
            if (card.cardItems[ci].dataTag !== null && 'dataTag' in card.cardItems[ci]) {
              if (card.cardItems[ci].dataIndex < card.data.length) {
                if (card.cardItems[ci].dataTag !== card.data[card.cardItems[ci].dataIndex].text) {
                  //metrics have modified
                  card.cardItems[ci].dataIndex = null;
                  for (var di = 0; di < card.data.length; di++) {
                    if (card.data[di].text == card.cardItems[ci].dataTag) {
                      card.cardItems[ci].dataIndex = di;
                    }
                  }
                }
              } else {
                //metrics must delete query, so length has changed
                card.cardItems[ci].dataIndex = null;
                for (var di = 0; di < card.data.length; di++) {
                  if (card.data[di].text == card.cardItems[ci].dataTag) {
                    card.cardItems[ci].dataIndex = di;
                  }
                }
              }
              if (card.cardItems[ci].dataIndex != null && !(this.ctrl.panel.hideEmpty && _.isNil(card.data[card.cardItems[ci].dataIndex].value)) && !(this.ctrl.panel.hideZero && card.data[card.cardItems[ci].dataIndex].value === 0)) {
                card.cardItems[ci].value = card.data[card.cardItems[ci].dataIndex].value;
                var post = (card.cardItems[ci].postfix) ? card.cardItems[ci].postfix : '';
                var decValue = (card.cardItems[ci].decimals) ? card.cardItems[ci].value.toFixed(parseInt(card.cardItems[ci].decimals)) : card.cardItems[ci].value;
                var fontColor = (this.ctrl.tileServer === 'CartoDB Positron') ? '#323233' : '#ffffff';

                if (card.thresholdsOption && card.thresholdsIndex > -1 && card.thresholdsDataTag) {
                  console.log('Threshold');
                  for (var index = card.thresholdstmp.length; index >= 0; index -= 1) {
                    if (+card.thresholdsData >= card.thresholdstmp[index - 1]) {
                      card.thresholdsIndex = index;
                      break;
                    }
                  }
                  if (card.thresholdsIndex > -1)
                    fontColor = card.cardItems[ci].dataTag == card.thresholdsDataTag ? this.ctrl.panel.colors[card.thresholdsIndex] : fontColor;

                }
                addLabel += '<tr class="cardInfo" style="font-size:' + this.getFontSize(this.ctrl.panel.FontSize) + ';"><td><a class= "aCardInfo" style="text-decoration: none;" target="_self" href="' + card.cardItems[ci].link + '">' + card.cardItems[ci].name + '</a></td>';
                addLabel += '<td class="Content" style="color:' + fontColor + ';">' + decValue + post + '</td></a></tr>';
              }
            }
          }
          if (!('dataTag' in card.cardItems[ci])) {
            if (card.data[card.cardItems[ci].dataIndex]) {
              card.cardItems[ci].value = card.data[card.cardItems[ci].dataIndex].value;
              card.cardItems[ci].dataTag = card.data[card.cardItems[ci].dataIndex].text;
            }
            var post = (card.cardItems[ci].postfix) ? card.cardItems[ci].postfix : '';
            var decValue = (card.cardItems[ci].decimals) ? card.cardItems[ci].value.toFixed(parseInt(card.cardItems[ci].decimals)) : card.cardItems[ci].value;

            addLabel += '<tr class="cardInfo" style="font-size:' + this.getFontSize(this.ctrl.panel.FontSize) + ';"><td><a class= "aCardInfo" style="text-decoration: none;" target="_self" href="' + card.cardItems[ci].link + '">' + card.cardItems[ci].name + '</a></td>';
            addLabel += '<td class="Content">' + decValue + post + '</td></a></tr>';

          }
        } else if (card.cardItems[ci].type === 'info') {
          addLabel += '<tr class="cardInfo" style="font-size:' + this.getFontSize(this.ctrl.panel.FontSize) + ';"><td><a class= "aCardInfo" style="text-decoration: none;" target="_self" href="' + card.cardItems[ci].link + '">' + card.cardItems[ci].name + '</a></td>';
          addLabel += '<td class="Content">' + card.cardItems[ci].value + '</td></a></tr>';
        }
      }
      if (addLabel.length > 0) {
        lableStart = lableStart + tableStart + addLabel + '</table>';
        card.sideContent = lableStart;
      } else {
        card.sideContent = '';
      }
    }
  }

  createCircles() {
    const data = this.filterEmptyAndZeroValues(this.ctrl.data);
    const circles = [];
    let addFilter = false;
    var locationPoint = '';
    this.ctrl.panel.locationList = [];
    this.dropdownData(this.ctrl.data);
    var circle_list = [];

    this.addThresholdsData(this.cards);
    for (let i = 0; i < this.cards.length; i++) {
      this.cardSetting(this.cards[i]);
    }

    data.forEach((dataPoint) => {
      if (!dataPoint.locationName) return;
      locationPoint = dataPoint.locationName + '_' + dataPoint.locationLatitude + '_' + dataPoint.locationLongitude;
      if (circle_list.length === 0) {
        circles.push(this.createCircle(dataPoint, locationPoint));
        //this.ctrl.panel.locationList.push(locationPoint);
      } else {
        addFilter = circle_list.includes(locationPoint);
        if (addFilter === false) {
          circles.push(this.createCircle(dataPoint, locationPoint));
          //this.ctrl.panel.locationList.push(locationPoint);
        }
      }
    });
    this.circlesLayer = this.addCircles(circles);
    this.circles = circles;
  }

  createCircle(dataPoint, locationPoint) {
    for (let i = 0; i < this.cards.length; i++) {
      if (locationPoint === this.cards[i].location) {
        this.updateThresholdData(this.cards[i]);
        const circle = window.L.circleMarker([dataPoint.locationLatitude, dataPoint.locationLongitude], {
          radius: this.calCircleSize(this.cards[i], i),
          color: this.getColor(this.cards[i]),
          fillColor: this.getColor(this.cards[i]),
          fillOpacity: 0.8,
          location: dataPoint.key,
          locationName: dataPoint.locationName
        });

        const link = this.cards[i].link;
        if (link !== '') {
          circle.on('click', function onClick(e) {
            if (window.location.href.indexOf("/frame/") !== -1) {
              appEvents.emit("preventUrlGo", link);
              return;
            }
            window.open(link, '_self');
          });
        }

        //this.cardSetting(this.cards[i]);
        this.createPopup(circle, this.cards[i].sideContent);

        return circle;
      }
    }
    const circle = window.L.circleMarker([dataPoint.locationLatitude, dataPoint.locationLongitude], {
      radius: this.ctrl.panel.circleCurrentSize,
      color: 'rgb(90, 200, 250)',
      fillColor: 'rgb(90, 200, 250)',
      fillOpacity: 0.8,
      location: dataPoint.key,
      locationName: dataPoint.locationName
    });

    return circle;
  }

  dropdownData(dataList) {
    var locationPoint = '';
    let dataIndex = 0;
    this.ctrl.panel.dataMax = '';
    this.ctrl.panel.dataMin = '';
    for (let x = 0; x < dataList.length; x++) {
      if (dataList[x].locationName && dataList[x].locationLatitude && dataList[x].locationLongitude) {
        locationPoint = dataList[x].locationName + '_' + dataList[x].locationLatitude + '_' + dataList[x].locationLongitude;
        if (dataList[x].value > this.ctrl.panel.dataMax || typeof (this.ctrl.panel.dataMax) === "string") this.ctrl.panel.dataMax = dataList[x].value;
        if (dataList[x].value < this.ctrl.panel.dataMin || typeof (this.ctrl.panel.dataMin) === "string") this.ctrl.panel.dataMin = dataList[x].value;
        if (!(this.ctrl.panel.locationList.includes(locationPoint)))
          this.ctrl.panel.locationList.push(locationPoint);
        for (let y = 0; y < this.cards.length; y++) {
          if (this.cards[y].location === locationPoint) {
            //this.cards[y].data.push({text: dataList[x].key, value: dataList[x].value});
            dataIndex = this.cards[y].data.length;
            this.cards[y].data.push({
              text: dataList[x].key,
              value: dataList[x].value,
              index: dataIndex
            });
          }
        }
      }
    }
    var card_i = 0;
    while (card_i < this.cards.length) {
      if (!(this.ctrl.panel.locationList.includes(this.cards[card_i].location)) && this.cards[card_i].location) {
        this.ctrl.removeCard(card_i);
        card_i = 0;
      }
      card_i += 1;
    }
  }

  cleardropdownData() {
    for (let y = 0; y < this.cards.length; y++) {
      this.cards[y].data = [];
    }
  }

  calCircleSize(card, card_i) {
    if (!this.checkNumberNotEmpty(this.ctrl.panel.circleMaxSize) || !this.checkNumberNotEmpty(this.ctrl.panel.circleMinSize) || !(card.circleValue)) {
      return this.ctrl.panel.circleCurrentSize;
    } else {
      if (+this.ctrl.panel.circleMaxSize > 0 && +this.ctrl.panel.circleMinSize > 0 && +this.ctrl.panel.circleMaxSize > +this.ctrl.panel.circleMinSize) {
        for (let i = 0; i < card.cardItems.length; i++) {
          if (card.circleValue == card.cardItems[i].dataTag && card.cardItems[i].dataIndex != null) {
            if (this.checkNumberNotEmpty(card.cardItems[i].value))
              return (+card.cardItems[i].value - this.ctrl.panel.circleMinSize) * (+this.ctrl.panel.circleMaxSize - +this.ctrl.panel.circleMinSize) / (this.ctrl.panel.dataMax - this.ctrl.panel.dataMin) + this.ctrl.panel.circleMinSize;
            else
              return this.ctrl.panel.circleCurrentSize;
          }
        }
        this.cards[card_i].circleValue = '';
        return this.ctrl.panel.circleCurrentSize;
      } else return this.ctrl.panel.circleCurrentSize;
    }
  }

  createPopup(circle, content) {
    var FirstHttpUrl = new Array();
    var flagLabel;
    var count = 0;
    var DatafontColor = '';
    var customPopupOption = {
      'offset': window.L.point(0, -2),
      'className': 'worldmap-popup'
    }
    circle.bindPopup(content, customPopupOption);
    circle.on('mouseover', function onMouseOver(evt) {
      const layer = evt.target;
      layer.bringToFront();
      this.openPopup();
    });

    var isOff = false;
    if (!isOff) {
      // circle.off('click');
    }
    if (!this.ctrl.panel.stickyLabels) {
      this.map.on('mouseout', function onMouseOut() {
        circle.closePopup();
      });
    }
  }

  getDataValue(findData) {
    const data = this.filterEmptyAndZeroValues(this.ctrl.data);
    if (!findData || !data) return;
    for (var d = 0; d < data.length; d++) {
      if (findData === data[d].locationName) {
        return data[d].value;
      }
    }
    return '';
  }

  getThresholdsFontColor(dataValue, thresholds) {
    var colorIndex = 0;
    for (let index = thresholds.length; index > 0; index -= 1) {
      if (dataValue >= thresholds[index - 1]) {
        colorIndex = index;
      }
    }
    if (colorIndex >= this.ctrl.panel.colors.length) {
      colorIndex = this.ctrl.panel.colors.length - 1;
    }
    return colorIndex;
  }

  getColor(card) {
    if (isNaN(card.thresholdsData)) {
      //not a number
      return card.circleColor;
    } else if (typeof (card.thresholdsData) === "string" && !(card.thresholdsData)) {
      //isNaN('') is false, so need to check string and empty.
      return card.circleColor;
    } else {
      //only is srting without empty and number
      if (card.thresholdsOption) {
        for (var index = card.thresholdstmp.length; index >= 0; index -= 1) {
          if (+card.thresholdsData >= card.thresholdstmp[index - 1]) {
            card.thresholdsIndex = index;
            return this.ctrl.panel.colors[index];
          }
        }
        card.thresholdsIndex = 0;
        return _.first(this.ctrl.panel.colors);
      } else {
        return card.circleColor;
      }
    }
  }

  updateThresholdData(card) {
    card.thresholdstmp = card.thresholdsValue.split(',').map((strValue) => {
      return Number(strValue.trim());
    });
  }

  resize() {
    this.map.invalidateSize();
  }

  panToMapCenter() {
    this.map.panTo([parseFloat(this.ctrl.panel.mapCenterLatitude), parseFloat(this.ctrl.panel.mapCenterLongitude)]);
    this.ctrl.mapCenterMoved = false;
  }

  removeLegend() {
    this.map.removeControl(this.legend);
    this.legend = null;
  }

  removeSide() {
    if (this.side !== null) {
      this.map.removeControl(this.side);
    }
    this.side = null;
  }

  removeOcean() {
    if (this.Ocean !== null) {
      this.map.removeLayer(this.Ocean);
    }
    this.Ocean = null;
  }

  removeBoundary() {
    if (this.CHN !== null) {
      this.map.removeLayer(this.CHN);
    }
    this.CHN = null;
    if (this.TWN !== null) {
      this.map.removeLayer(this.TWN);
    }
    this.TWN = null;
  }

  // removeMarkerCluster() {
  //   if (this.markerClusters !== null) {
  //     this.markerClusters.removeLayer(this.circlesLayer);
  //     this.map.removeLayer(this.markerClusters);
  //   }
  // }

  addCircles(circles) {
    return window.L.layerGroup(circles).addTo(this.map);
  }

  removeCircles() {
    this.map.removeLayer(this.circlesLayer);
  }

  setZoom(zoomFactor) {
    this.map.setZoom(parseInt(zoomFactor, 10));
  }

  remove() {
    this.circles = [];
    if (this.circlesLayer) this.removeCircles();
    if (this.legend) this.removeLegend();
    this.map.remove();
  }
  updateZoomDelta() {
    this.ctrl.map.panel.zoomDelta = 0
  }
  updatethresholdsOption(card) {
    if (card.thresholdsValue.length > 0)
      card.thresholdsOption = true;
    else
      card.thresholdsOption = false;
  }
  checkThresholdColorCount() {
    var threshold_value_count = 0;
    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].thresholdstmp = this.cards[i].thresholdsValue.split(',').map((strValue) => {
        return Number(strValue.trim());
      });
      if (this.cards[i].thresholdstmp.length > threshold_value_count) {
        threshold_value_count = this.cards[i].thresholdstmp.length;
      }
    }

    while (_.size(this.ctrl.panel.colors) > threshold_value_count + 1) {
      // too many colors. remove the last one.
      this.ctrl.panel.colors.pop();
    }
    var newColor = '';

    while (_.size(this.ctrl.panel.colors) < threshold_value_count + 1) {
      // not enough colors. add one.
      if (_.size(this.ctrl.panel.colors) === 2)
        newColor = 'rgba(255,35,30, 0.8)';
      else if (_.size(this.ctrl.panel.colors) === 1)
        newColor = 'rgba(255,183,0, 0.8)';
      else
        newColor = 'rgba(51,181,229, 0.8)';
      this.ctrl.panel.colors.push(newColor);
    }
  }

  addDataTag(data, cardItem) {
    if (cardItem.dataIndex != null)
      cardItem.dataTag = data[cardItem.dataIndex].text;
  }
  checkCardLocation() {
    for (let card_i = 0; card_i < this.cards.length; card_i++) {
      if (!(this.ctrl.panel.locationList.includes(this.cards[card_i].location))) {
        this.cards[card_i].location = '';
      }
    }
  }
  checkNumberNotEmpty(value) {
    if (isNaN(value)) {
      //Not Number
      return false
    } else if (typeof (value) === "string" && !(value)) {
      //isNaN('') is false, so need to check string and empty.
      return false;
    } else {
      //only is srting without empty and number and return number
      return true;
    }
  }
  addThresholdsData(cards) {
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].thresholdsDataTag) {
        var found = cards[i].data.find(function (element) {
          return element.text.match(cards[i].thresholdsDataTag);
        });
        if (found) cards[i].thresholdsData = found.value;
        else cards[i].thresholdsDataTag = '';
      }
    }
  }
}