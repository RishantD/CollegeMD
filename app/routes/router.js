var Illness = require('./illness.js');
var Remedy = require('./remedy.js');
var controllers = require('./controllers')
var middleware = require('./middleware')
/**
 * Main route function to expose backend endpoints
 * @param app
 */
module.exports = function(app, passport){

	app.post('/users/auth', passport.authenticate('local'), controllers.users.login)
	app.get('/users/auth', middleware.auth.isLoggedIn, controllers.users.isLoggedIn)
	app.delete('/users/auth', middleware.auth.isLoggedIn, controllers.users.logout)

	app.post('/users', controllers.users.create)
	
	app.post('/api/Illness/create', middleware.auth.isLoggedIn, Illness.addIllness),
	app.post('/api/Illness/get', Illness.getIllness),
	app.post('/api/Illness/getBySymptoms', Illness.getIllnessBySymptoms),
	app.post('/api/Illness/delete', Illness.deleteIllness),
	app.post('/api/Illness/update', Illness.updateIllness),
	app.post('/api/Remedy/add', Remedy.addRemedy),
	app.post('/api/Remedy/update', Remedy.updateRemedy),
	app.get('/api/Remedy/get', Remedy.getAllRemedies),
	app.post('/api/Remedy/delete', Remedy.deleteRemedy)

};