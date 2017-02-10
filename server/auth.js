"use strict";
var passport = require('passport');
var _ = require('lodash');
var service_1 = require('./modules/User/service');
var Strategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('./config/env/config')();
function authConfig() {
    var UserService = new service_1.User();
    var opts = {};
    opts.secretOrKey = config.secret;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    var strategy = new Strategy(opts, function (jwtPayload, done) {
        UserService.getById(jwtPayload.id)
            .then(function (data) {
            if (data) {
                return done(null, {
                    id: data.id,
                    email: data.email
                });
            }
            return done(null, false);
        })
            .catch(_.partial(function (error) {
            return done(error, null);
        }, done));
    });
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
