/**
 * Expertise Model constructor
 * Provides the interface to MongoDB `expertises` collection as well as creates `Method` instances.
 *
 * Dependences:
 * @requires expertiseSchema
 */
var expertiseSchema = require('./../schemas/expertiseSchema')();
/**
 * Builds and exports `Method` model
 */
module.exports = function(db) {
  return db.model('expertise', expertiseSchema);
};
