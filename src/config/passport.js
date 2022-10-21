import AuthService from '../service/auth.service.js';
import {Strategy as LocalStrategy} from 'passport-local';
import UserBase from '../model/UserBase.js';

export default (passport) => {
  passport.use(
      new LocalStrategy(async function(username, candidatePassword, done) {
        const user = await AuthService.login(username, candidatePassword);
        if (!user) return done(null, false);
        return done(null, user);
      }),
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    UserBase.findOne(
        {
          _id: id,
        },
        '-password -salt',
        function(err, user) {
          done(err, user);
        },
    );
  });
};
