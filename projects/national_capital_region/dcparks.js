// DC Parks Map for parks contact info

var script = document.createElement('script');
var App;
var NPMap;

App = {
  unitNames: []
}

NPMap = {
  baseLayers: [],
  center: {
    lat: 38.894506631693275,
    lng: -77.02445983886719
  },
  div: 'map',
  hooks: {
    init: function (callback) {

      L.npmap.util._.reqwest({
        success: function (response) {
          if (response && response.rows && response.rows.length) {
            App.unitNames = response.rows;
          }
          callback();
        },
        type: 'json',
        url: 'https://nps.cartodb.com/api/v2/sql?q=SELECT parks_v2.unit_code,parks_v2.unit_name_long FROM parks_v2'
      })
    }
  },
  homeControl: true,
  locateControl: true,
  geocoderControl: true,
  maxBounds: [
    [
      38.78968338358036,
      -77.2665023803711
    ],
    [
      38.9991753950833,
      -76.78241729736327
    ]
  ],
  maxZoom: 19,
  minZoom: 10,
  scrollWheelZoom: false,
  zoom: 12,
  overlays: [{
      id: 'nps.397cfb9a,nps.53faf88d,nps.5f23ba96,nps.b13f3aa4',
      type: 'mapbox',
      name: 'D.C. parks',
      popup: function (data) {
        var unitCode = data.unit_code;
        var unitName = (function () {
          var name = '';
          for (var i = 0; i < App.unitNames.length; i++) {
            var park = App.unitNames[i];
            if (park.unit_code === unitCode) {
              name = park.unit_name_long;
              break;
            }
          }
          return name;
        })(); // end unitName function
        var html = '' +
          '<h1>' +
            '<a href="https://www.nps.gov/' + unitCode +
              '/index.htm" target="_blank_">' + unitName + '</a>' +
          '</h1>' +
          '<p>' +
            '<ul>' +
              '<li>' +
                '<a href="https://www.nps.gov/' + unitCode +
                  '/planyourvisit/index.htm" target="_blank_">Visit</a>' +
              '</li>' +
              '<li>' +
                '<a href="https://www.nps.gov/' + unitCode +
                  '/faqs.htm" target="_blank_">Frequently Asked Questions</a>' +
              '</li>' +
              '<li>' +
                '<a href="https://www.nps.gov/' + unitCode +
                  '/contacts.htm" target="_blank_">Contact us</a>' +
              '</li>' +
            '</ul>' +
          '</p>' +
        ''; // end of html
        return html;
      } // end of popup function
  }] // end of overlays
};

script.src = 'https://www.nps.gov/lib/npmap.js/3.0.17/npmap-bootstrap.min.js';
document.body.appendChild(script);
