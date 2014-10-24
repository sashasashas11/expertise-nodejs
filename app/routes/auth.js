var PASSWORD_MIN_LENGTH = 1;
var passport = require('passport');
var authDefender = require('./../libs/auth')();

var CONFIRMATION_LINK = '/signup_confirm/_TOKEN_';
var CHANGE_PASSWORD_LINK = '/recover_password/_TOKEN_';
var SUCCESS_CONFIRMATION_LINK = '/signup_confirm_success';

var SIGNUP_ERR_PASSWORD_TOO_SHORT = 'Password too short';
var SIGNUP_ERR_EMAIL_INVALID = "E-Mail [EMAIL] is not valid";
var SIGNUP_ERR_USER_ALREADY_EXISTS = "User [USER] already exists";
var SIGNUP_ERR_INSTRUCTIONS_ALREADY_SENT =  "Confirmation instructions already sent to [USER]. -resend link here-";
var SIGNUP_ERR_TOKEN_EXPIRED = "Registration Token is expired";
var SIGNUP_ERR_UNABLE_TO_CREATE_USER = "Can not create new account: [ERROR]";
var SIGNUP_SUCCESS = "Check E-Mail for confirmation instructions";

var SIGNUP_ERR_EMAIL_REQUIRED = "E-Mail is required";
var SIGNUP_ERR_FIRST_NAME_REQUIRED = "First name is required";
var SIGNUP_ERR_LAST_NAME_REQUIRED = "Last name is required";
var SIGNUP_ERR_PASSWORD_REQUIRED = "Password is required";
var FORGOT_PASSWORD_USER_NOT_EXISTS = "Email [EMAIL] is not registered";

var ERR_MSG_PASSWORD_NOT_MATCH_CONFIRMATION = "Password doesn't match the confirmation";
var ERR_MSG_PASSWORD_TOO_SHORT = "Password is too short (minimum is " + PASSWORD_MIN_LENGTH +" characters)";
var ERR_INVALID_TOKEN = 'The token is invalid';

/*
* TODO: EXTRACT ME !!
 */

/*
* ENDTODO
* */

