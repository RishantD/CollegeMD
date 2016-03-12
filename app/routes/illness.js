var Illness = require('../models/Illness');

module.exports = {
	addIllness: function (req, res) {
		var body = req.body;

		var newIllness = new Illness({
			name: body.name,
			symptoms: body.symptoms,
			createdAt: body.timestamp 
		});

		newIllness.save(function(err, newIll){
			//Adds the Illness to the database
			console.log("Error" + err);
			if (err) {
				return res.status(400).send({message: "Illness Not Added"});
			} else {
				return res.status(200).send({message: "Illness Added", data: newIll});
			}
		});
	},
	getIllness: function (req, res) {
		//Gets the Illness for a particular search from the database
		var body = req.body;

		Illness.find({name: body.name}, function( err, illness) {
			if (err) {
				return res.status(400).send({message: "Illness Not Found", data: []});
			} else {
				return res.status(200).send({message: "Illness Found", data: illness});
			}
		});
	},
	getIllnessBySymptoms:  function (req, res) {
		var body = req.body;

		Illness.find({ symptoms: { $eq: body.symptoms} }, function( err, illness) {
			if (err) {
				return res.status(400).send({message: "Illness Not Found", data: []});
			} else {
				return res.status(200).send({message: "Illness Found", data: illness});
			}
		});
	},
	deleteIllness: function(req, res) {
		var body = req.body;

		Illness.remove({name: body.name},function( err, response) {
			if (err) {
				return res.status(400).send({message: "Illness Not Found"});
			} else {
				return res.status(200).send({message: "Illness Deleted"});
			}
		});
	}
};