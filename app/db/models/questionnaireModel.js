/**
 * Created by andrey on 10.05.15.
 */
/**
 * Questionnaire Model constructor
 * Provides the interface to MongoDB `Questionnaire` collection as well as creates `Questionnaire` instances.
 *
 * Dependences:
 * @requires methodSchema
 */
var questionnaireSchema = require('./../schemas/questionnaireSchema')();
/**
 * Builds and exports `Questionnaire` model
 */
module.exports = function(db) {
    return db.model('Questionnaire', questionnaireSchema);
};

