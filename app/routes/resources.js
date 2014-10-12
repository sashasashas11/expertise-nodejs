module.exports = function (app) {
  var methodsJson = require('./../methods.json');

  app.get ('/welcome', redirectRoot);
  app.get ('/api/methods', getMethods);

  function redirectRoot(req, res) {
    res.render('index.html');
  }

  function getMethods(req, res) {
    app.dbMethod.find({}, function (err, data) {
      var methods = (data.length == 0) ? methodsJson.data : data;
       res.send({ methods: methods });
    });
  }
};
