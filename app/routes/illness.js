var Illness = require('../models/illness.js');
var Search = require('../models/search.js');

module.exports = {
	addIllness: function (req, res) {
		var body = req.body;

		var newIllness = new Illness({
			name: body.name.toUpperCase(),
			description: body.description,
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
				var newSearch = new Search({
					email: req.user.email,
					illnessName: illness.name,
					zipcode: req.user.zipcode,
					createdAt: body.timestamp 
				});
				newSearch.save(function(err, newSearch){
					//Adds the search to the search collection in the database
					if (err) {
						return res.status(400).send({message: "Search Not Added"});
					} else {
						return res.status(200).send({message: "Illness Found", data: illness});
					}
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

		Search.find({illnessName: body.name.toUpperCase()}, function(err, locations) {
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
			zipcode: 61801,
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
	},
	getRelatedIllness: function(req,res) {

		Search.find({zipcode: req.user.zipcode}, function(err, results) {
			if (err) {
				return res.status(400).send({message: "No illnesses searched in area"});
			} else {
				var filterArray = {};
				for(i in results) {
					if (isNaN(filterArray[results[i].illnessName])) {
						filterArray[results[i].illnessName] = 1;
					}
					else {
						filterArray[results[i].illnessName] += 1; 
					}
				}

				var items = Object.keys(filterArray).map(function(key) {
				    return [key, filterArray[key]];
				});

				items.sort(function(first, second) {
				    return second[1] - first[1];
				});

				results = items.slice(0, 3);

				return res.status(200).send({message: "Found", data: results});
			}
		});
	}
};