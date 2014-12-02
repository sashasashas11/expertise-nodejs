var mainApp = require("./_")();
var methodsJson = require('./../app/methods.json');

var data = methodsJson.data;
var i = 0;
function saveMethod() {
  var model = new mainApp.dbMethods(data[i]);
  model.save(function (err, data) {
    if (err) {
      console.log(err);
      process.exit(0)
    }
    if (i < methodsJson.data.length - 1) {
      i++;
      console.log('Add Method ' + i);
      saveMethod();
    }
    else {
      process.exit(0)
    }
  });
}
saveMethod();
