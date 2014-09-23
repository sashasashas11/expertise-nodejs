/**
 * PASSPORT.JS auth module
 *
 Expertise authentication middleware config
 Authentication strategy uses:
   "passport-local"     - for authenticating with a email and password
**/

exports = module.exports = function(app, passport) {
  var passportLocalStrategy = require('passport-local').Strategy;

  /*
  User ID is serialized to the session, and stored in browser's cookies.
  This ID is used to find the user, which will be restored to 'req.user'
  */
  var authSerializer = function (user, done) {
    done(null, user.id || user.identifier);
  };
  var authDeserializer = function (id, done) {
    app.dbUser.findById(id, {}, function (error, user) {
      done(error, user);
    });
  };

  passport.use(new passportLocalStrategy(app.dbUser.authenticate()));
  passport.serializeUser(authSerializer);
  passport.deserializeUser(authDeserializer);
};