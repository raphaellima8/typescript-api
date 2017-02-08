"use strict";
var controller_1 = require('./controller');
var UserCtlr;
var UserRoutes = (function () {
    function UserRoutes() {
        UserCtlr = new controller_1["default"]();
    }
    UserRoutes.prototype.index = function (req, res) {
        return UserCtlr.getAll(req, res);
    };
    UserRoutes.prototype.create = function (req, res) {
        return UserCtlr.createUser(req, res);
    };
    UserRoutes.prototype.findOne = function (req, res) {
        return UserCtlr.getById(req, res);
    };
    UserRoutes.prototype.update = function (req, res) {
        return UserCtlr.updateUser(req, res);
    };
    UserRoutes.prototype.destroy = function (req, res) {
        return UserCtlr.deleteUser(req, res);
    };
    return UserRoutes;
}());
exports.__esModule = true;
exports["default"] = UserRoutes;
