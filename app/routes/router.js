var Illness = require('./illness.js');
var Remedy = require('./remedy.js');
var controllers = require('./controllers')
var middleware = require('./middleware')
/**
 * Main route function to expose backend endpoints
 * @param app
 */
module.exports = function(app, passport){

	app.post('/users/auth', passport.authenticate('local'), controllers.users.login),
	app.get('/users/auth', middleware.auth.isLoggedIn, controllers.users.isLoggedIn),
	app.delete('/users/auth', middleware.auth.isLoggedIn, controllers.users.logout),

	app.post('/users', controllers.users.create),
	
	app.post('/api/Illness/create', middleware.auth.isLoggedIn, Illness.addIllness),
	app.post('/api/Illness/get', middleware.auth.isLoggedIn, Illness.getIllness),
	app.post('/api/Illness/getLocations', middleware.auth.isLoggedIn, Illness.getIllnessZip),

	app.post('/api/Remedy/add', middleware.auth.isLoggedIn, Remedy.addRemedy),
	app.post('/api/Remedy/get', middleware.auth.isLoggedIn, Remedy.getAllRemedies),

	app.get('/api/getRecs', middleware.auth.isLoggedIn, Illness.getRelatedIllness)

};