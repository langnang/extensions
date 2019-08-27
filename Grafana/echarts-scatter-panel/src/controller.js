import { MetricsPanelCtrl } from 'app/plugins/sdk';
import _ from 'lodash';
import kbn from 'app/core/utils/kbn';
import $ from 'jquery';
import echarts from './libs/echarts.min';
// import echartsOption from './echarts_option';
import './libs/dark';
import './style.css!';

import { DataProcessor } from './data_processor';
import DataFormatter from './data_formatter';

export class Controller extends MetricsPanelCtrl {

  constructor($scope, $injector) {
    console.log('constructor');
    super($scope, $injector);

    var panelDefaults = {
      IS_UCD: false,
      METHODS: ['POST', 'GET'],
      ETYPE: ['line', 'pie', 'map'],
      url: '',
      method: 'POST',
      upInterval: 60000,
      format: 'Year',
      subTabKey: 'default',
      dataTabIndex: 0,
      echarts: {
        type: "Scatter",
        typeList: ['line', 'bar', 'scatter'],
        chart: "Basic Scatter Chart",
        chartList: [],
        reserveOption: {
          xAxis: {
            show: true,
            option: {
              show: true
            },
            typeList: [],
            dataFormat: {
              'ww/dd': [],
              'mm/dd': [],
              'yyyy/mm': []
            }
          },
          yAxis: {
            show: true,
            typeList: [],
            dataFormat: {

            }
          },
          series: {
            typeList: ['line']
          }
        },
        seriesData: [],
        scatterDefault: {
          data: [
          ],
          type: 'scatter',
          refId: ""
        },
        option: {
          color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
          grid: {

          },
          legend: {
            show: false,
            data: [],
          },
          tooltip: {
            show: true,
            trigger: "item",
            axisPointer: {
              type: "line",
            },
            textStyle:{
              color:"#ececec",
              fontSize:7,
              lineHeight:25
            },
            backgroundColor:"rgba(20,20,20,0.9)",
            padding:[10,13]
            
          },
          xAxis: {
            splitLine: {
              show: false,
            },
            name: "",
            nameLocation: "middle",
          },
          yAxis: {
            splitLine: {
              show: false,
            },
            name: "",
            nameLocation: "middle",
          },
          series: [],
        }
      }
    };

    _.defaults(this.panel, panelDefaults);
    // 更新Option設置
    // this.updateOption();
    // 更新echarts.typeList
    // this.refreshEchartsTypeList();

    // console.log(this.panel);
    // console.log(this.panel.echarts);


    this.dataFormatter = new DataFormatter(this, kbn);
    this.processor = new DataProcessor(this.panel);

    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('panel-initialized', this.render.bind(this));

    this.refreshData();
  }


