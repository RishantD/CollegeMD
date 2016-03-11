var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var searchSchema = new Schema({
	createdAt: {type: Date, default: Date.now},
	userId: {type: String, required: true},
	illnessId: {type: Number, required: true}
});

module.exports = mongoose.model('Search', searchSchema);