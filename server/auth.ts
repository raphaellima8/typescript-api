import {Application} from 'express';
import * as passport from 'passport';
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../config/config');
import * as _ from 'lodash';
import {getUserById} from './queries/getUserById';

export default function authConfig () {
  const opts: any = {};
  opts.secretOrKey = config.secret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();

function strats() {
  console.log('ok1')
  const strategy = new Strategy(opts, (jwtPayload, done) => {
    getUserById(jwtPayload.id)
      .then(() => {
        console.log('ok')
        success(jwtPayload, done)
      })
      .catch(_.partial(error, done, error));
  })

  function success(data:any, done): Function {
      console.log(data);
      if(data) {
        console.log(data);
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
  success('oooooo','');
}

  return {
    initialize: () => {
      console.log('initialized')
      return passport.initialize()
    },
    authenticate: () => {
      console.log('authenticate')
              strats();
      return passport.authenticate('jwt', {session: false})
    }
  }
};
