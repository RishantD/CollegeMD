(function() {
	var app = angular.module('collegemd');
	app.controller('main_controller', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
		
		$scope.illness = '';
		$scope.new_illness = '';
		$scope.test = 'HIIII!';

		$scope.searchIllness = function() {
			alert("Worked!");
			$http({
  				method: 'POST',
  				url: '/api/Illness/get',
  				data: $.param($scope.illness)
			});
		};

		$scope.addIllness = function() {
			$http({
  				method: 'POST',
  				url: '/api/Illness/create',
  				data: $.param($scope.new_illness)
			});
		};

	}]);
})();