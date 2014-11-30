/**
 * Expertise source file
 * User Model constructor
 * Provides the interface to MongoDB `users` collection as well as creates `Users` instances.
 **/

/**
 * @requires userSchema
**/
var UserSchema = require('./../schemas/userSchema')();

module.exports = function(db) {
  var userSchema = UserSchema;
  var passportLocalMongoose = require('passport-local-mongoose');
  userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

  // Declare Schema methods:
  userSchema.methods.checkPassword = checkPassword;

  return db.model('User', userSchema);
};

/**
 * Checks is `candidatePassword` is equal to account password.
 * @param     {String} candidatePassword candidatePassword string
 * @param     {Method} callback callback function
 * @return    {String} error error message or _null_
 * @return    {Boolean} isMatch true if `candidatePassword` matches account's password
  */
var checkPassword = function(candidatePassword, cb) {
  var gHash = this.hash;
  var gSalt = this.salt;
  var options = {
    iterations: 25000,
    keylen: 512,
    encoding: 'hex'
  };
  require('crypto').pbkdf2(candidatePassword, gSalt, options.iterations, options.keylen, function(error, hashRaw) {
    if (error) return cb(error);
    var hash = new Buffer(hashRaw, 'binary').toString(options.encoding);
    if (hash === gHash) return cb(null, true);
    return cb(null, false);
  });
};
