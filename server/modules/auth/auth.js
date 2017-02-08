"use strict";
var _ = require('lodash');
var service_1 = require('../User/service');
var authSuccess_1 = require('../../api/responses/authSuccess');
var UserService = new service_1.User();
function auth(req, res) {
    if (req.body.email && req.body.password) {
        var creadentials = {
            email: req.body.email,
            password: req.body.password
        };
        UserService.getById(creadentials.email)
            .then(_.partial(authSuccess_1.authSuccess, res, creadentials))
            .catch(_.partial(authSuccess_1.authFail, req, res));
    }
}
exports.auth = auth;
