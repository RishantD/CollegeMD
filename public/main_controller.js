(function() {
	var app = angular.module('collegemd');
	app.controller('main_controller', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
		
		$scope.illness = '';

		$scope.searchIllness = function() {
			$http({
  				method: 'GET',
  				url: '/api/Illness/get',
  				data: $.param($scope.illness)
			});
		};
	}]);
})();