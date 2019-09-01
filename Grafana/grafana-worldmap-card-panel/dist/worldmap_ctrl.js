"use strict";System.register(["app/plugins/sdk","app/core/time_series2","app/core/utils/kbn","./cardwidth","lodash","./map_renderer","./data_formatter","./css/worldmap-card-panel.css!"],function(a,b){function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function d(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function e(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var f,g,h,i,j,k,l,m,n,o,p,q;return{setters:[function(a){f=a.MetricsPanelCtrl},function(a){g=a["default"]},function(a){h=a["default"]},function(a){i=a["default"]},function(a){j=a["default"]},function(a){k=a["default"]},function(a){l=a["default"]},function(a){}],execute:function(){m=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),n={maxDataPoints:1,mapCenter:"(0°, 0°)",mapCenterLatitude:0,mapCenterLongitude:0,initialZoom:3,valueName:"total",cityName:"select hostName",linkData:[{cityName:" ",detailName:" ",httpUrl:" "}],circleDefaultMinSize:4,circleMinSize:"",circleCurrentSize:4,circleDefaultMaxSize:30,circleMaxSize:"",zoomDelta:0,lastZoom:0,isZoomed:!1,locationData:"countries",thresholds:"0,10",colors:["rgba(12,201,12, 0.8)","rgba(255,183,0, 0.8)","rgba(255,35,30, 0.8)"],unitSingle:"",unitPlural:"",showLegend:!1,esMetric:"Count",decimals:0,hideEmpty:!1,hideZero:!1,stickyLabels:!1,ocean:"#ADADAD",boundaryStroke:"#ADADAD",boundaryFill:"#2B2B2C",countryBoundary:"#ADADAD",oceanEnable:!0,boundaryEnable:!0,locationList:[],dataList:[],dataMax:"",dataMin:"",adjFontSize:!0,FontSize:"70%",cardwidth:"90%",cards:[{title:"Title",location:"",circleColor:"rgba(90, 200, 250, 0.8)",thresholdsOption:!1,thresholdsValue:"",thresholdsData:"",thresholdsDataIndex:"",thresholdstmp:[],thresholdsLabel:"",thresholdsIndex:0,link:"",sideDisplay:!0,sideContent:"",data:[],circleValue:"",cardItems:[{name:"item title",value:null,dataIndex:null,cardData:null,type:"caption",bgColor:"rgba(30, 30, 30, 0.8)",color:"#00FFFF",link:"",dataTag:"",decimals:null,postfix:null}]}]},o=new Array,p={"(0°, 0°)":{mapCenterLatitude:0,mapCenterLongitude:0},"North America":{mapCenterLatitude:40,mapCenterLongitude:-100},Europe:{mapCenterLatitude:46,mapCenterLongitude:14},"West Asia":{mapCenterLatitude:26,mapCenterLongitude:53},"SE Asia":{mapCenterLatitude:10,mapCenterLongitude:106},"Last GeoHash":{mapCenterLatitude:0,mapCenterLongitude:0}},q=function(a){function b($scope,$injector,contextSrv){c(this,b);var a=d(this,(b.__proto__||Object.getPrototypeOf(b)).call(this,$scope,$injector));return a.cardTypes=[{text:"Caption",value:"caption"},{text:"Data",value:"data"},{text:"Information",value:"info"}],a.fontCalc=[{text:"60%",value:"0.6vw"},{text:"70%",value:"0.8vw"},{text:"80%",value:"1vw"},{text:"100%",value:"1.4vw"},{text:"110%",value:"1.6vw"},{text:"120%",value:"1.8vw"},{text:"130%",value:"2vw"},{text:"140%",value:"2.2vw"},{text:"150%",value:"2.4vw"},{text:"160%",value:"2.6vw"},{text:"180%",value:"3vw"},{text:"200%",value:"3.4vw"},{text:"220%",value:"3.8vw"},{text:"230%",value:"4vw"}],a.cardWidthList=i.defaultValues,a.cardWidthChange=i.cardWidthChange,a.setMapProvider(contextSrv),j.defaults(a.panel,n),a.dataFormatter=new l(a,h),a.events.on("init-edit-mode",a.onInitEditMode.bind(a)),a.events.on("data-received",a.onDataReceived.bind(a)),a.events.on("panel-teardown",a.onPanelTeardown.bind(a)),a.events.on("data-snapshot-load",a.onDataSnapshotLoad.bind(a)),a.loadLocationDataFromFile(),a}return e(b,a),m(b,[{key:"setMapProvider",value:function(contextSrv){this.tileServer=contextSrv.user.lightTheme?"CartoDB Positron":"CartoDB Dark",this.setMapSaturationClass()}},{key:"getCityNameOptions",value:function(a){return this.mapToTextValue(o)}},{key:"setMapSaturationClass",value:function(){"CartoDB Dark"===this.tileServer?this.saturationClass="map-darken":this.saturationClass=""}},{key:"loadLocationDataFromFile",value:function(a){var b=this;if(!this.map||a){if(this.panel.snapshotLocationData)return void(this.locations=this.panel.snapshotLocationData);if("jsonp endpoint"===this.panel.locationData){if(!this.panel.jsonpUrl||!this.panel.jsonpCallback)return;window.$.ajax({type:"GET",url:this.panel.jsonpUrl+"?callback=?",contentType:"application/json",jsonpCallback:this.panel.jsonpCallback,dataType:"jsonp",success:function(a){b.locations=a,b.render()}})}else if("json endpoint"===this.panel.locationData){if(!this.panel.jsonUrl)return;window.$.getJSON(this.panel.jsonUrl).then(function(a){b.locations=a,b.render()})}else"table"===this.panel.locationData||"geohash"!==this.panel.locationData&&"json result"!==this.panel.locationData&&"json scada"!==this.panel.locationData&&"json rmm"!==this.panel.locationData&&window.$.getJSON("public/plugins/grafana-worldmap-card-panel/data/"+this.panel.locationData+".json").then(this.reloadLocations.bind(this))}}},{key:"reloadLocations",value:function(a){this.locations=a,this.refresh()}},{key:"onPanelTeardown",value:function(){this.map&&this.map.remove()}},{key:"onInitEditMode",value:function(){this.addEditorTab("Worldmap","public/plugins/grafana-worldmap-card-panel/partials/editor.html",2),this.addEditorTab("WISE-PaaS","public/plugins/grafana-worldmap-card-panel/partials/WISE-PaaS.html",3)}},{key:"onDataReceived",value:function(a){if(a){var b=JSON.stringify(this.panel.linkData);this.panel.linkData=JSON.parse(b),this.dashboard.snapshot&&this.locations&&(this.panel.snapshotLocationData=this.locations);var c=[];if("geohash"===this.panel.locationData)this.dataFormatter.setGeohashValues(a,c);else if("table"===this.panel.locationData){var d=a.map(l.tableHandler.bind(this));this.dataFormatter.setTableValues(d,c)}else"json result"===this.panel.locationData?(this.series=a,this.dataFormatter.setJsonValues(c)):"json scada"===this.panel.locationData?(this.series=a,this.dataFormatter.setJsonScada(c)):"json rmm"===this.panel.locationData?(this.series=a,this.dataFormatter.setJsonRMM(c)):(this.series=a.map(this.seriesHandler.bind(this)),this.dataFormatter.setValues(c));this.data=c,this.data.length&&"Last GeoHash"===this.panel.mapCenter?this.centerOnLastGeoHash():this.render(),o=[];for(var e=0;e<c.length;e++)o.push(c[e].locationName)}}},{key:"centerOnLastGeoHash",value:function(){p[this.panel.mapCenter].mapCenterLatitude=j.last(this.data).locationLatitude,p[this.panel.mapCenter].mapCenterLongitude=j.last(this.data).locationLongitude,this.setNewMapCenter()}},{key:"onDataSnapshotLoad",value:function(a){this.onDataReceived(a)}},{key:"seriesHandler",value:function(a){var b=new g({datapoints:a.datapoints,alias:a.target});return b.flotpairs=b.getFlotPairs(this.panel.nullPointMode),b}},{key:"setNewMapCenter",value:function(){"custom"!==this.panel.mapCenter&&(this.panel.mapCenterLatitude=p[this.panel.mapCenter].mapCenterLatitude,this.panel.mapCenterLongitude=p[this.panel.mapCenter].mapCenterLongitude),this.mapCenterMoved=!0,this.render()}},{key:"setZoom",value:function(){this.map.setZoom(this.panel.initialZoom||1)}},{key:"onChangeCityName",value:function(){this.refresh()}},{key:"toggleLegend",value:function(){this.panel.showLegend||this.map.removeLegend(),this.render()}},{key:"toggleStickyLabels",value:function(){this.map.clearCircles(),this.render()}},{key:"changeThresholds",value:function(){this.render()}},{key:"changeLocationData",value:function(){this.loadLocationDataFromFile(!0),"geohash"===this.panel.locationData&&this.render(),this.refresh()}},{key:"addCard",value:function(){var a={title:"Title",location:"",circleColor:"rgba(90, 200, 250, 0.8)",thresholdsOption:!1,thresholdsValue:"",thresholdsData:"",thresholdsDataTag:"",thresholdstmp:[],thresholdsIndex:0,link:"",sideDisplay:!0,sideContent:"",data:[],cardItems:[]};this.panel.cards.push(a),this.refresh()}},{key:"removeCard",value:function(a){this.panel.cards.splice(a,1),this.refresh()}},{key:"addCardItem",value:function(a){var b={name:"item title",value:null,dataIndex:null,cardData:null,type:"caption",bgColor:"rgba(30, 30, 30, 0.8)",color:"#00FFFF",link:"",dataTag:""};this.panel.cards[a].cardItems.push(b),this.refresh()}},{key:"deleteCardItem",value:function(a,b){this.panel.cards[a].cardItems.splice(b,1),this.render()}},{key:"addLinked",value:function(){var a={cityName:"",detailName:"",httpUrl:""};this.panel.linkData.push(a),this.refresh()}},{key:"removeLink",value:function(a){this.panel.linkData.splice(a,1),this.refresh()}},{key:"mapToTextValue",value:function(a){return j.map(a,function(a,b){return a&&a.text&&a.value?{text:a.text,value:a.value}:j.isObject(a)?{text:a,value:b}:{text:a,value:a}})}},{key:"link",value:function(a,b,c,d){k(a,b,c,d)}}]),b}(f),a("default",q),q.templateUrl="module.html"}}});
//# sourceMappingURL=worldmap_ctrl.js.map