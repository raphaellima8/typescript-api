"use strict";
var http = require('http');
var debug = require('debug');
var api_1 = require('./api/api');
var errorHandlerApi_1 = require('./api/errorHandlerApi');
debug('ts-api:server');
var port = normalizePort(process.env.PORT || 3000);
api_1["default"].set('port', port);
var server = http.createServer(api_1["default"]);
server.listen(port);
server.on('error', onError);
server.on('listening', listen);
api_1["default"].use(errorHandlerApi_1.errorHandlerApi);
function listen() {
    var address = server.address();
    var bind = (typeof address === 'string') ? "Address " + address : "Port " + address.port;
    debug("Server is runnig on port " + bind);
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
