"use strict";
var jwt = require('jwt-simple');
var config = require('../../config/env/config')();
var bcrypt = require('bcrypt');
function authSuccess(res, creadentials, data) {
    if (bcrypt.compareSync(creadentials.password, data.password)) {
        var payload = { id: data.id };
        res.json({
            token: jwt.encode(payload, config.secret)
        });
    }
    else {
        res.sendStatus(401);
    }
}
exports.authSuccess = authSuccess;
function authFail(req, res) {
    res.sendStatus(401);
}
exports.authFail = authFail;
