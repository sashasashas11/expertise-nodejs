/**
 * Expertise source file
 * MethodSchema module
 * Maps to a MongoDB collection and defines the shape of the documents within Methods collection
 * Dependences:
 * @requires Schema
 */
var Schema = require('mongoose').Schema;

module.exports = function() {
  //MethodSchema
  return new require('mongoose').Schema(
    {
      title: { type: String, required: true },
      text: { type: String, required: true },
      // Embedded `Method` schema used
      children: [Object]
    }
  );
}