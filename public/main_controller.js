(function() {
	var app = angular.module('collegemd');
	app.controller('main_controller', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
		
		$scope.illness = '';
		$scope.view_illness = '';
		$scope.new_illness = '';
		$scope.test = 'HIIII!';
		$scope.new_symptoms = {};
		$scope.delete_illness = '';
		$scope.update_symptoms = {};
		$scope.illness_update_symptoms = '';

		$scope.searchIllness = function() {

			var config = {
				headers: {
					'Content-Type': 'application/json'
				}
			}

			$http.post('api/Illness/get', {name: $scope.illness}, config).then(function(response) {
				$scope.view_illness = response.data.data;
				console.log($scope.view_illness);
			});

		};

		$scope.addIllness = function() {
			console.log($scope.new_symptoms);
			var config = {
				headers: {
					'Content-Type': 'application/json'
				}
			}
			var symptoms = [];
			symptoms.push($scope.new_symptoms);
			$http.post('api/Illness/create', {name: $scope.new_illness, symptoms: symptoms}, config).then(function(response) {
				$scope.new_illness = response.data;
			});
		};

		$scope.deleteIllness = function() {
			console.log($scope.delete_illness);
			var config = {
				headers: {
					'Content-Type': 'application/json'
				}
			}

			$http.post('api/Illness/delete', {name: $scope.delete_illness}, config).then(function(response) {
				$scope.delete_illness = response.data;
				console.log($scope.delete_illness);
			});
		};

		$scope.updateIllness = function() {
			console.log($scope.update_symptoms);
			var config = {
				headers: {
					'Content-Type': 'application/json'
				}
			}

			$http.post('api/Illness/update', {name: $scope.illness_update_symptoms, symptoms: $scope.update_symptoms}, config).then(function(response) {
				$scope.illness_update_symptoms = response.data;
				console.log($scope.illness_update_symptoms);
			});

		}

	}]);
})();