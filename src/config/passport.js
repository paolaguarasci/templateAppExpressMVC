import AuthService from "../service/auth.service.js";
import { Strategy } from "passport-local";
import passport from "passport";

passport.use(
  new Strategy(function (username, password, done) {
    // User.findOne({
    //     username: username
    // }, function(err, user) {
    //     // This is how you handle error
    //     if (err) return done(err);
    //     // When user is not found
    //     if (!user) return done(null, false);
    //     // When password is not correct
    //     if (!user.authenticate(password)) return done(null, false);
    //     // When all things are good, we return the user
    //     return done(null, user);
    //  });

    AuthService.pre({ username, password }, function (err, user) {
      // This is how you handle error
      if (err) return done(err);
      // When user is not found
      if (!user) return done(null, false);
      // When password is not correct
      if (!user.authenticate(password)) return done(null, false);
      // When all things are good, we return the user
      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findOne(
    {
      _id: id,
    },
    "-password -salt",
    function (err, user) {
      done(err, user);
    }
  );
});

export default passport;
