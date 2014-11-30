var MarksSchema = require('./../schemas/markSchema')();
/**
 * Builds and exports `Marks` model
 */
module.exports = function(db) {
  return db.model('Mark', MarksSchema);
};
