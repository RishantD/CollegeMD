var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var curesSchema = new Schema({
	createdAt: {type: Date, default: Date.now},
	remedyId: {type: Number, required: true},
	illnessId: {type: Number, required: true}
});

module.exports = mongoose.model('Cures', curesSchema);