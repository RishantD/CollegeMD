var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var searchSchema = new Schema({
	createdAt: {type: Date, default: Date.now},
	email: {type: String, required: true},
	illnessName: {type: String, required: true},
	zipcode: {type: Number, required: true}
});

module.exports = mongoose.model('Search', searchSchema);