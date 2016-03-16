var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var illnessSchema = new Schema({
	createdAt: {type: Date, default: Date.now},
	name: {type: String, required: true, unique: true},
	symptoms: {type: Array, required: true},
});

module.exports = mongoose.model('Illness', illnessSchema);