var connections = require('./connections');

var sync = async function(source, dest, options) {
  // Load dataConnections
  var dataConnections = [source, dest].map(connection => connections[connection.type](connection));

  var db = await dataConnections[1].read();
  console.log(db);

  var db2 = await dataConnections[0].write(db);

  // var closed = await dataConnections[1].close();
  // var closed0 = await dataConnections[0].close();
  console.log(db2);

  // Get Updates
  // Get all the IDs from source
  // Get all the IDs from dest
  // Get most recent update from dest
  // If id is in source and not dest, then create insert
  // If id is in dest and not source, then create delete
  // get data where source has been updated since dest was last updated
  // get data for ids that will be updated
  // create the create, update, remove object
  // apply the object to the destination

};

var _sourceA = {
  'type': 'arcgis',
  'connection': {
    "url": "https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Recreation_WebMercator/MapServer/9"
  }
};
var sourceA = {
  'type': 'postgres',
  'connection': {
    "host": `${process.env['PGHOSTADDR']}`,
    "port": `${process.env['PGPORT']}`,
    "password": `${process.env['PGPASSWORD']}`,
    "user": `${process.env['PGUSER']}`,
    "database": `${process.env['PGDATABASE']}`,
    "table": "external_dc_park_rec_areas_2"
  }
};

var destA = {
  'type': 'postgres',
  'connection': {
    "host": `${process.env['PGHOSTADDR']}`,
    "port": `${process.env['PGPORT']}`,
    "password": `${process.env['PGPASSWORD']}`,
    "user": `${process.env['PGUSER']}`,
    "database": `${process.env['PGDATABASE']}`,
    "table": "external_dc_park_rec_areas"
  }
};


var test = function() {
  sync(sourceA, destA, {});
};
test();
