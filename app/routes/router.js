var Illness = require('./illness.js');
var Remedy = require('./remedy.js');
/**
 * Main route function to expose backend endpoints
 * @param app
 */
module.exports = function(app){
	
	app.post('/api/Illness/create', Illness.addIllness),
	app.post('/api/Illness/get', Illness.getIllness),
	app.post('/api/Illness/getBySymptoms', Illness.getIllnessBySymptoms),
	app.post('/api/Illness/delete', Illness.deleteIllness),
	app.post('/api/Remedy/add', Remedy.addRemedy),
	app.post('/api/Remedy/update', Remedy.updateRemedy),
	app.get('/api/Remedy/get', Remedy.getAllRemedies),
	app.post('/api/Remedy/delete', Remedy.deleteRemedy)

};