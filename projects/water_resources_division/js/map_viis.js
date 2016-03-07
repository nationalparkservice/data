var App, NPMap;

App = {
  types: [
    'Anchoring',
    'Avoid Areas',
    'Bays',
    'Beach Access',
    'Boundaries',
    'Fee Pay Stations',
    'Moorings',
    'Snorkeling Areas',
    'Visitor Center'
  ],
  
  checkChange: function(id, checked){
    var overlay = (function(){
      for (var i = 0; i < NPMap.config.overlays.length; i++) {
        if (NPMap.config.overlays[i].table === id) {
          return NPMap.config.overlays[i];
        }
      }
    })();

    if (checked) {
      overlay.L.addTo(NPMap.config.L);
    } else {
      NPMap.config.L.removeLayer(overlay.L);
    }
  }
};

var NPMap = {
  baseLayers: [
    'esri-imagery',
    'nps-parkTilesImagery',
    'nps-parkTiles'
  ],
  center: {
    lat: 18.3105292,
    lng: -64.764404
  },
  detectAvailablePopupSpace: false,
  div: 'map',
  fullscreenControl: true,
  homeControl: true,
  hooks: {
    preinit: function(callback) {
      var html = '';
      NPMap.config.overlays = [];

      for (var i=0; i< App.types.length; i++){
        var name = App.types[i].toLowerCase().replace(/\s/g, ''),
          formalName = App.types[i];

		NPMap.config.overlays.push({type: 'cartodb', user: 'npswrd', table: name, name: formalName, popup: { description: '{{{popupinfo}}}', title: '{{name}}' }});

        var layer = NPMap.config.overlays[i];

        switch (name) {
          case 'anchoring':
            styling = '#anchoring{[layer="Anchor Points"][zoom>=14]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/anchor_point.png); [zoom<=12]{marker-transform:"scale(1)";} [zoom=13]{marker-transform:"scale(.75)";} [zoom>=14]{marker-transform:"scale(.5)"; marker-allow-overlap: true;}} [layer="Anchorages"]{line-width: 1.5; line-color: #FF5C00; polygon-fill: #FFFFFF; polygon-opacity: 0.3; line-opacity: 0.8}}';
          break;
          case 'avoidareas':
            styling = '#avoidareas{[name="Johnson\'s Reef Grounding Hazard"]{line-width: 1.5; line-color: #F11810; polygon-fill: #F11810; polygon-opacity: 0.3; line-opacity: 0.8} [name!="Johnson\'s Reef Grounding Hazard"]{line-width: 1; line-color: #F11810; polygon-fill: #00bfff; polygon-opacity: 0.3; line-opacity: 0.8} [layer="Demarcation Buoys"][zoom>=15]{[name="Swim Area"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/swim_buoy.png); marker-transform:"scale(.25)";} [name="Reef"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/boundary_buoy.png); marker-transform:"scale(.75)";} [name="Reef (yellow)"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/yellow_can.png); marker-transform:"scale(.7)";} [name="Reef (green)"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/green_usgs_buoy.png); marker-transform:"scale(.75)";}}}';
          break;
          case 'bays':
		  styling = '#bays{[zoom>=14]{text-name: [name]; text-face-name: "DejaVu Sans Book"; text-size: 10; text-fill: white; text-halo-fill: fadeout(black, 30%); text-halo-radius: 1; text-wrap-width: 10; text-placement: point;}}';
          break;
          case 'beachaccess':
            styling = '#beachaccess{[layer="Beach Access Channels"]{line-width: 1; line-color:#474646; polygon-fill:#FFCC00; polygon-opacity:0.3; line-opacity:0.8;} [layer="Channel Markers"]{[name="Green Channel Marker"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/green_marker.png);} [name="Red Channel Marker"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/red_marker.png);} [zoom<=14]{marker-transform:"scale(0.75)";} [zoom>=15]{marker-transform:"scale(0.5)"; marker-allow-overlap: true;}}}';
          break;
          case 'boundaries':
            styling = '#boundaries{[layer="Boundaries"]{[name="Virgin Islands Coral Reef National Monument - Northshore"]{line-width: 3.5; line-color: #FF6600; polygon-fill: #878e85; polygon-opacity: 0; line-opacity: 0.8;} [name="Virgin Islands Coral Reef National Monument - South Side"]{line-width: 3.5; line-color: #FF6600; polygon-fill: #878e85; polygon-opacity: 0; line-opacity: 0.8;} [name="Virgin Islands Coral Reef National Monument - Hurricane Hole (No-Anchor Zone)"]{line-width: 3.5; line-color: #FF6600; polygon-fill: #878e85; polygon-opacity: 0; line-opacity: 0.8;} [name="Virgin Islands National Park"]{line-width: 3.5; line-color: #229A00; polygon-fill: #229A00; polygon-opacity: 0; line-opacity: 0.8;} [name="Virgin Islands National Park - Northshore (Anchoring permitted only within one of two designated anchorages, offshore Francis Bay & Lind Point)"]{line-width: 1; line-color: #A53ED5; polygon-fill: #878e85; polygon-opacity: 0.3; line-opacity: 0.8;} [name="Virgin Islands National Park - Southshore (No-Anchor Zone)"]{line-width: 1; line-color: #A53ED5; polygon-fill: #878e85; polygon-opacity: 0.3; line-opacity: 0.8;}} [layer="Boundary Buoys"][zoom>=14]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/boundary_buoy.png);}} #boundaries-labels{[park="Virgin Islands Coral Reef National Monument"]{text-name: [park]; text-face-name: "Graduate Regular"; text-size: 12; text-fill: white; text-halo-fill: fadeout(orange, 30%); text-halo-radius: 2; text-wrap-width: 60; text-placement: interior;} [park="Virgin Islands National Park"] {text-name: [park]; text-face-name: "Graduate Regular"; text-size: 12; text-fill: white; text-halo-fill: fadeout(green, 30%); text-halo-radius: 2; text-wrap-width: 60; text-placement: interior;}}';
          break;
          case 'moorings':
            styling = '#moorings{[name="Boat Mooring (60\' or less)"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/mooring_buoy_small.png);} [name="Boat Mooring (61\' - 100\')"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/mooring_buoy_large.png);} [name="Commercial Mooring"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/commercial_mooring.png);} [name="Concessionaire Mooring"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/concessionaire_mooring.png);} [name="Dinghy Tether Mooring"]{marker-file: url(http://www.nps.gov/orgs/1439/images/dinghy_tether_1.png);} [name="Fishing Mooring"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/fishing_mooring.png);} [name="Hurricane Mooring"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/hurricane_mooring.png);} [name="SCUBA Mooring"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/scuba_mooring.png);} [zoom<=12] {marker-transform:"scale(.4)";} [zoom>12] {marker-transform:"scale(.35)";} [zoom>=17] {marker-transform:"scale(.3)"; marker-allow-overlap: true;}}';
          break;
          case 'feepaystations':
            styling = '#feepaystations{[name="Floating Fee Station"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/fee_station_floating.png);} [name="Land-based Fee Station"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/fee_station_land_based.png);} [zoom<=13]{marker-allow-overlap: true;} [zoom>=14]{marker-transform:"scale(0.75)";}}';
          break;
          case 'snorkelingareas':
            styling = '#snorkelingareas{line-width: 1; line-color: #FFCC00; polygon-fill: #ff7c00; polygon-opacity: 0.3; line-opacity: 0.8}';
          break;
          case 'visitorcenter':
            styling = '#visitorcenter{[layer="Visitor Center"]{line-width: 1; line-color: #0066ff; polygon-fill: #FFFFFF; polygon-opacity: 0.3; line-opacity: 0.8;} [layer="Buildings"]{[name="Men\'s Bathroom"] {marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/man.png);} [name="Women\'s Bathroom"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/woman.png);} [name="National Park Visitor\'s Center"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/visitor_center.png);} [zoom<=12] {marker-transform:"scale(1)";} [zoom>=13] {marker-transform:"scale(0.75)";} [zoom>=17] {marker-transform:"scale(.5)"; marker-allow-overlap: true;}}}';
          break;
		}

        layer.cartocss = styling;

        L.npmap.util._.appendCssFile('http://www.nps.gov/orgs/1439/upload/map.css');

        html += '<table class="legend">' +
          '<tr>' +
          '<td class="box"><input id="' + name + '" name="checkLayers" onchange="App.checkChange(this.id, this.checked);return false;" type="checkbox"></td>' +
          '<td class="labelName"><label class="labelName" for="'+ name + '">'+ formalName + '</label></td>' +
          '<td><div class="symbol"><img class="symbol" src="https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/'+ name + '.png"></div></td>' +
          '</tr>'
      }
      NPMap.config.legendControl = {
        html: html + '</table>',
        position: 'bottomleft'
      };
      callback();
    },
	init: function(callback){
    for (var i = 0; i < NPMap.config.overlays.length; i++) {
    	NPMap.config.L.removeLayer(NPMap.config.overlays[i].L);
	  };
		callback();
    }
  },
  locateControl: {
    circlePadding: [100, 100],
    follow: true,
    locateOptions: {
      enableHighAccuracy: true
    }
  },
  maxZoom: 18,
  zoom: 12,
};

var s = document.createElement('script');
s.src = 'http://www.nps.gov/lib/npmap.js/3.0.12/npmap-bootstrap.min.js';
document.body.appendChild(s);