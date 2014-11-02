module.exports = function (app) {
  var methodsJson = require('./../methods.json');
  var authDefender = require('./../libs/auth')();
  var mongoose    = require('mongoose');

  var PERMISSION_DENIED = "Доступ заборонений";

  app.get ('/welcome', redirectRoot);
  app.get ('/expertise', authDefender.ensureAuthenticated, redirectRoot);
//  API ROUTES
  app.get ('/api/methods', getMethods);
  app.put ('/api/methods/:id', updateMethods);
  app.get ('/api/current_user', authDefender.ensureAuthenticatedAsync, currentUser);
  app.get ('/api/experts', authDefender.ensureAuthenticatedAsync, getExperts);
  app.post ('/api/experts/:id', authDefender.ensureAuthenticatedAsync, updateExpertiseForExpert);

  function redirectRoot(req, res) {
    res.render('index.html');
  }

  function getMethods(req, res) {
    app.dbMethod.find({}, function (err, data) {
      var methods = (data.length == 0) ? methodsJson.data : data;
       res.send({ methods: methods });
    });
  }

  function updateExpertiseForExpert(req, res) {
    var reqId = req.param('id');
    var objId = mongoose.Types.ObjectId(reqId);
    var expertisesIds = req.body.expertises;
    app.dbUser.update({ _id: objId }, { expertises: expertisesIds }, function (err, result) {
      if (err) {
        return res.send( { error: err } );
      }
      res.send({ status: "success" });
    })
  }

  function getExperts(req, res) {
    var currentUser = authDefender.getCurrentUser(req);
    if (!currentUser.isAdmin)
      return res.send({error: PERMISSION_DENIED });
    app.dbUser.find({ _id: { $ne: currentUser._id } }, { email: true, first_name: true, last_name: true, isAdmin: true, expertises: true }, function (err, experts) {
      if (err)  return console.log(err);
      return res.send(experts);
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
      email: userRecord.email,
      isAdmin: userRecord.isAdmin,
      expertises: userRecord.expertises
    };
    return res.send(accessibleFields);
  }
};
