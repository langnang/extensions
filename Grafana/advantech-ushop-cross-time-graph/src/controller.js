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
    // console.log('constructor');
    super($scope, $injector);

    var panelDefaults = {
      IS_UCD: false,
      METHODS: ['POST', 'GET'],
      ETYPE: ['line', 'pie', 'map'],
      url: '',
      method: 'POST',
      upInterval: 60000,
      format: 'Year'
    };


    panelDefaults.setOption={
      legend: {
        show:false,
        type:'plain',
        left:'auto',
        top:'bottom',
        align:'auto',
        orient:'horizontal',
        icon:'roundRect',
        data:[]
      },
      grid: {
        left: '10%',
        top:'60',
        right: '10%',
        bottom: '60',
        containLabel:false
      },
      xAxis: [{
        type: 'category',
        data: [],
        boundaryGap: false,
        splitLine : {
          show : false,
          lineStyle:{
            type:'solid',
            opacity:'0.3'
          }
        }
      }],
      yAxis: [{
        type: 'value', 
        splitLine : {
          show : false,
          lineStyle:{
            type:'solid',
            opacity:'0.3'
          }
        }
      }],
      tooltip: {
        show:false,
        trigger: 'axis',
        axisPointer:{
          type:'line'
        }
      },
      toolbox:{
        show:false,
        orient:'horizontal',
        feature:{
          magicType:{
            type:['line', 'bar','stack','tiled']
          },
          restore: {},
        },
        left:'auto',
        top:'auto'
      },
      series: [],
      color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
      animation:false

    };

    panelDefaults.spareOption={
      series:{
        type:[],
        smooth:[],
        stack:[],
        step:[],
        symbolSize:[],
        itemStyle:{
          normal:{
            lineStyle:{
              width:[]
            },
            areaStyle:{
              opacity:[]
            }
          }
        }
      }
    };

    _.defaults(this.panel, panelDefaults);
    console.log(this.panel);


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
    console.log(dataList);

    this.seriesList={dataList:dataList,xAxisOp:[],seriesOp:[]};

    if(this.panel.format==='Year'){
      this.seriesList.xAxisOp=['1/1','2/1','3/1','4/1','5/1','6/1','7/1','8/1','9/1','10/1','11/1','12/1'];
    }else if(this.panel.format==='Month'){
      this.seriesList.xAxisOp=['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
    }else if(this.panel.format==='Week'){
      this.seriesList.xAxisOp=['Mon','Tue','Wed','Thur','Fri','Sat','Sun'];
    }else if(this.panel.format==='Day'){
      this.seriesList.xAxisOp=['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
    }else if(this.panel.format==='Custom-Year'){
      for(var k in dataList[0].datapoints){
        this.seriesList.xAxisOp.push(new Date(dataList[0].datapoints[k][1]).getFullYear());
      }
    }else if(this.panel.format==='Custom-Month'){
      for(var y in dataList[0].datapoints){
        this.seriesList.xAxisOp.push(new Date(dataList[0].datapoints[y][1]).getFullYear()+"-"+(new Date(dataList[0].datapoints[y][1]).getMonth()+1));
      }
    }else if(this.panel.format==='Custom-FullMonth'){
      for(var s in dataList){
        var year=new Date(dataList[s].datapoints[0][1]).getFullYear();
        var mon=new Date(dataList[s].datapoints[0][1]).getMonth();
        if(mon!==0){
          for(var n=mon-1;n>=0;n--){
            dataList[s].datapoints.unshift([0,new Date(year+'/'+(n+1)+'/1').getTime()]);
          }
        }else{

        }
        if(dataList[s].datapoints.length<12){
          var len=dataList[s].datapoints.length;
          for(var n2=len;n2<12;n2++){
            dataList[s].datapoints.push([0,new Date(year+'/'+(n2+1)+'/1').getTime()]);
          }
        }
      }

      for(var t in dataList[0].datapoints){
        this.seriesList.xAxisOp.push(new Date(dataList[0].datapoints[t][1]).getFullYear()+"-"+(new Date(dataList[0].datapoints[t][1]).getMonth()+1));
      }

          console.log(dataList);


    }

    for(var i in dataList){
      if(this.panel.spareOption.series.type[i]==undefined){
        this.panel.spareOption.series.type[i]="line";
      }

      if(this.panel.spareOption.series.smooth[i]==undefined){
        this.panel.spareOption.series.smooth[i]=false;
      }

      if(this.panel.spareOption.series.stack[i]==undefined){
        this.panel.spareOption.series.stack[i]=false;
      }

      if(this.panel.spareOption.series.step[i]==undefined){
        this.panel.spareOption.series.step[i]=false;
      }

      if(this.panel.spareOption.series.symbolSize[i]==undefined){
        this.panel.spareOption.series.symbolSize[i]=4;
      }

      if(this.panel.spareOption.series.itemStyle.normal.lineStyle.width[i]==undefined){
        this.panel.spareOption.series.itemStyle.normal.lineStyle.width[i]=1;
      }

      if(this.panel.spareOption.series.itemStyle.normal.areaStyle.opacity[i]==undefined){
        this.panel.spareOption.series.itemStyle.normal.areaStyle.opacity[i]=0;
      }


      var tempData={
        name:dataList[i].target,
        type:this.panel.spareOption.series.type[i],
        smooth:this.panel.spareOption.series.smooth[i],
        stack:this.panel.spareOption.series.stack[i],
        step:this.panel.spareOption.series.step[i],
        symbolSize:this.panel.spareOption.series.symbolSize[i],
        itemStyle:{
          normal:{
            lineStyle:{
              width:this.panel.spareOption.series.itemStyle.normal.lineStyle.width[i]
            },
            areaStyle:{
              opacity:this.panel.spareOption.series.itemStyle.normal.areaStyle.opacity[i]
            }
          }
        },
        data:[]
      };
      this.seriesList.seriesOp.push(tempData);
      for(var j in dataList[i].datapoints){
        this.seriesList.seriesOp[i].data.push(dataList[i].datapoints[j][0]);
      }
    }


    this.refreshed = true;
    this.render();
    this.refreshed = false;
  }



  xAxis(format){

  }

  onDataError(err) {
      // console.log('onDataError');
      this.series = [];
      this.render();
    }

    onInitEditMode() {
      this.addEditorTab('Option', 'public/plugins/advantech-ushop-cross-time-graph/partials/options.html', 2);
    }

    refreshColor(i){
      console.log(i);
      console.log(this.panel.setOption.color);
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


          if(ctrl.seriesList!==undefined){
           ctrl.panel.setOption.xAxis[0].data=ctrl.seriesList.xAxisOp;
           ctrl.panel.setOption.series=ctrl.seriesList.seriesOp;
         }else{
           ctrl.panel.setOption.xAxis[0].data = [];
           ctrl.panel.setOption.series = [];
         }

         ctrl.panel.setOption.legend.data=[];
         for(var i in ctrl.panel.setOption.series){
          ctrl.panel.setOption.legend.data.push(ctrl.panel.setOption.series[i].name);
        }


        // console.log(JSON.stringify(ctrl.panel.setOption));
        myChart.setOption(ctrl.panel.setOption);
      }
    }

    this.events.on('render', function () {
      render();
      ctrl.renderingCompleted();
    });
  }
}

Controller.templateUrl = 'partials/module.html';
