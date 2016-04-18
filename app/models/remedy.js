var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var remedySchema = new Schema({
	createdAt: {type: Date, default: Date.now},
	cure: {type: String, required: true},
	upvote: {type: Number, required: false, default: 0},
	illness: {type: String, required: true}
});

module.exports = mongoose.model('Remedy', remedySchema);