"use strict";
function errorHandlerApi(err, req, res, next) {
    console.error('API error handler was called: ', err);
    res.status(500).json({
        errorCode: 'ERR-001',
        message: 'Internal Server Error'
    });
}
exports.errorHandlerApi = errorHandlerApi;
