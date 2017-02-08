"use strict";
var express = require('express');
var logger = require('morgan');
var routes_1 = require('../modules/User/routes');
var routes_2 = require('../modules/auth/routes');
var auth_1 = require('../auth');
var bodyParser = require('body-parser');
var Api = (function () {
    function Api() {
        this.express = express();
        this.middleware();
        this.router = new routes_1["default"]();
        this.routes();
    }
    Api.prototype.middleware = function () {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.auth = auth_1["default"]();
        this.express.use(this.auth.initialize());
    };
    Api.prototype.routes = function () {
        this.express.route('/api/users/all').get(this.router.index);
        this.express.route('/api/users/create').post(this.router.create);
        this.express.route('/api/users/:id').get(this.router.findOne);
        this.express.route('/api/users/:id/update').put(this.router.update);
        this.express.route('/api/users/:id/destroy').delete(this.router.destroy);
        this.express.use('/token', routes_2["default"](this.auth));
    };
    return Api;
}());
exports.__esModule = true;
exports["default"] = new Api().express;
