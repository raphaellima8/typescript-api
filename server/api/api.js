"use strict";
var express = require('express');
var logger = require('morgan');
var auth_1 = require('../auth');
var routes_1 = require('./routes/routes');
var bodyParser = require('body-parser');
var Api = (function () {
    function Api() {
        this.express = express();
        this.middleware();
        this.router(this.express);
    }
    Api.prototype.middleware = function () {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.auth = auth_1["default"]();
        this.express.use(this.auth.initialize());
    };
    Api.prototype.router = function (app) {
        new routes_1["default"](app);
    };
    return Api;
}());
exports.__esModule = true;
exports["default"] = new Api().express;
