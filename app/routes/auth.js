var User = require('../models/user')
var LocalStrategy = require('passport-local').Strategy

module.exports = function (passport) {
	passport.use(new LocalStrategy({
			usernameField: 'email'
		},
		function (email, password, cb) {
			User.findOne({
				email: email
			}, function (err, user) {
				if (err) return cb(err)
				if (!user) return cb(null, false)
				user.comparePassword(password, function (err, isMatch) {
					if (err) return cb(err)
					if (!isMatch) return cb(null, false)
					return cb(null, user)
				})
			})
		}
	))

	passport.serializeUser(function (user, cb) {
		cb(null, user.id)
	})

	passport.deserializeUser(function (id, cb) {
		User.findById(id, function (err, user) {
			if (err) return cb(err)
			cb(null, user)
		})
	})
}