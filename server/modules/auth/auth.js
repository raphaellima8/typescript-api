"use strict";
var _ = require('lodash');
var service_1 = require('../User/service');
var authSuccess_1 = require('../../api/responses/authSuccess');
var UserService = new service_1.User();
var TokenRoutes = (function () {
    function TokenRoutes() {
    }
    TokenRoutes.prototype.auth = function (req, res) {
        if (req.body.email && req.body.password) {
            var credentials = {
                email: req.body.email,
                password: req.body.password
            };
            UserService.getByEmail(credentials.email)
                .then(_.partial(authSuccess_1.authSuccess, res, credentials))
                .catch(_.partial(authSuccess_1.authFail, req, res));
        }
    };
    return TokenRoutes;
}());
exports.__esModule = true;
exports["default"] = TokenRoutes;
