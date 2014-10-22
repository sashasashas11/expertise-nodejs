module.exports = function (app) {
  var methodsJson = require('./../methods.json');
  var authDefender = require('./../libs/auth')();
  var mongoose    = require('mongoose');

  app.get ('/welcome', redirectRoot);
  app.get ('/expertise', redirectRoot);
  app.get ('/api/methods', getMethods);
  app.put ('/api/methods/:id', updateMethods);
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

  function updateMethods(req, res) {
    var reqId = req.param('id');
    var objId = mongoose.Types.ObjectId(reqId);
    var attrHash = req.body;
    app.dbMethod.findOneAndUpdate({ _id: objId }, attrHash, {}).exec(function (err, method) {
      if (err) {
        return res.send( { error: err } );
      }
      method.save(function () {
        return res.send(method);
      });

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