module.exports = function (app) {
  var database = require('./../helpers/dataBase')(app);


  function createRandomHash(size, callback) {
    var crypto = require("crypto");
    crypto.randomBytes(size || 20, function (err, buf) {
      callback(err, buf.toString('hex'));
    });
  }
  function dropExpiredUserRegistration(email, callback) {
    app.dbUser.findOne({email: email, active: false}, function (err, user) {
      if (user && user.confirmEmailExpires < Date.now()) {
        user.remove(function (err) {
          console.log('! Drop expired user registration' + user);
          callback(err);
        });
      }
    });
  }
  function createInactiveUser(user_info, callback) {
    createRandomHash(20, function(err, buf) {
      user_info.confirmEmailToken = buf.toString('hex');
      var expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      user_info.confirmEmailExpires = expiresAt;
      user_info.active = false;
      var inactiveUser = new app.dbUser(user_info);
      inactiveUser.save(function (err, user, numberAffected) {
        return callback(err, user);
      });
    });
  }
  function activateUser(token, callback) {
    app.dbUser.findOne({confirmEmailToken: token}, function (err, user) {
      if (err) return callback(err, null);
      if (!user) return callback(null, null);
      if (user.confirmEmailExpires < Date.now()) {
        dropExpiredUserRegistration(user.email, function () {
          return callback({error: 'sorry, your link is expired'});
        });
        return;

      }
      var user_info = {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        active: true
      };
      var pass = user.initial_password;


      return user.remove(function (err) {
        if (err) return callback(err);
        app.dbUser.register(new app.dbUser(user_info), pass, function (err, user) {
          if (err) return callback(err);
          return callback(null, user);
        });
      });
    });
  }

  app.get('/user', authDefender.ensureAuthenticated, function(req, res){
    res.render('user', { user: req.user });
  });

  /*  */

  app.get ('/login', redirectRoot);
  app.get ('/recover_password/:token', redirectRoot);
  app.post ('/recover_password', recoverPassword);
  app.post('/login', passport.authenticate('local'), processLogin);
  app.get ('/logout', authDefender.ensureAuthenticated, processLogout);
  app.get ('/authenticate', isAuthenticated);
  app.get ('/signup', redirectRoot);
  app.post('/signup', processSignup);
  app.get ('/signup_confirm/:token', signupConfirm);
  app.get ('/signup_confirm_success', redirectRoot);

  app.get ('/forgot_password', redirectRoot);
  app.post('/forgot_password', forgotPassword);

  function redirectRoot (req, res) {
    res.render('index.html');
  }
  function processLogin(req, res) {
    res.redirect('/expertise');
  }
  function isAuthenticated(req, res) {
    res.send({status: req.isAuthenticated()});
  }
  function processLogout(req, res) {
    req.logout();
    res.redirect('/welcome');
  }


  function recoverPassword(req, res) {

    var token = req.body.token;
    var password = req.body.password;
    var confirmPassword = req.body.confirm_password;
    if (!token || token == '') return errorRequest(res, ERR_INVALID_TOKEN);
    if (password != confirmPassword) return errorRequest(res, ERR_MSG_PASSWORD_NOT_MATCH_CONFIRMATION);
    if (password.length < PASSWORD_MIN_LENGTH) return errorRequest(res, ERR_MSG_PASSWORD_TOO_SHORT);

    app.dbUser.findOne({resetPasswordToken: token}, function(err, user) {
      if (err) return errorRequest(res, err);
      if (!user) return errorRequest(res, ERR_INVALID_TOKEN);
      user.setPassword(password, function (err, updatedUser) {
        updatedUser.resetPasswordToken = '';
        updatedUser.save(function (err, user, numberAffected) {
          if (err) return errorRequest(res, err);
          return successRequest(res);
        });
      });
    });
  }

  function successRequest(res, customHash) {
    return res.send(customHash || {});
  }

  function errorRequest(res, message) {
    res.statusCode = 404;
    return res.send({error: message});
  }

  function warningRequest(res, message) {
    res.statusCode = 406;
    return res.send({warning: message});
  }

  function forgotPassword(req, res) {
    var email = req.body.email;
    if (!email) return errorRequest(res, SIGNUP_ERR_EMAIL_REQUIRED);
    var validator = require('validator');
    if (!validator.isEmail(email)) return errorRequest(res, SIGNUP_ERR_EMAIL_INVALID.replace('[EMAIL]', email));

    app.dbUser.findOne({email: email}, {},  function(err, user) {
      if (err) return errorRequest(res, err);
      if (!(user && user.active)) return errorRequest(res, FORGOT_PASSWORD_USER_NOT_EXISTS.replace('[EMAIL]', email));

      createRandomHash(20, function(err, token) {
        if (err) return errorRequest(res, err);
        return app.dbUser.findOneAndUpdate({_id: user._id}, {resetPasswordToken: token}, {})
          .exec(function (err, user) {
            if (err) {
              return errorRequest(res, err);
            } else {
              var mailer = require('./../libs/mailer')(app);
              var protocol = "http://";
              var curHost = req.get('host');
              var confirmationLink = protocol + curHost + CHANGE_PASSWORD_LINK.replace('_TOKEN_', token);
              mailer.sendForgotPassword({to: user.email, firstName:  user.first_name, confirmationLink: confirmationLink});
              return res.send({success :SIGNUP_SUCCESS.replace("[EMAIL]", email), email: email});
            }
          });
      });
    });
  }


  function processSignup(req, res) {
    var email = req.body.email,
      first_name = req.body.first_name,
      last_name = req.body.last_name,
        password = req.body.password;
    if (password.length < PASSWORD_MIN_LENGTH) return errorRequest(res, SIGNUP_ERR_PASSWORD_TOO_SHORT);
    if (!first_name) return errorRequest(res, SIGNUP_ERR_FIRST_NAME_REQUIRED);
    if (!last_name) return errorRequest(res, SIGNUP_ERR_LAST_NAME_REQUIRED);
    if (!password) return errorRequest(res, SIGNUP_ERR_PASSWORD_REQUIRED);
    if (!email) return errorRequest(res, SIGNUP_ERR_EMAIL_REQUIRED);
    var validator = require('validator');
    if (!validator.isEmail(email)) return errorRequest(res, SIGNUP_ERR_EMAIL_INVALID.replace('[EMAIL]', email));
    app.dbUser.findOne({email: email}, function(err, user) {
      if (err)
        return errorRequest(res, err);
      if (user != undefined && user.active != false)
        return errorRequest(res, SIGNUP_ERR_USER_ALREADY_EXISTS.replace('[USER]', user.email));
      if (user != undefined && user.active == false && user.confirmEmailExpires > Date.now())
        return warningRequest(res, SIGNUP_ERR_INSTRUCTIONS_ALREADY_SENT.replace("[USER]", user.email));
      if (user != undefined && user.active == false && user.confirmEmailExpires < Date.now()) {
        dropExpiredUserRegistration(user.email, function(err) {
          return warningRequest(res, SIGNUP_ERR_TOKEN_EXPIRED);
        });
        return;
      }
      if (user == undefined) {
        database.createInactiveAccount({email: email, first_name: first_name, last_name: last_name, initial_password: password}, function(err, acc) {
          if (err) return errorRequest(res, SIGNUP_ERR_UNABLE_TO_CREATE_USER.replace('[ERROR]', err));
          var mailer = require('./../libs/mailer')(app)
            , protocol = "http://"
            , curHost = req.get('host');

          var confirmationLink = protocol + curHost + CONFIRMATION_LINK.replace('_TOKEN_', acc.confirmEmailToken);
          mailer.sendConfirmationEmail({to: acc.email, firstName:  acc.first_name, confirmationLink: confirmationLink});
          return res.send({success :SIGNUP_SUCCESS.replace("[EMAIL]", email), email: email});
        });
      }
    });
  }
  function signupConfirm(req, res) {
    var token = req.param('token');

    activateUser(token, function(err, user) {
      if (err) return errorRequest(res, err);
      if (!user) return errorRequest(res, "Token not found");
      var mailer = require('./../libs/mailer')(app);
      var protocol = "http://";
      var curHost = req.get('host');
      var successConfirmationLink = protocol + curHost + SUCCESS_CONFIRMATION_LINK;
      var loginLink = protocol + curHost + '/login';
      mailer.sendConfirmationSuccessEmail({to: user.email, firstName: user.first_name, successConfirmationLink: loginLink});
      return res.redirect(SUCCESS_CONFIRMATION_LINK);
    });
    return;
  }
};
