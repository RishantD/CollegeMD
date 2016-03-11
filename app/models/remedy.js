var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var remedySchema = new Schema({
	createdAt: {type: Date, default: Date.now},
	name: {type: String, required: true},
	upvote: {type: Number, required: true}
});

module.exports = mongoose.model('Remedy', remedySchema);