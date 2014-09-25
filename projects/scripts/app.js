var App, NPMap;

App = {
  types: [
    "SEKI_SOCIO_TravelTime",
    "SEKI_SOCIO_WCMComposite",
    "SEKI_SOCIO_WCMNaturalQuality",
    "SEKI_SOCIO_WCMSolitudeQuality",
    "SEKI_SOCIO_WCMUndevelopedQuality",
    "SEKI_SOCIO_WCMUntrammeledQuality",
    "SEKI_SOCIO_ViewshedInsideWildernes"
  ]
};

var NPMap = {
  baseLayers: [
    "nps-parkTiles"
  ],
  "center": {
    lat: "36.70806354647625",
    lng: "-118.46145629882811"
  },
  description: "Wilderness Character Rasters",
  div: "map",
  editControl: true,
  homeControl: true,
  hooks: {
    preinit: function(callback) {
      L.npmap.util._.reqwest({
        success: function(response) {

            layerVisible = function(){
              var active = [],
              overlay = NPMap.config.overlays[0],
              i;

              for (i = 0; i < App.types.length; i++) {
                var type = App.types[i];

              if (document.getElementById(type).checked) {
                active.push(type);
              }
            }

            for (i = 0; i < response.layers.length; i++) {
              var layer = response.layers[i];

                if (layer.name.indexOf(active) === -1){
                  layer.defaultVisibility = true;
                } else {
                  layer.defaultVisibility = false;
                }

              if (layer.defaultVisibility) {
                NPMap.config.L.addLayer(overlay.L);
              } else {
                NPMap.config.L.removeLayer(overlay.L);
              }
           }
          }

          var html = '<table>',
          i;

          for (i = 0; i < response.layers.length; i++) {
            var layer = response.layers[i],
            name = layer.name;

            if (name === 'SEKI_SOCIO_ViewshedInsideWildernes') {
              html += '' +
              '<tr>' +
              '<td style="vertical-align:bottom !important;padding-right: 2px;"><input id="' + name + '" name="checkLayers" onchange="layerVisible();return false;" type="checkbox" checked></td>' +
              '<td><label for="'+ name + '">'+ name.splice(0,10) + '</label></td>' +
            '</tr>'
            } else {
              html += '' +
              '<tr>' +
              '<td style="vertical-align:bottom !important;padding-right: 2px;"><input id="' + name + '" name="checkLayers" onchange="layerVisible();return false;" type="checkbox"></td>' +
              '<td><label for="'+ name + '">'+ name + '</label></td>' +
            '</tr>'
            }
          };

          NPMap.config.legendControl = {
            html: html + '</table>',
            position: 'bottomleft'
          };
        callback();
      },
      type: 'jsonp',
      url: 'http://inpsekigistest/arcgis/rest/services/SEKI/SEKI_SOCIO/MapServer/?f=json'
    })
   }
  },
  locateControl: true,
  mapId: "c7169847-be64-461f-9623-ca7d512c3d57",
  measureControl: true,
  name: "SEKI Wilderness Character Test",
  overlays: [{
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
  }],
  printControl: true,
  smallzoomControl: true,
  zoom: 9
};

var s = document.createElement('script');
s.src = 'http://www.nps.gov/npmap/npmap.js/2.0.0/npmap-bootstrap.min.js';
document.body.appendChild(s);
