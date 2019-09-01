import './css/leaflet.css!';
import WorldMap from './worldmap';

export default function link(scope, elem, attrs, ctrl) {
  ctrl.events.on('render', () => {
 //   console.log('render');
    render();
    ctrl.renderingCompleted();
    //setTimeout(function () { render(); }, 1000);
  });

  function render() {
    if (!ctrl.data) return;

    const mapContainer = elem.find('.mapcontainer');

    if (mapContainer[0].id.indexOf('{{') > -1) {
      return;
    }

    if (!ctrl.map) {
      ctrl.map = new WorldMap(ctrl, mapContainer[0]);
      setTimeout(function () { ctrl.map.panToMapCenter(); }, 800);
  //    console.log('new WorldMap');
      ctrl.panel.isZoomed = false;
    }

    ctrl.map.resize();

    if (ctrl.mapCenterMoved) ctrl.map.panToMapCenter();

    if (!ctrl.map.legend && ctrl.panel.showLegend) ctrl.map.createLegend();

    ctrl.map.drawCircles();

    //li.na add start at 2018.11.15
    var leafTopRight = document.getElementsByClassName("side-info-container");
    if (leafTopRight.length > 0) {
      leafTopRight = leafTopRight[0].parentNode;
      var leafTopRightHeight = leafTopRight.offsetHeight;
      if (leafTopRightHeight >= ctrl.height) {
        leafTopRight.style.height = ctrl.height + "px";
        leafTopRight.classList.add("leaflet-top-right-scroll");
        leafTopRight.style.pointerEvents = "auto";
      } else {
        leafTopRight.style.height = "auto";
        leafTopRight.classList.remove("leaflet-top-right-scroll");
      }
    }
    //li.na add end at 2018.11.15

    if (ctrl.map.circles.length > 0 && !ctrl.panel.isZoomed) {
      zoomControl();
      ctrl.panel.isZoomed = true;
    }
  }

  function zoomControl(){
      ctrl.map.map.on('zoomstart', function (e) {
      //    console.log('zoomstart')
        if(ctrl.panel.lastZoom === 0){
           ctrl.panel.lastZoom = ctrl.map.map.getZoom();
        }
      });

      ctrl.map.map.on('zoomend', function (e) {
        var radiusDelta = 1;
        if (ctrl.map.map.getZoom() - ctrl.panel.lastZoom < 0 ) {
          ctrl.panel.zoomDelta -= 0.25;
          ctrl.panel.lastZoom = ctrl.map.map.getZoom();
//          console.log('zoomDelta-0.25', ctrl.panel.zoomDelta);
        }
        if (ctrl.map.map.getZoom() - ctrl.panel.lastZoom > 0) {
          ctrl.panel.zoomDelta += 0.25;
          ctrl.panel.lastZoom = ctrl.map.map.getZoom();
//          console.log('zoomDelta+0.25', ctrl.panel.zoomDelta);
        }

        if ((ctrl.panel.zoomDelta >= 1 || ctrl.panel.zoomDelta <= -1)) {
          for (var i = 0; i < ctrl.map.circles.length; i++) {
            if((ctrl.panel.circleMaxSize!=="string" || ctrl.panel.circleMaxSize!==null) && (ctrl.panel.circleMinSize!=="string" || ctrl.panel.circleMinSize!==null)){
              var maxSize_temp = ctrl.panel.circleMaxSize;
              var minSize_temp = ctrl.panel.circleMinSize;
            }
            else{
              var maxSize_temp = ctrl.panel.circleDefaultMaxSize;
              var minSize_temp = ctrl.panel.circleDefaultMinSize;

            }
            if (ctrl.panel.zoomDelta <= -1 && ctrl.map.circles[i].getRadius()-radiusDelta >= minSize_temp) {
              ctrl.map.circles[i].setRadius( ctrl.map.circles[i].getRadius()-radiusDelta);
              ctrl.panel.circleCurrentSize = ctrl.map.circles[i].getRadius()
              //console.log('setRadius',ctrl.map.circles[i].getRadius())
              //ctrl.panel.zoomDelta = 0;

            } else if (ctrl.panel.zoomDelta >= 1 && ctrl.map.circles[i].getRadius()+radiusDelta <= maxSize_temp) {
              ctrl.map.circles[i].setRadius( ctrl.map.circles[i].getRadius()+radiusDelta);
              ctrl.panel.circleCurrentSize = ctrl.map.circles[i].getRadius()
              //console.log('setRadius',ctrl.map.circles[i].getRadius())
              //ctrl.panel.zoomDelta = 0;

            } else {
              //ctrl.panel.zoomDelta = 0;
//              console.log('zoomDelta=0', ctrl.panel.zoomDelta);
            }
          }
          ctrl.panel.zoomDelta = 0;
        }

      });
    }
}