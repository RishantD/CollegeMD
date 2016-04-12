var config = require('../../../config');
var User = require('../../models/user');

module.exports = {
	get: function (req, res, next) {
		return res.status(200).send({
			user: req.user
		})
	},
	create: function (req, res, next) {
		var newUser = new User(req.body)
		newUser.save(function (err, user) {
			if (err) return next(err)
			return res.status(200).send()
		})
	},
	login: function (req, res, next) {
		return res.status(200).send()
	},
	logout: function (req, res, next) {
		req.logout()
		return res.status(200).send()
	},
	isLoggedIn: function (req, res, next) {
		return res.status(200).send()
	}
}