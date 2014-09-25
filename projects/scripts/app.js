var App, NPMap;

App = {
  types: [
    'travelTime',
    'WCMComposite',
    'WCMNaturalQuality',
    'WCMSolitudeQuality',
    'WCMUndevelopedQuality',
    'WCMUntrammeledQuality',
    'ViewshedInsideWildernes'
  ],
  layerVisible: function() {
    var active = [],
      i;

    for (i = 0; i < this.types.length; i++) {
      var type = this.types[i];

      if (document.getElementById(type).checked) {
        active.push(type);
      }
    }

    NPMap.config.overlays[0].L.eachLayer(function(layer) {
      var properties = layer.feature.properties,
        visible = false;

      for (i = 0; i < active.length; i++) {
        if (properties[active[i]]) {
          visible = true;
          break;
        }
      }

      if (visible) {
        NPMap.config.L.addLayer(layer);
      } else {
        NPMap.config.L.removeLayer(layer);
      }
    });
  }
};

NPMap = {
  baseLayers: [
    "nps-parkTiles"
  ],
  center: {
    lat: 36.70806354647625,
    lng: -118.46145629882811
  },
  description: "Wilderness Character Rasters",
  div: "map",
  editControl: true,
  homeControl: true,
  locateControl: true,
  mapId: "c7169847-be64-461f-9623-ca7d512c3d57",
  measureControl: true,
  name: "SEKI Wilderness Character Test",
  overlays: [
    {
      layers: "0,1,2,3,4,5,6",
      opacity: 1,
      tiled: false,
      type: "arcgisserver",
      url: "http://inpsekigistest/arcgis/rest/services/SEKI/SEKI_SOCIO/MapServer",
      attribution: "{{Value}}",
      description: "SEKI SOCIO Rasters",
      name: "SEKI SOCIO Rasters",
      popup: {
        description: "{{Pixel Value}}",
        title: "{{[Pixel Value]}}"
      }
    }
  ],
  legendControl: {
    html: '<table>' +
      '<tr>' +
        '<td style="vertical-align:bottom !important;padding-right: 2px;"><input id="travelTime" name="checkLayers" onchange="App.layerVisible();return false;" type="checkbox" checked></td>' +
        '<td><label for="travelTime">Travel Time</label></td>' +
      '</tr>' +
      '<tr>' +
        '<td style="vertical-align:bottom !important; padding-right: 2px;"><input id="WCMComposite" name="checkLayers" onchange="App.layerVisible();return false;" type="checkbox" checked></td>'+
        '<td><label for="WCMComposite">WCM Composite</label></td>' +
      '</tr>' +
      '<tr>' +
        '<td style="vertical-align:bottom !important;padding-right: 2px;"><input id="WCMNaturalQuality" name="checkLayers" onchange="App.layerVisible();return false;" type="checkbox" checked ></td>'+
        '<td><label for="WCMNaturalQuality">WCM Natural Quality</label></td>' +
      '</tr>' +
            '<tr>' +
        '<td style="vertical-align:bottom !important;padding-right: 2px;"><input id="WCMSolitudeQuality" name="checkLayers" onchange="App.layerVisible();return false;" type="checkbox" checked></td>' +
        '<td><label for="WCMSolitudeQuality">WCM Solitude Quality</label></td>' +
      '</tr>' +
      '<tr>' +
        '<td style="vertical-align:bottom !important; padding-right: 2px;"><input id="WCMUndevelopedQuality" name="checkLayers" onchange="App.layerVisible();return false;" type="checkbox" checked></td>'+
        '<td><label for="WCMUndevelopedQuality">WCM Undeveloped Quality</label></td>' +
      '</tr>' +
      '<tr>' +
        '<td style="vertical-align:bottom !important;padding-right: 2px;"><input id="WCMUntrammeledQuality" name="checkLayers" onchange="App.layerVisible();return false;" type="checkbox" checked ></td>'+
        '<td><label for="WCMUntrammeledQuality">WCM Untrammeled Quality</label></td>' +
      '</tr>' +
      '<tr>' +
        '<td style="vertical-align:bottom !important;padding-right: 2px;"><input id="ViewshedInsideWilderness" name="checkLayers" onchange="App.layerVisible();return false;" type="checkbox" checked ></td>'+
        '<td><label for="ViewshedInsideWildernes">Viewshed Inside Wilderness</label></td>' +
      '</tr>' +
    '</table>',
    position: 'bottomleft'
  }
};

var s = document.createElement('script');
s.src = 'http://www.nps.gov/npmap/npmap.js/2.0.0/npmap-bootstrap.min.js';
document.body.appendChild(s);
