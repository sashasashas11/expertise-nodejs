/**
 Automizely mailer module
*/

var nodemailer     = require("nodemailer")
  , path           = require('path')
  , templatesDir   = path.join(__dirname, './../templates')
  , emailTemplates = require('email-templates');

/**
 Constants definitions:
*/

var ADDR_FROM = "Expertise<noreply@expertise.com>";
var CONFIRMATION_EMAIL_SUBJECT = "Expertise user confirmation";
var CONFIRMATION_SUCCESS_EMAIL_SUBJECT = "Welcome to Expertise!";
var FORGOT_PASSWORD_EMAIL_SUBJECT = "Forgot Password!";

/**
 Mailer Initializing
*/

global.gApp.mailer = global.gApp.mailer ||
  nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
      user: "igor.zinchenko557@gmail.com",
      pass: "14igor14"
    }
  });

/**
 Create Template Engine
*/

function sendEmailTemplate(templateName, locals, subject) {
  emailTemplates(templatesDir, function (err, template) {
    if (err) return  console.log(err);
    template(templateName, locals, function (err, html, text) {
      if (err) return console.log(err);
      locals.from =  locals.from || ADDR_FROM;
      locals.html = html;
      locals.text = text;
      locals.subject = locals.subject || subject;
      mail(locals);
    });
  });
}
function mail(mailOptions) {
  global.gApp.mailer.sendMail(mailOptions, function (error, response) {
    if (error) return console.log(error);
    console.log("Message sent: " + response.message);
  });
}

/**
 Define public Expertise Mailer methods
*/

function sendConfirmationEmail(locals) {
  sendEmailTemplate('confirmation', locals, CONFIRMATION_EMAIL_SUBJECT)
}

function sendConfirmationSuccessEmail(locals) {
  sendEmailTemplate('confirmation_success', locals, CONFIRMATION_SUCCESS_EMAIL_SUBJECT)
}

function sendForgotPassword(locals) {
  sendEmailTemplate('change_password', locals, FORGOT_PASSWORD_EMAIL_SUBJECT)
}

module.exports = function (app) {
  return {
    sendConfirmationEmail: sendConfirmationEmail,
    sendConfirmationSuccessEmail: sendConfirmationSuccessEmail,
    sendForgotPassword: sendForgotPassword
  }
};