(function() {
	var app = angular.module('collegemd');
	app.controller('main_controller', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
		
		$scope.illness = '';
		$scope.view_illness = '';
		$scope.new_illness = '';
		$scope.test = 'HIIII!';

		$scope.searchIllness = function() {

			var config = {
				headers: {
					'Content-Type': 'application/json'
				}
			}

			$http.post('api/Illness/get', {name: $scope.illness}, config).then(function(response) {
				$scope.view_illness = response.data;
			});

			// console.log('"name":' + '"' + $scope.illness + '"');
			// $http({
  	// 			method: 'POST',
  	// 			url: '/api/Illness/get',
  	// 			dataType: 'json',
  	// 			headers: {
  	// 				'Content-Type': 'application/json'
 		// 		},
  	// 			data: ('"name":' + '"' + $scope.illness + '"')
			// });
		};

		$scope.addIllness = function() {
			var config = {
				headers: {
					'Content-Type': 'application/json'
				}
			}

			$http.post('api/Illness/create', {name: $scope.new_illness}, config).then(function(response) {
				$scope.new_illness = response.data;
			});
		};

	}]);
})();