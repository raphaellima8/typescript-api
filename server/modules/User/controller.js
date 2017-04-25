"use strict";
var _ = require('lodash');
var errorHandler_1 = require('../../api/responses/errorHandler');
var successHandler_1 = require('../../api/responses/successHandler');
var dbErrorHandler_1 = require('../../config/dbErrorHandler');
var service_1 = require('./service');
var UserController = (function () {
    function UserController() {
        this.UserService = new service_1.User();
    }
    UserController.prototype.getAll = function (req, res) {
        this.UserService.getAll()
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(errorHandler_1.onError, res, 'Find all users failed'));
    };
    UserController.prototype.createUser = function (req, res) {
        this.UserService.create(req.body)
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(dbErrorHandler_1.dbErrorHandler, res))
            .catch(_.partial(errorHandler_1.onError, res, "Could not create user"));
    };
    UserController.prototype.getById = function (req, res) {
        var userId = parseInt(req.params.id);
        this.UserService.getById(userId)
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(errorHandler_1.onError, res, 'Not found'));
    };
    UserController.prototype.updateUser = function (req, res) {
        var userId = parseInt(req.params.id);
        var props = req.body;
        this.UserService.update(userId, props)
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(errorHandler_1.onError, res, 'Update User failed'));
    };
    UserController.prototype.deleteUser = function (req, res) {
        var userId = req.params.id;
        this.UserService.delete(userId)
            .then(_.partial(successHandler_1.onSuccess, res))
            .catch(_.partial(errorHandler_1.onError, res, 'An error ocurred to delete an User'));
    };
    return UserController;
}());
exports.__esModule = true;
exports["default"] = UserController;
