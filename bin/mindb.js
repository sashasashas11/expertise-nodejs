var mainApp = require("./_")();
/*
* Create registered account with:
*   email:    1@1
*   password: 1
*
* */
EMAIL = "1@1";
PASSW = "1";
FIRST_NAME = "John";
LAST_NAME = "Smith";

var methodsJson = require('./../app/methods.json');

mainApp.dbAccount.register(new mainApp.dbAccount({ email: EMAIL, first_name: FIRST_NAME, last_name: LAST_NAME, active: true}), PASSW, function (err, account) {
  if (err) {
    console.log(err);
    process.exit(0)
  }
//  mainApp.dbMethods.insert(methodsJson.data, function (err, data) {
//    if (err) {
//      console.log(err);
//      process.exit(0)
//    }
//    console.log('New registered account created. E-Mail: '+EMAIL+', password: ' + PASSW);
//    process.exit(0)
//  });
  console.log('New registered account created. E-Mail: '+EMAIL+', password: ' + PASSW);
  process.exit(0)
});