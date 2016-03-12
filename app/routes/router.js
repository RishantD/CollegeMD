var Illness = require('./illness.js');
/**
 * Main route function to expose backend endpoints
 * @param app
 */
module.exports = function(app){
	app.post('/api/Illness/create', Illness.addIllness)
};