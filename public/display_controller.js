(function() {
	var app = angular.module('collegemd');
	app.controller('display_controller', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
		
		$scope.illness = "";

		$scope.searchIllness = function() {
			$http({
  				method: 'GET',
  				url: '/someUrl',
  				data: $.param($scope.illness)
			});
		};
		
	}]);
})();