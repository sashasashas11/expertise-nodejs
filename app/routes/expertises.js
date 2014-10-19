var authDefender = require('./../libs/auth')();

module.exports = function (app) {
  var ExpertiseModel = app.dbExpertise;
  var AccountModel = app.dbUser;

  app.get('/api/expertises', authDefender.ensureAuthenticatedAsync, index);      // curl http://0.0.0.0:3000/api/expertises/
  app.post('/api/expertises', authDefender.ensureAuthenticatedAsync, create);    // curl -X POST http://0.0.0.0:3000/api/expertises --data "url"="http://.."
  app.get('/api/expertises/:id', authDefender.ensureAuthenticatedAsync, show);    // curl http://0.0.0.0:3000/api/expertises/537f5
  app.put('/api/expertises/:id', authDefender.ensureAuthenticatedAsync, update);  //curl -X PUT http://0.0.0.0:3000/api/expertises/537f5 --data "url"="http://..."
  app.delete('/api/expertises/:id', authDefender.ensureAuthenticatedAsync, del); // curl -X DELETE http://0.0.0.0:3000/api/expertises/537f5
//  app.get('/api/expertises', index);      // curl http://0.0.0.0:3000/api/expertises/
//  app.post('/api/expertises', create);    // curl -X POST http://0.0.0.0:3000/api/expertises --data "url"="http://.."
//  app.put('/api/expertises/:id', update);  //curl -X PUT http://0.0.0.0:3000/api/expertises/537f5 --data "url"="http://..."
//  app.delete('/api/expertises/:id', del); // curl -X DELETE http://0.0.0.0:3000/api/expertises/537f5

  // ---

  var mongoose    = require('mongoose');

  function index(req, res) {
    var qSkip = req.query.skip;
    var qTake = req.query.take;
    var qSort = req.query.sort;
    var qFilter = req.query.filter;
    return ExpertiseModel.find({account: authDefender.getCurrentUser(req)}).sort(qSort).skip(qSkip).limit(qTake)
      .exec(function (err, features) {
        if (err) {
          return res.send( { error: err } );
        }
        return res.send(features);
      });
  }
  function create(req, res) {
    var attrHash = req.body;

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

    var attrHash = req.body;
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