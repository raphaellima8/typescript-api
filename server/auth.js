"use strict";
var passport = require('passport');
var service_1 = require('./modules/User/service');
var passport_jwt_1 = require('passport-jwt');
var config = require('./config/env/config')();
var AuthConfig = (function () {
    function AuthConfig() {
        this.opts = {};
        this.UserService = new service_1.User();
        this.opts.secretOrKey = config.secret;
        this.opts.jwtFromRequest = passport_jwt_1.ExtractJwt.fromAuthHeader();
    }
    AuthConfig.prototype.createStrategy = function () {
        this.strategy = new passport_jwt_1.Strategy(this.opts, this.searchUser);
        this.useStrategy(this.strategy);
    };
    AuthConfig.prototype.useStrategy = function (strategy) {
        passport.use(strategy);
    };
    AuthConfig.prototype.searchUser = function (jwtPayload, done) {
        this.UserService.getById(jwtPayload.id).then(function (user) {
            if (user) {
                return done(null, {
                    id: user.id,
                    email: user.email
                });
            }
            return done(null, false);
        })
            .catch(function (error) { return done(error, null); });
    };
    AuthConfig.prototype.initialize = function () {
        return passport.initialize();
    };
    AuthConfig.prototype.authenticate = function () {
        return passport.authenticate('jwt', { session: false }, function (req, res) {
            res.send('ok');
        });
    };
    return AuthConfig;
}());
exports.__esModule = true;
exports["default"] = AuthConfig;
