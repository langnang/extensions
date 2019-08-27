import { MetricsPanelCtrl } from 'app/plugins/sdk';
import _ from 'lodash';
import kbn from 'app/core/utils/kbn';
import $ from 'jquery';
import echarts from './libs/echarts.min';
import './libs/dark';
import './style.css!';
// import './libs/china.js';
import './libs/bmap.js';
import './libs/getBmap.js';

import { DataProcessor } from './data_processor';
import DataFormatter from './data_formatter';

export class Controller extends MetricsPanelCtrl {

  constructor($scope, $injector) {
    super($scope, $injector);

    var panelDefaults = {
      IS_UCD: false,
      url: '',
      method: 'POST',
      upInterval: 60000,
      format: 'Year'
    };


    panelDefaults.setOption={
      series: []
    };
    panelDefaults.spareOption={
      pieType:"Pie"
    };

    _.defaults(this.panel, panelDefaults);

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
    this.seriesList={dataList:dataList,seriesOp:[]};

    if(this.panel.spareOption.pieType=="Doughnut"){
      this.seriesList.seriesOp.push({
        type:"pie",
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },data:[]});
    }else{
      this.seriesList.seriesOp.push({type:"pie",data:[]});

    }


    for(var i in dataList[0].datapoints){
      this.seriesList.seriesOp[0].data.push({value:dataList[0].datapoints[i][0],name:dataList[0].datapoints[i][1]});
    }
    this.refreshed = true;
    this.render();
    this.refreshed = false;
  }

  onDataError(err) {
    this.series = [];
    this.render();
  }

  onInitEditMode() {
    this.addEditorTab('Option', 'public/plugins/empty-panel/partials/options.html', 2);
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
      if (!myChart) {
        return;
      }
      setHeight();
      myChart.resize();

      if (ctrl.refreshed) {
        myChart.clear();

        let option = ctrl.panel.setOption;

        if(ctrl.seriesList!==undefined){
          option.series=ctrl.seriesList.seriesOp;
        }else{
          option.series = [];
        }

        myChart.setOption(option);
      }
    }

    this.events.on('render', function () {
      render();
      ctrl.renderingCompleted();
    });
  }
}

Controller.templateUrl = 'partials/module.html';
