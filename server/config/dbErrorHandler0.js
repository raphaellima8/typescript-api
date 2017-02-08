"use strict";
var hri = require('human-readable-ids').hri;
function dbErrorHandler(res, err) {
    var id = hri.random();
    console.error("Database error ocurred: ", id, err);
    res.status(500).json({
        code: 'ERR-002',
        message: "Creation of user failed, error code " + id
    });
}
exports.dbErrorHandler = dbErrorHandler;
