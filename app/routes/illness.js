var Illness = require('../models/illness.js');
var Search = require('../models/search.js');

module.exports = {
	addIllness: function (req, res) {
		var body = req.body;

		var newIllness = new Illness({
			name: body.name.toUpperCase(),
			symptoms: body.symptoms,
			createdAt: body.timestamp 
		});

		newIllness.save(function(err, newIll){
			//Adds the Illness to the database
			if (err) {
				return res.status(400).send({message: "Illness Not Added"});
			} else {
				return res.status(200).send({message: "Illness Added", data: newIll});
			}
		});
	},
	updateIllness: function(req, res) {
		var body = req.body;

		Illness.update({ name:body.name.toUpperCase()},{$set:{'symptoms':body.symptoms}}, function(err, updateIll) {
			if (err) {
						return res.status(400).send({message: "Illness Not Found"});
					} else {
						return res.status(200).send({message: "Illness Updated", data: updateIll});
					}
		});
	},
	getIllness: function (req, res) {
		//Gets the Illness for a particular search from the database
		var body = req.body;

		Illness.findOne({name: body.name.toUpperCase()}, function( err, illness) {
			if (err) {
				return res.status(400).send({message: "Illness Not Found", data: []});
			} else {
				// var newSearch = new Search({
				// 	email: req.user.email,
				// 	illnessName: illness.name,
				// 	zipcode: req.user.zipcode,
				// 	createdAt: body.timestamp 
				// });
				// newSearch.save(function(err, newSearch){
				// 	//Adds the search to the database
				// 	if (err) {
				// 		return res.status(400).send({message: "Search Not Added"});
				// 	} else {
						return res.status(200).send({message: "Illness Found", data: illness});
					//}
				});
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

		Illness.remove({name: body.name.toUpperCase()},function( err, response) {
			if (err) {
				return res.status(400).send({message: "Illness Not Found"});
			} else {
				return res.status(200).send({message: "Illness Deleted"});
			}
		});
	},
	getIllnessZip: function(req, res) {
		var body = req.body;

		Search.find({illnessName: body.illness.toUpperCase()}, function(err, locations) {
			if (err) {
				return res.status(400).send({message: "Illness Not Found"});
			} else {
				return res.status(200).send({message: "Illness Found", data: locations});
			}
		});
	},
	addSearch: function(req, res) {
		var body = req.body;
		var newSearch = new Search({
			email: "1@2.com",
			illnessName: body.name.toUpperCase(),
			zipcode: 94059,
			createdAt: body.timestamp 
		});
		newSearch.save(function(err, newSearch){
			//Adds the search to the database
			if (err) {
				return res.status(400).send({message: "Search Not Added"});
			} else {
				return res.status(200).send({message: "Illness Found", data: newSearch});
			}
		});
	}
};