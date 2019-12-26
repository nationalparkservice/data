// Get Updates¶
// Get all the IDs from source¶
// Get all the IDs from dest¶
// Get most recent update from dest¶
// If id is in source and not dest, then create insert¶
// If id is in dest and not source, then create delete¶
// get data where source has been updated since dest was last updated¶
// get data for ids that will be updated¶
// create the create, update, remove object¶
// apply the object to the destination¶$
//

const ogr2ogr = require('ogr2ogr');
const path = require('path');
const os = require('os');
const fs = require('fs');

var TempFiles = function() {
  var files = [];
  var failed = [];
  var removeFile = async function(path) {
    files = files.filter(file => file === path);
    try {
      await fs.unlink(path);
    } catch (e) {
      failed.push(path);
    }
    return path;
  };

  return {
    addFile: function(name) {
      var fileName = name || Math.random().toString(35).substr(2);
      return files[
        (files.push(path.join(os.tmpdir(), fileName)) - 1)
      ];
    },
    removeFile: removeFile,
    removeAll: async function(exceptions) {
      exceptions = exceptions ? (typeof exceptions === 'object' ? exceptions : [exceptions]) : [];
      return await Promise.all(files.filter(file => exceptions.indexOf(file) === -1).map(file => removeFile(file)));
    }
  };
};

module.exports = {
  'arcgis': function(source) {
    return {
      'read': async function(where, options) {

        var connectionString = `${source}/query?/${params}`;
        var result = ogr2ogr(connectionString)
        options = options || [];
        where = where || 'true';
        options = options.concat(['-sql', `SELECT * FROM "${source.connection.table}" WHERE ${where}`]);
        var path = files.addFile();
        return ogr2ogr(connectionString)
          .options(options)
          .format('SQlite')
          .skipfailures()
          .destination(path)
          .promise().then(x =>
            path);
      },
      'readIDs': {},
      'write': undefined
    }
  },
  'postgres': function(source) {
    var files = new TempFiles();
    var connectionString = `PG:dbname='${source.connection.database}' host='${source.connection.host}' port='${source.connection.port}' user='${source.connection.user}'`;
    return {
      'read': async function(where, options) {
        var result = ogr2ogr(connectionString)
        options = options || [];
        where = where || 'true';
        options = options.concat(['-sql', `SELECT * FROM "${source.connection.table}" WHERE ${where}`]);
        var path = files.addFile();
        return ogr2ogr(connectionString)
          .options(options)
          .format('SQlite')
          .skipfailures()
          .destination(path)
          .promise().then(x =>
            path);
      },
      'readIDs': async function(primaryKey, where, options) {},
      'write': async function(path, options) {
        var result = ogr2ogr(connectionString)
        options = options || [];
        options = options.concat(['-append', '-update', '-nln', `${source.connection.table}`, '-lco', 'PRECISION=NO', '-sql', 'SELECT * FROM sql_statement']);
        return ogr2ogr(path)
          .options(options)
          .format('PostgreSQL')
          .destination(connectionString)
          .promise().catch(e => console.log(e)).then(x =>
            x);
      },
      'close': async function() {
        return await files.removeAll();
      }
    };
  },
  'sqlite': {
    'read': {},
    'readIDs': {},
    'write': {}
  }
};