  onDataReceived(dataList) {
    // console.group("onDataReceived");
    // console.log(dataList);
    // init
    _.forEach(dataList, (value, key) => {
      if (value.type !== 'table') {

        console.log("type Error");

      } else {
        let scatter = this.panel.echarts.scatterDefault;
        let data = [];
        _.forEach(value.rows, (val, k) => {
          data.push([val[0], val[1]]);
        });
        if (this.panel.echarts.option.series[key] == undefined) {
          this.panel.echarts.option.series[key] = {};
        }
        this.panel.echarts.option.series[key].type = scatter.type;
        this.panel.echarts.option.series[key].data = data;
        this.panel.echarts.option.series[key].refId = value.refId;
        this.panel.echarts.option.series[key].label = scatter.label;
        this.panel.echarts.option.series[key].markLine = this.panel.echarts.option.series[key].markLine ? this.panel.echarts.option.series[key].markLine : {
          show: false
        };

        if (this.panel.echarts.option.series[key].markLine.show) {
          if (this.panel.echarts.option.series[key].markLine.data == undefined) {
            this.panel.echarts.option.series[key].markLine = {
              show: true,
              data: [
                { xAxis: "" },
                { yAxis: "" },
              ],
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                }
              },
              lineStyle: {
                normal: {
                  type: "solid",
                }
              },
              tooltip: {
                show: false,
              },
              symbol: ['none', 'none'],


            };

          } else {
            this.panel.echarts.option.series[key].markLine.symbol = [
              this.panel.echarts.option.series[key].markLine.symbol[0] ? this.panel.echarts.option.series[key].markLine.symbol[0] : "none",
              this.panel.echarts.option.series[key].markLine.symbol[1] ? this.panel.echarts.option.series[key].markLine.symbol[1] : "none"
            ];
            this.panel.echarts.option.series[key].markLine.data = [{ xAxis: this.panel.echarts.option.series[key].markLine.data[0].xAxis ? this.panel.echarts.option.series[key].markLine.data[0].xAxis : "" },
            { yAxis: this.panel.echarts.option.series[key].markLine.data[1].yAxis ? this.panel.echarts.option.series[key].markLine.data[1].yAxis : "" }];
          }
        } else {
          this.panel.echarts.option.series[key].markLine = {
            show: false
          };
        }
        this.panel.echarts.option.legend.data[key] = this.panel.echarts.option.series[key].name ? this.panel.echarts.option.series[key].name : "";
      }
    });
    // this.panel.echarts.seriesData = dataList;
    //重組datalist
    // this.rebuildDataList();

    //重組series并且根據type類型對數據再次處理
    // this.rebuildSeries();

    //this.rebuildSeriesData(seriesData);

    this.rebuildTooltips();

    this.refreshed = true;
    this.render();
    this.refreshed = false;
    // console.groupEnd("onDataReceived");

  }

  // 辅助线样式调整
  rebuildTooltips() {
    const x = this.panel.echarts.option.xAxis.name;
    const y = this.panel.echarts.option.yAxis.name;
    this.panel.echarts.option.tooltip.formatter = (params) => {
      let mat = `<p style="margin-bottom:9px;font-weight:bold;">${params.seriesName}</p>`;
      if (x === "" && y === "") {
        mat += `<b>${params.value[0]},${params.value[1]}</b>`;
      } else {
        mat += `<p style="margin-bottom:5px;"><small>${x}:</small>&nbsp;&nbsp;&nbsp;&nbsp;<b>${params.value[0]}</b></p>
        <p style="margin-bottom:0px;"><small>${y}:</small>&nbsp;&nbsp;&nbsp;&nbsp;<b>${params.value[1]}</b></p>`;
      }

      return mat;
    };
  }

  updateOption() {
    // 基於reserveOption中各個show來判斷是否
    for (let key in this.panel.echarts.reserveOption) {
      if (this.panel.echarts.reserveOption[key].show) {

      }
    }
  }

  // 刷新各個對應樣式列表
  refreshEchartsTypeList() {
    console.group("refreshEchartsTypeList");
    this.panel.echarts.typeList = [];
    for (let key in echartsOption()) {
      this.panel.echarts.typeList.push(_.toLower(key));
    }
    // console.log(this.panel.echarts.typeList);
    // console.groupEnd("refreshEchartsTypeList");
  }
  // 重組data數據
  rebuildDataList() {
    // console.group("rebuildDataList");
    const seriesData = [];
    //const indexOfrefId = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var refId = '';

    _.forEach(this.panel.echarts.seriesData, function (value, key) {
      // 遍歷datalist：[{datapoints:[[data,time],...],target:"SQL命名",refId:"SQL區域"},...]
      // 若是Grafana自帶模擬數據，沒有refId字段，且target為'A-series'
      if (_.isUndefined(value.refId)) {
        // 模擬數據-->沒有refId;else非模擬數據卻refId不相同;非模擬數據且refId相同
        value.refId = "TEST";
        refId = value.refId;
        seriesData.push({ refId: refId, time: [] });
      } else if (value.refId !== refId) {
        refId = value.refId;
        seriesData.push({ refId: refId, time: [] });
      }
      seriesData[seriesData.length - 1].time = _.unzip(value.datapoints)[1];
      seriesData[seriesData.length - 1][value.target] = value.datapoints;
    });
    // console.groupEnd("rebuildDataList");
    this.panel.echarts.seriesData = seriesData;
  }
  // 重組series
  rebuildSeries() {
    // console.group("rebuildSeries");
    for (let i = 0; i <= this.panel.echarts.seriesData.length - 1; i++) {
      // 不存在添加基本數據
      if (_.isUndefined(this.panel.echarts.option.series[i])) {
        this.panel.echarts.option.series.push({
          type: this.panel.echarts.reserveOption.series.typeList[0],
          data: [],
          isRebuildOption: false
        });
      }
      // 更新數據
      this.panel.echarts.option.series[i].refId = this.panel.echarts.seriesData[i].refId;
      switch (this.panel.echarts.option.series[i].type) {
        case "line":
          console.log(this.panel.echarts.seriesData[i]);
          this.panel.echarts.option.series[i].data = this.panel.echarts.seriesData[i].time;
          break;
        default:
          break;

      }
      //this.panel.echarts.option.series[i].data = this.rebuildSeriesData(this.panel.echarts.option.series[i].type, dataList[i]);
    }
    // console.log(this.panel.echarts.option.series);
    // console.groupEnd("rebuildSeries");
  }

  rebuildSeriesData(dataList) {
    // console.group("rebuildSeriesData");
    // console.log(dataList);
    const seriesData = [];
    for (var i = 0; i <= dataList.length - 1; i++) {

    }
    // switch (type) {
    //   case "line":
    //     this.forEachJSON(data, function (value, key) {
    //       if (key !== 'refId') {
    //         _.forEach(value, function (value_d, key_d) {
    //           if (_.isUndefined(seriesData[key_d])) {
    //             seriesData[key_d] = [];
    //           }
    //           seriesData[key_d].push(value_d[1]);
    //           seriesData[key_d].push(value_d[0]);
    //         });
    //       }
    //     });
    //     break;
    //   case 'scatter':
    //     this.forEachJSON(data, function (value, key) {
    //       if (key !== 'refId') {
    //         _.forEach(value, function (value_d, key_d) {
    //           if (_.isUndefined(seriesData[key_d])) {
    //             seriesData[key_d] = [];
    //           }
    //           seriesData[key_d].push(value_d[0]);
    //         });
    //       }
    //     });
    //     break;
    //   default:
    //     break;
    // }
    // console.log(seriesData);
    // console.groupEnd("rebuildSeriesData");
    return seriesData;
  }

  // 遍历json数据，读取值和关键字
  forEachJSON(obj, callback) {
    for (var key in obj) {
      callback(obj[key], key);
    }
  }
  // 添加color
  addColor() {
    if (this.panel.echarts.option.color == undefined) {
      this.panel.echarts.option.color = [];
    }
    this.panel.echarts.option.color.push('');
    this.refresh();
  }
  // 移除color
  removeColor() {
    if (this.panel.echarts.option.color !== undefined && this.panel.echarts.option.color.length > 0) {
      this.panel.echarts.option.color.pop();
    }
    this.refresh();
  }
  onDataError(err) {
    // console.group('onDataError');
    this.render();
    // console.groupEnd('onDataError');
  }

  onInitEditMode() {
    this.addEditorTab('Option', 'public/plugins/echarts-scatter-panel/partials/options.html', 2);
    this.addEditorTab('Advanced', 'public/plugins/echarts-scatter-panel/partials/advanced.html', 3);
  }
  refreshData() {
    let _this = this, xmlhttp;

    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    let data = [];
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        _this.customizeData = JSON.parse(xmlhttp.responseText);
        _this.onDataReceived();
      }
    };

    if (this.panel.IS_UCD) {
      xmlhttp.open(_this.panel.method, _this.panel.url, true);
      xmlhttp.send();
    } else {
      xmlhttp = null;
    }
    this.$timeout(() => { this.refreshData(); }, _this.panel.upInterval);
  }

  link(scope, elem, attrs, ctrl) {
    const $panelContainer = elem.find('.echarts_container')[0];
    ctrl.refreshed = true;
    function setHeight() {
      let height = ctrl.height || panel.height || ctrl.row.height;
      if (_.isString(height)) {
        height = parseInt(height.replace('px', ''), 10);
      }

      height += 0;

      $panelContainer.style.height = height + 'px';
    }
    setHeight();
    let myChart = echarts.init($panelContainer, 'dark');
    setTimeout(function () {
      myChart.resize();
    }, 1000);
    function render() {
      // console.group("render");
      if (!myChart) {
        return;
      }
      setHeight();
      myChart.resize();
      if (ctrl.refreshed) {
        myChart.clear();
        // console.log(ctrl.panel.echarts.option);
        // console.log(JSON.stringify(ctrl.panel.echarts.option));
        myChart.setOption(ctrl.panel.echarts.option, true);
        // if (ctrl.panel.echarts.option.series !== undefined) {
        //   _.forEach(ctrl.panel.echarts.option.series, function (value_s, key_s) {
        //     // 配置輔助綫
        //     if (ctrl.panel.echarts.option.series[key_s].markLine.type == 'Axis') {
        //       const xRang = myChart.getModel().getComponent('xAxis').axis.scale._extent;
        //       const yRang = myChart.getModel().getComponent('yAxis').axis.scale._extent;
        //       //console.log(xRang, yRang);
        //       // x軸平行綫
        //       ctrl.panel.echarts.option.series[key_s].markLine.data[0][0].coord[0] = myChart.getModel().getComponent('xAxis').axis.scale._extent[0];
        //       ctrl.panel.echarts.option.series[key_s].markLine.data[0][1].coord[0] = myChart.getModel().getComponent('xAxis').axis.scale._extent[1];
        //       ctrl.panel.echarts.option.series[key_s].markLine.data[0][1].coord[1] = ctrl.panel.echarts.option.series[key_s].markLine.data[0][0].coord[1];

        //       // y軸平行綫
        //       ctrl.panel.echarts.option.series[key_s].markLine.data[1][0].coord[1] = myChart.getModel().getComponent('yAxis').axis.scale._extent[0];
        //       ctrl.panel.echarts.option.series[key_s].markLine.data[1][1].coord[1] = myChart.getModel().getComponent('yAxis').axis.scale._extent[1];
        //       ctrl.panel.echarts.option.series[key_s].markLine.data[1][1].coord[0] = ctrl.panel.echarts.option.series[key_s].markLine.data[1][0].coord[0];
        //     } else if (ctrl.panel.echarts.option.series[key_s].markLine.type == null) {
        //       ctrl.panel.echarts.option.series[key_s].markLine = {};
        //     }
        //   });

        //   myChart.setOption(ctrl.panel.echarts.option, true);
        //   //console.log(ctrl.panel.echarts.option);
        // }
      }
      // console.groupEnd("render");
    }
    this.events.on('render', function () {
      render();
      ctrl.renderingCompleted();
    });
  }
}

Controller.templateUrl = 'partials/module.html';
