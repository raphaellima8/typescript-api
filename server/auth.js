"use strict";
var passport = require('passport');
var _ = require('lodash');
var service_1 = require('./modules/User/service');
var Strategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('./config/config.json')['development'];
function authConfig() {
    var UserService = new service_1.User();
    var opts = {};
    opts.secretOrKey = config.secret;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    var strategy = new Strategy(opts, function (jwtPayload, done) {
        UserService.getById(jwtPayload.id)
            .then(function () {
            success(jwtPayload, done);
        })
            .catch(_.partial(error, done, error));
    });
    function success(data, done) {
        if (data) {
            return done(null, {
                id: data.id,
                email: data.email
            });
        }
        return done(null, false);
    }
    ;
    function error(done) {
        return done(error, null);
    }
    ;
    passport.use(strategy);
    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate('jwt', { session: false });
        }
    };
}
exports.__esModule = true;
exports["default"] = authConfig;
;
