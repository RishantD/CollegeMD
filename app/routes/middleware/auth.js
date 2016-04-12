module.exports = {
  isLoggedIn: function(req, res, next) {
    if (!req.isAuthenticated()) {
      var e = new Error()
      e.message = "Not authorized"
      e.status = 401
      return next(e)
    }
    return next()
  }
}
