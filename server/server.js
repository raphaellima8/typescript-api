"use strict";
var http = require('http');
var debug = require('debug');
var api_1 = require('./api/api');
var errorHandlerApi_1 = require('./api/errorHandlerApi');
var models = require('./models');
var config = require('./config/env/config')();
debug('ts-api:server');
var port = normalizePort(config.server_port);
api_1["default"].set('port', port);
var server = http.createServer(api_1["default"]);
models.sequelize.sync().then(function () {
    server.listen(port);
    server.on('error', onError);
    server.on('listening', listen);
});
api_1["default"].use(errorHandlerApi_1.errorHandlerApi);
function listen() {
    var address = server.address();
    var bind = (typeof address === 'string') ? "Address " + address : "Port " + address.port;
    debug("Server is runnig on port " + bind);
    console.log("Server is runnig on port " + bind);
}
function onError(error) {
    console.log('An error ocurred: ', error);
}
function normalizePort(portNumber) {
    var port = (typeof portNumber === 'string') ? parseInt(portNumber, 10) : portNumber;
    if (isNaN(port))
        return portNumber;
    else if (port > 0)
        return port;
    else
        return false;
}
