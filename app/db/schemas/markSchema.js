var Schema = require('mongoose').Schema;

module.exports = function() {
  return new require('mongoose').Schema(
      {
        expertise: { type: Schema.ObjectId, ref: 'ExpertiseSchema', required: true },
        account: { type: Schema.ObjectId, ref: 'UserSchema', required: true },
        criterions: { type: Array, required: true }
      }
  );
};
