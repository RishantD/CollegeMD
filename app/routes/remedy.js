var Remedy = require('../models/remedy.js');
var Illness = require('../models/illness.js');

module.exports = {
	addRemedy: function (req, res) {
		var body = req.body;

		//Find the Illness to match to the Remedy
		Illness.find({name: body.illness}, function(err, illness) {
			if (err) {
				return res.status(400).send({message: "There is no Illness associated with this", data: []});
			} else {
				var newRemedy = new Remedy({
					createdAt: body.timestamp,
					illness: body.illness.toUpperCase(),
					cure: body.cure.toUpperCase()
				});

				newRemedy.save(function(err, newRem){
				//Adds the Remedy to the database
					if (err) {
						return res.status(400).send({message: "Remedy Not Added"});
					} else {
						return res.status(200).send({message: "Remedy Added", data: newRem});
					}
				});
			}
		});
	},
	updateRemedy: function(req, res) {
		Remedy.update({ _id:body.id},{$set:{'cure':body.cure.toUpperCase()}}, function(err, updateRem) {
			if (err) {
						return res.status(400).send({message: "Remedy Not Found"});
					} else {
						return res.status(200).send({message: "Remedy Updated", data: updateRem});
					}
		});
	},
	getAllRemedies: function (req, res) {
		//Gets the Remedy for a particular Illness from the database
		var body = req.body;

		Remedy.find({illness: body.illness}, function(err, remedies) {
			if (err) {
				return res.status(400).send({message: "Remedies Not Found", data: []});
			} else {
				return res.status(200).send({message: "Remedies Found", data: remedies});
			}
		});
	},
	deleteRemedy: function(req, res) {
		var body = req.body;

		Remedy.remove({_id: body.id},function( err, response) {
			if (err) {
				return res.status(400).send({message: "Remedy Not Found"});
			} else {
				return res.status(200).send({message: "Remedy Deleted"});
			}
		});
	}
};