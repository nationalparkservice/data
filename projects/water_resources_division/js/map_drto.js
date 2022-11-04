var App, NPMap;

App = {
  types: [
    'Boundaries',
    'Keys',
    'Moorings',
    'Navigation',
    'Swim Areas',
    'Wrecks'
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
    lat: 24.62,
    lng: -82.9
  },
  //detectAvailablePopupSpace: false,
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

		NPMap.config.overlays.push({type: 'cartodb', user: 'calarcon', table: name, name: formalName, sql: 'SELECT * FROM ' + name + ' ORDER BY cartodb_id', popup: { description: '{{{popupinfo}}}', title: '{{name}}' }});

        var layer = NPMap.config.overlays[i];

        switch (name) {

        case 'boundaries':
		  styling = '#boundaries{ [name="Dry Tortugas National Park"] { [zoom<16]{ line-width: 2; line-color: #b2df8a; polygon-fill: #b2df8a; polygon-opacity: 0.1; line-opacity: 0.8; } [zoom>=16]{ line-width: 2; line-color: #b2df8a; line-opacity: 0.8; } } [name="Research Natural Area"] { [zoom>=12][zoom<16]{ line-width: 1; line-color: #07e1f2; polygon-fill: #07e1f2; polygon-opacity: 0.1; line-opacity: 0.8; } [zoom>=16] { line-width: 1; line-color: #07e1f2; line-opacity: 0.8; } } [name="Historic Adaptive Use Zone"] { [zoom>=12][zoom<16]{ line-width: 1; line-color: #FF6600; polygon-fill: #FF6600; polygon-opacity: 0.1; line-opacity: 0.8; } [zoom>=16]{ line-width: 1; line-color: #FF6600; line-opacity: 0.8; } } } #boundaries-labels{ [name="Dry Tortugas National Park"] { text-name: [name]; text-face-name: "Open Sans Bold"; text-size: 14; text-fill: #b2df8a; text-halo-fill: fadeout(black, 30%); text-halo-radius: 2; text-wrap-width: 80; text-placement: line; text-allow-overlap: false; text-dy: -10; text-dx: -10; } [zoom>=12][name="Research Natural Area"] { text-name: [name]; text-face-name: "Open Sans Bold"; text-size: 12; text-fill: #07e1f2; text-halo-fill: fadeout(black, 30%); text-halo-radius: 2; text-wrap-width: 40; text-placement: line; text-allow-overlap: false; text-dy: -10; text-dx: -10; } [zoom>=12][name="Historic Adaptive Use Zone"] { text-name: [name]; text-face-name: "Open Sans Bold"; text-size: 12; text-fill: #FF6600; text-halo-fill: fadeout(black, 30%); text-halo-radius: 2; text-wrap-width: 60; text-placement: line; text-allow-overlap: false; text-dy: -10; text-dx: -10; } } #specialprotectionzones{ [zoom>=14][kind="area"]{ line-width: 1; line-color: #FFCC00; polygon-fill: #ff7c00; polygon-opacity: 0.3; line-opacity: 0.8} [zoom>=16][kind="buoy"]{ marker-line-color: #000000; marker-fill: #ff7c00; } } #buoys[zoom>=14]{[kind="Boundary"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/yellow_can.png); marker-transform:"scale(.5)"; marker-allow-overlap: true;} [kind="Research Natural Area"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/yellow_can.png); marker-transform:"scale(.5)"; marker-allow-overlap: true;} [kind="Historic Adaptive Use"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/yellow_can.png); marker-transform:"scale(.5)"; marker-allow-overlap: true;}}';
          break;
        case 'keys':
          styling = '#keys[zoom>=12][status!="other"]{ line-width: 1; polygon-fill: #878e85; polygon-opacity: 0.1; line-opacity: 0.8; text-name: [name]; text-face-name: "DejaVu Sans Book"; text-size: 10; text-fill: white; text-halo-radius: 1; text-wrap-width: 10; text-placement: interior; [status="open"]{ line-color: #229A00; text-halo-fill: fadeout(#229A00, 30%); }[status="closed"]{ line-color: #F11810; text-halo-fill: fadeout(#F11810, 30%); } [status="closed_partial"]{ line-color: #FFCC00; text-halo-fill: fadeout(#FF9900, 30%); } } #other[zoom>=16]{ [status="other"]{ line-width: 1; line-color: yellow; polygon-fill: #FFCC00; polygon-opacity: 0.1; line-opacity: 0.8; text-name: [name]; text-face-name: "DejaVu Sans Book"; text-size: 10; text-fill: white; text-halo-fill: fadeout(#000000, 30%); text-halo-radius: 1; text-wrap-width: 9; text-placement: interior;}}';
          break;
        case 'moorings':
          styling = '#moorings[zoom>=13]{[unitcode="DRTO"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/mooring_buoy_small.png); marker-transform:"scale(.5)";}}';
          break;
        case 'navigation':
          styling = '#navigation[zoom>=13]{[type="Green daymark"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/greendaymarker.png);} [type="Red daymark"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/reddaymarker.png);} [type="White daymark"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/daymarker.png);} [type="Daybeacon"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/daybeacon.png);} [type="Iowa Rock"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/drto_buoys.png);} [type="Channel"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/drto_buoys.png); marker-transform:"scale(.65)";} [type="Light"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/light.png);} [type="Lighthouse"]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/lighthouse.png);}}';
          break;
        case 'swimareas':
          styling = '#swimareas{[type="area"][zoom>=13]{line-width: 1; line-color: #F11810; polygon-fill: #00bfff; polygon-opacity: 0.6; line-opacity: 0.8} [type="buoy"][zoom>=16]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/swim_buoy.png); marker-transform:"scale(.25)";}}';
          break;
        case 'wrecks':
          styling = '#wrecks[zoom>=13]{marker-file: url(https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/drto_wrecks.png);}';
          break;
		}
       
		layer.cartocss = styling;
        
        L.npmap.util._.appendCssFile('https://www.nps.gov/orgs/1439/upload/map.css');
		
        html += '<table>' +
          '<tr>' +
		  '<td class="box"><input id="' + name + '" name="checkLayers" onchange="App.checkChange(this.id, this.checked);return false;" type="checkbox"></td>' +
          '<td class="labelName"><label class="labelName" for="'+ name + '">'+ formalName + '</label></td>' +
		  '<td><div class="symbol"><img class="symbol" src="https://nationalparkservice.github.io/data/projects/water_resources_division/symbols/drto_'+ name + '.png"></div></td>' +
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
  maxZoom: 17,
  zoom: 11,
};

var s = document.createElement('script');
s.src = 'https://www.nps.gov/lib/npmap.js/3.0.17/npmap-bootstrap.min.js';
document.body.appendChild(s);
