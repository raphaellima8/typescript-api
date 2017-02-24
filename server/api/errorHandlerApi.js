"use strict";
var HTTPStatus = require('http-status');
function errorHandlerApi(err, req, res, next) {
    console.error('API error handler was called: ', err);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
        errorCode: 'ERR-001',
        message: 'Internal Server Error'
    });
}
exports.errorHandlerApi = errorHandlerApi;
