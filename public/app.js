(function() {
	var app = angular.module('collegemd', ['ngRoute']);

	app.config(function($routeProvider, $locationProvider) {

	$routeProvider.when('/', {
			templateUrl: 'index.html',
			controller: 'main_controller.js'
		});	


	if(window.history && window.history.pushState){
    		$locationProvider.html5Mode(true);
  		}
	});
})();