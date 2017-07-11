"use strict";
var HTTPStatus = require("http-status");
var hri = require('human-readable-ids').hri;
function dbErrorHandler(res, err) {
    var id = hri.random();
    console.error("Database error ocurred: ", id, err);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
        code: 'ERR-002',
        message: "Creation of user failed, error code " + id
    });
}
exports.dbErrorHandler = dbErrorHandler;
