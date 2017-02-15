import * as passport from 'passport';
import {User} from './modules/User/service';
import { Strategy, ExtractJwt } from 'passport-jwt';
const config = require('./config/env/config')();

export default function AuthConfig () {
  const UserService = new User();
  let opts = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
  };

  passport.use(new Strategy(opts, (jwtPayload, done) => {
    UserService.getById(jwtPayload.id)
      .then(user => {
        if(user) {
          return done(null, {
            id: user.id,
            email: user.email
          });
        }
        return done(null, false);
      })
      .catch(error => done(error, null));
  }));

   return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', {session: false}),
  };
}
