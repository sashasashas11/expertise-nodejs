/**
 * Created by andrey on 10.05.15.
 */

/**
 * Questionnaire source file
 * QuestionnaireSchema module
 * Maps to a MongoDB collection and defines the shape of the documents within Questionnaire collection
 * Dependences:
 * @requires Schema
 */
var Schema = require('mongoose').Schema;

module.exports = function() {
    return new require('mongoose').Schema(
        {
            name: { type: String, required: true },
            alternatives: { type: Array, required: false },
            description: { type: String, required: true }
        }
    );
};