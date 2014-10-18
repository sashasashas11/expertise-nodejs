// DATABASE MODULE

module.exports = function (app) {
  var AccountModel = app.dbUser;
  var MethodModel = app.dbMethod;

  var mongoose    = require('mongoose');

  function getAccountByEmail(email, callback) { /* avatarUrl:true, */
    AccountModel.findOne({email: email}, {
      _id: true,
      active:true,
      email:true,
      confirmEmailToken: true,
      confirmEmailExpires: true,
      resetPasswordToken: true,
      first_name: true,
      last_name: true
    }, function (err, result) {
      callback(err, result);
    });
  }

  function dropExpiredAccount(email, callback) {
    AccountModel.findOne({email: email, active: false}, function (err, account) {
      if (account && account.confirmEmailExpires < Date.now()) {
        account.remove(function (err) {
          console.log('! Drop expired account ' + account);
          callback(err);
        });
      }
    });
  }

  function createRandomHash(size, callback) {
    var crypto = require("crypto");
    crypto.randomBytes(size || 20, function (err, buf) {
      callback(err, buf.toString('hex'));
    });
  }


  function createInactiveAccount(account_info, callback) {
    createRandomHash(20, function(err, buf) {
      account_info.confirmEmailToken = buf.toString('hex');
      var expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      account_info.confirmEmailExpires = expiresAt;
      account_info.active = false;
      var inactiveAcc = new AccountModel(account_info);
      inactiveAcc.save(function (err, acc, numberAffected) {
        return callback(err, acc);
      });
    });
  }

  /*
  * extract source to accounts module..
  * */
  function activateAccount(token, callback) {
    AccountModel.findOne({confirmEmailToken: token}, function (err, account) {
      if (err) return callback(err, null);
      if (!account) return callback(null, null);
      if (account.confirmEmailExpires < Date.now()) {
        dropExpiredAccount(account.email, function () {
          return callback({error: 'sorry, your link is expired'});
        });
        return;

      }
      var acc_info = {
        email: account.email,
        first_name: account.first_name,
        last_name: account.last_name,
        active: true
      };
      var pass = account.initial_password;


      return account.remove(function (err) {
        if (err) return callback(err);
        app.dbAccount.register(new app.dbAccount(acc_info), pass, function (err, account) {
          if (err) return callback(err);
          return callback(null, account);
        });
      });
    });
  }

  function getAccountBy(hash, callback) {
    AccountModel.findOne(hash, function (err, account) {
      return callback(err, account);
    });
  }

  return {
    getAccountByEmail: getAccountByEmail,
    getAccountBy: getAccountBy,
    dropExpiredAccount: dropExpiredAccount,
    createInactiveAccount: createInactiveAccount,
    createRandomHash: createRandomHash,
    activateAccount: activateAccount
  }
};