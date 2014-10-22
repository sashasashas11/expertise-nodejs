module.exports = function (app) {
  var methodsJson = require('./../methods.json');
  var authDefender = require('./../libs/auth')();

  app.get ('/welcome', redirectRoot);
  app.get ('/expertise', redirectRoot);
  app.get ('/api/methods', getMethods);
  app.get ('/api/current_user', authDefender.ensureAuthenticatedAsync, currentUser);

  function redirectRoot(req, res) {
    res.render('index.html');
  }

  function getMethods(req, res) {
    app.dbMethod.find({}, function (err, data) {
      var methods = (data.length == 0) ? methodsJson.data : data;
       res.send({ methods: methods });
    });
  }

  function currentUser(req, res) {
    var userRecord = authDefender.getCurrentUser(req);
    var accessibleFields = {
      id: userRecord.id,
      first_name: userRecord.first_name,
      last_name: userRecord.last_name,
      email: userRecord.email
    };
    return res.send(accessibleFields);
  }
};
