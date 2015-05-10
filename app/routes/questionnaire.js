/**
 * Created by andrey on 10.05.15.
 */
var authDefender = require('./../libs/auth')();

module.exports = function (app) {
    var QuestionnaireModel = app.dbQuestionnaire;
    var mongoose    = require('mongoose');
    

    app.get('/api/questionnaire', authDefender.ensureAuthenticatedAsync, index);      // curl http://0.0.0.0:3000/api/questionnaire/
    app.post('/api/questionnaire', authDefender.ensureAuthenticatedAsync, create);    // curl -X POST http://0.0.0.0:3000/api/questionnaire --data "url"="http://.."
    app.get('/api/questionnaire/:id', authDefender.ensureAuthenticatedAsync, show);    // curl http://0.0.0.0:3000/api/questionnaire/537f5
    app.put('/api/questionnaire/:id', authDefender.ensureAuthenticatedAsync, update);  //curl -X PUT http://0.0.0.0:3000/api/questionnaire/537f5 --data "url"="http://..."
    app.delete('/api/questionnaire/:id', authDefender.ensureAuthenticatedAsync, del); // curl -X DELETE http://0.0.0.0:3000/api/questionnaire/537f5

    function index(req, res) {
        return QuestionnaireModel.find({}, function (err, result) {
            return res.send(result);
        });
    }
    function create(req, res) {
        var attrHash = req.body;
        var feature = new QuestionnaireModel(attrHash);
        feature.save(function (err, feature) {
            if (err) {
                return res.send( { error: err } );
            }
            return res.send(feature);
        });
    }

};
