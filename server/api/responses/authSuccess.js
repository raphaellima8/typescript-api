"use strict";
var jwt = require('jwt-simple');
var HTTPStatus = require('http-status');
var config = require('../../config/env/config')();
var bcrypt = require('bcrypt');
function authSuccess(res, creadentials, data) {
    var isMatch = bcrypt.compareSync(creadentials.password, data.password);
    if (isMatch) {
        var payload = { id: data.id };
        res.json({
            token: jwt.encode(payload, config.secret)
        });
    }
    else {
        res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
}
exports.authSuccess = authSuccess;
function authFail(req, res) {
    res.sendStatus(HTTPStatus.UNAUTHORIZED);
}
exports.authFail = authFail;
