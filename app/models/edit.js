var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var editSchema = new Schema({
	createdAt: {type: Date, default: Date.now},
	userId: {type: String, required: true},
	remedyId: {type: Number, required: true}
});

module.exports = mongoose.model('Edit', editSchema);