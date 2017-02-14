import * as passport from 'passport';
import {User} from './modules/User/service';
import { Strategy, ExtractJwt } from 'passport-jwt';
const config = require('./config/env/config')();

class AuthConfig {
  private UserService: User;
  private opts: any = {};
  private strategy: Strategy;

  constructor(){
    this.UserService = new User();
    this.opts.secretOrKey = config.secret;
    this.opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  }

  createStrategy() {
    this.strategy = new Strategy(this.opts, this.searchUser);
    this.useStrategy(this.strategy);
  }

  useStrategy(strategy: any){
    passport.use(strategy);
  }

  searchUser(jwtPayload, done) {
    this.UserService.getById(jwtPayload.id).then(user => {
      if(user) {
        return done(null, {
          id: user.id,
          email: user.email
        });
      }
      return done(null, false);
    })
    .catch(error => done(error, null));
  }

  initialize() {
    return passport.initialize();
  }

  authenticate() {
    return passport.authenticate('jwt', { session : false });
  }
}

export default AuthConfig;
