/**
 * Expertise source file
 * UserSchema module
 * Maps to a MongoDB collection and defines the shape of the documents within Users collection
 **/

module.exports = function() {
  return new require('mongoose').Schema(
    {
      //Person information:
      first_name: { type: String, required: false },
      last_name:  { type: String, required: false },
      email:      { type: String, required: false },
      isAdmin:    { type: Boolean, required: false, default: false },
      rule: Object,
      expertises: { type: Array, required: false },

      //Auth-properties:
      salt: String,
      hash: String,
      active: Boolean,
      initial_password: String,
      confirmEmailToken: String,
      resetPasswordToken: String,
      confirmEmailExpires: Date
  });
}