var authDefender = require('./../libs/auth')();

module.exports = function (app) {
  var ExpertiseModel = app.dbExpertise;
  var mongoose    = require('mongoose');
  var AccountModel = app.dbUser;

  app.get('/api/expertises', authDefender.ensureAuthenticatedAsync, index);      // curl http://0.0.0.0:3000/api/expertises/
  app.post('/api/expertises', authDefender.ensureAuthenticatedAsync, create);    // curl -X POST http://0.0.0.0:3000/api/expertises --data "url"="http://.."
  app.get('/api/expertises/:id', authDefender.ensureAuthenticatedAsync, show);    // curl http://0.0.0.0:3000/api/expertises/537f5
  app.put('/api/expertises/:id', authDefender.ensureAuthenticatedAsync, update);  //curl -X PUT http://0.0.0.0:3000/api/expertises/537f5 --data "url"="http://..."
  app.delete('/api/expertises/:id', authDefender.ensureAuthenticatedAsync, del); // curl -X DELETE http://0.0.0.0:3000/api/expertises/537f5

  function index(req, res) {
    var currentUser = authDefender.getCurrentUser(req);
    return ExpertiseModel.find({account: currentUser})
      .exec(function (err, features) {
        if (err) {
          return res.send( { error: err } );
        }
          var features = features;
          return ExpertiseModel.find({_id: {$in: currentUser.expertises}}).exec(function (err, result) {
            return res.send(features.concat(result));
          });
      });
  }
  function create(req, res) {
    var attrHash = req.body;
    attrHash['account'] = mongoose.Types.ObjectId(authDefender.getCurrentUser(req)._id);

//      attrHash['authorName'] = [acc.first_name, acc.last_name].join(' ');
      var feature = new ExpertiseModel(attrHash);
      feature.save(function (err, feature, numberAffected) {
        if (err) {
          return res.send( { error: err } );
        }
        return res.send(feature);
      });
  }
  function show(req, res) {
    var reqId = req.param('id');
    var objId = mongoose.Types.ObjectId(reqId);
    return ExpertiseModel.findOne({_id: objId, account: authDefender.getCurrentUser(req)}, function(err, feature){
      if (err) return res.send( { error: err } );
      return res.send(feature);
    })
  }
  function update(req, res) {
    var reqId = req.param('id');
    var objId = mongoose.Types.ObjectId(reqId);

    var alternatives = req.body.alternatives;
    var criterions = req.body.criterions;
    var attrHash = {alternatives: alternatives, criterions: criterions};
    var account = attrHash.account;
    var acc = authDefender.getCurrentUser(req);

//    ExpertiseModel.findOneAndUpdate({_id: objId, account: authDefender.getCurrentUser(req)}, attrHash, {}).exec(function (err, feature) {
    ExpertiseModel.findOneAndUpdate({ _id: objId }, attrHash, {}).exec(function (err, feature) {
      if (err) {
        return res.send( { error: err } );
      }
      feature.save(function () {
        return res.send(feature);
      });

    });
  }

  function del(req, res) {
    var reqId = req.param('id');
    var objId = mongoose.Types.ObjectId(reqId);
    return ExpertiseModel.findOne({_id: objId}, function (err, feature) {
      return feature.remove(function (err) {
        if (err) {
          return res.send( { error: err } );
        } else {
          return res.send(feature);
        }
      });
    });
  }
};