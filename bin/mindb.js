var mainApp = require("./_")();
/*
* Create registered account with:
*   email:    11@1
*   password: 1
*
* */
EMAIL = "11@1";
PASSW = "1";
FIRST_NAME = "Admin";
LAST_NAME = "";

var methodsJson = require('./../app/methods.json');

mainApp.dbAccount.register(new mainApp.dbAccount({ email: EMAIL, first_name: FIRST_NAME, last_name: LAST_NAME, active: true, isAdmin: true}), PASSW, function (err, account) {
  if (err) {
    console.log(err);
    process.exit(0)
  }
  var data = methodsJson.data[0];
  var model = new mainApp.dbMethods(data);
  model.save(function (err, data) {
    if (err) {
      console.log(err);
      process.exit(0)
    }
    console.log('Add Method');
    process.exit(0)
  });
//  console.log('New registered account created. E-Mail: '+EMAIL+', password: ' + PASSW);
//  process.exit(0)
});
