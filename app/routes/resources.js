module.exports = function (app) {
  var methodsJson = require('./../methods.json');
  var authDefender = require('./../libs/auth')();
  var MarkModel = app.dbMark;
  var mongoose    = require('mongoose');

  var PERMISSION_DENIED = "Доступ заборонений";

  app.get ('/welcome', redirectRoot);
  app.get ('/expertise', authDefender.ensureAuthenticated, redirectRoot);
  app.get ('/questionnaire', authDefender.ensureAuthenticated, redirectRoot);
//  API ROUTES
  app.get ('/api/methods', getMethods);
  app.put ('/api/methods/:id', updateMethods);
  app.get ('/api/current_user', authDefender.ensureAuthenticatedAsync, currentUser);
  app.get ('/api/experts', authDefender.ensureAuthenticatedAsync, getExperts);
  app.post ('/api/experts/:id', authDefender.ensureAuthenticatedAsync, updateExpertiseForExpert);

//  MARK
  app.post ('/api/marks', authDefender.ensureAuthenticatedAsync, createMark);
  app.get ('/api/marks/:id', authDefender.ensureAuthenticatedAsync, getMark);
  app.get ('/api/marks/result/:id', authDefender.ensureAuthenticatedAsync, getResultMarksByExpertise);

  function redirectRoot(req, res) {
    res.render('index.html');
  }

  function getMark(req, res) {
    var reqId = req.param('id');
    var objId = mongoose.Types.ObjectId(reqId);
    var account = mongoose.Types.ObjectId(authDefender.getCurrentUser(req)._id);
    MarkModel.findOne({account: account, expertise: objId}, function (err, result) {
      if (err) return  console.log(err);
      return res.send(result);
    });
  }

  function getResultMarksByExpertise(req, res) {
    var reqId = req.param('id');
    var objId = mongoose.Types.ObjectId(reqId);

    MarkModel.find({ expertise: objId }, { account: true, _id: false }, function (err, expertises) {
      var userIds = [];
      var usersMap = {};
      expertises.forEach(function (obj) {
        userIds.push(obj.account);
      });
      app.dbUser.find({ _id: { $in: userIds} }, {first_name: true, last_name: true}, function (err, users) {
        users.forEach(function (obj) {
          usersMap[obj._id] = obj.first_name + " " + obj.last_name;
        });
        console.log(usersMap);
        MarkModel.find({ expertise: objId }, function (err, marks) {
          return res.send({marks: marks, users: usersMap});
        });
      });
    });
  }

  function createMark(req, res) {
    var attrHash = req.body;
    attrHash['account'] = mongoose.Types.ObjectId(authDefender.getCurrentUser(req)._id);
    var expertise = mongoose.Types.ObjectId(attrHash.expertise);

    var mark = new MarkModel(attrHash);
    MarkModel.findOne({account: attrHash['account'], expertise: expertise}, function (err, result) {
      if (err) return  console.log(err);

      if (result == null)
        mark.save(function (err, mark, numberAffected) {
          if (err) {
            return res.send({ error: err });
          }
          return res.send(mark);
        });
      else
        MarkModel.update({ _id: result._id }, { criterions:  attrHash.criterions}, function (err, result) {
          if (err)
            return res.send( { error: err } );

          res.send({ status: "success" });
        })

    });
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
