"use strict";
var express_1 = require('express');
var auth_1 = require('./auth');
function authRouter(authorization) {
    var router;
    router = express_1.Router();
    router.route('/').post(auth_1.auth);
    return router;
}
exports.__esModule = true;
exports["default"] = authRouter;
