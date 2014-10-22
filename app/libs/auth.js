module.exports = function() {
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/welcome');
  }

  function ensureAuthenticatedAsync (req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.statusCode = 401;
    return  res.send();
  }

  function getCurrentUser(req) {
    return req.user;
  }

  return {
    ensureAuthenticated: ensureAuthenticated,
    ensureAuthenticatedAsync: ensureAuthenticatedAsync,
    getCurrentUser: getCurrentUser
  }

};






