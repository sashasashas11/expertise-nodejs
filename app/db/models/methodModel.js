/**
 * Method Model constructor
 * Provides the interface to MongoDB `methods` collection as well as creates `Method` instances.
 *
 * Dependences:
 * @requires methodSchema
 */
var MethodSchema = require('./../schemas/methodSchema')();
/**
 * Builds and exports `Method` model
 */
module.exports = function(db) {
  return db.model('Method', MethodSchema);
};
