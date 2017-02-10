import * as passport from 'passport';
import * as _ from 'lodash';
import {User} from './modules/User/service';
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./config/env/config')();

export default function authConfig () {
  const UserService = new User();

  const opts: any = {};
  opts.secretOrKey = config.secret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();

  const strategy = new Strategy(opts, (jwtPayload, done) => {
    UserService.getById(jwtPayload.id)
      .then((data) => {
        if(data) {
          return done(null, {
            id: data.id,
            email: data.email
          });
        }
        return done(null, false);
      })
      .catch(_.partial((error) => {
        return done(error, null);
      }, done));
  });

  passport.use(strategy);

  return {
    initialize: () => {
      return passport.initialize()
    },
    authenticate: () => {
      return passport.authenticate('jwt', {session: false})
    }
  }
};
