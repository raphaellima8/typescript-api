import * as passport from 'passport';
import * as _ from 'lodash';
import {User} from './modules/User/service';
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./config/config.json')['development'];

export default function authConfig () {
  const UserService = new User();

  const opts: any = {};
  opts.secretOrKey = config.secret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();

  const strategy = new Strategy(opts, (jwtPayload, done) => {
    UserService.getById(jwtPayload.id)
      .then(() => {
        success(jwtPayload, done)
      })
      .catch(_.partial(error, done, error));
  })

  function success(data:any, done): Function {
      if(data) {
        return done(null, {
          id: data.id,
          email: data.email
        });
      }
      return done(null, false);
  };

  function error(done): Function {
    return done(error, null);
  };
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
