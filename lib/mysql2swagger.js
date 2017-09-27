"use strict";

var argx = require('argx'),
    MysqlSpecifier = require('./specifying/mysql_specifier');

function mysql2swagger(config, database, table, callback) {
    var args = argx(arguments);
    callback = args.pop('function') || argx.noop;
    config = args.shift();
    if (!database) {
        callback(new Error('database is required.'));
        return;
    }
    if (!table) {
        callback(new Error('table is required.'));
        return;
    }
    mysql2swagger.specifyTable(config, database, table, callback);
}

mysql2swagger.specifyTable = function specifyTable(config, database, table, callback) {
    new MysqlSpecifier(config).specifyTable(database, table, callback);
};

module.exports = mysql2swagger;