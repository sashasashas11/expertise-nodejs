/**
 * Expertise source file
 * ExpertiseSchema module
 * Maps to a MongoDB collection and defines the shape of the documents within Expertise collection
 * Dependences:
 * @requires Schema
 */
var Schema = require('mongoose').Schema;

module.exports = function() {
  return new require('mongoose').Schema(
    {
      name: { type: String, required: true },
      goal: { type: String, required: true },
      method: { type: Object, required: false },
      criterions: { type: Array, required: false },
      account: {type: Schema.ObjectId, ref: 'UserSchema'},
      alternatives: { type: Array, required: false },
      setting: Object
    }
  );
};