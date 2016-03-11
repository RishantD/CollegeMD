var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	createdAt: {type: Date, default: Date.now},
	illnessHist: [],
	remedyHist: [],
	fbId: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);
