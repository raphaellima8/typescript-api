"use strict";
var express = require('express');
var logger = require('morgan');
var auth_1 = require('../auth');
var routes_1 = require('./routes/routes');
var bodyParser = require('body-parser');
var Api = (function () {
    function Api() {
        this.express = express();
        this.auth = new auth_1["default"]();
        this.middleware();
        this.router(this.express, this.auth);
    }
    Api.prototype.middleware = function () {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(this.auth.initialize());
    };
    Api.prototype.router = function (app, auth) {
        new routes_1["default"](app, auth);
    };
    return Api;
}());
exports.__esModule = true;
exports["default"] = new Api().express;
