(function() {
	var app = angular.module('collegemd');
	app.controller('main_controller', ['$scope', '$http', '$timeout', '$window', function($scope, $http, $timeout, $window) {
		
		$scope.illness = '';
		$scope.view_illness = '';
		$scope.new_illness = '';
		$scope.new_symptoms = '';
		$scope.delete_illness = '';
		$scope.update_symptoms = '';
		$scope.illness_update_symptoms = '';
		$scope.new_email = '';
		$scope.new_password = '';
		$scope.confirm_password = '';
		$scope.new_zipcode;
		$scope.password_match_error = 'Passwords do not match';
		$scope.new_first_name = '';
		$scope.new_last_name = '';
		$scope.locations = '';

		L.mapbox.accessToken = 'pk.eyJ1IjoicmlzaGFudGQiLCJhIjoidEk0dGdZYyJ9.-ZMFVJwFh4HSYZMYHee7Gw';
		var geocoder = L.mapbox.geocoder('mapbox.places'), map = L.mapbox.map('map', 'rishantd.lbc55bee').setView([38.50, -98.35], 5);

		$scope.searchIllness = function() {

			var config = {
				headers: {
					'Content-Type': 'application/json'
				}
			}

			$http.post('api/Illness/get', {name: $scope.illness}, config).then(function(response) {
				$scope.view_illness = response.data.data;
				$scope.getLocations(response.data.data.name);
			});

		};

		$scope.getLocations = function(illness) {
			var config = {
				headers: {
					'Content-Type': 'application/json'
				}
			}

			$http.post('api/Illness/getLocations', {name: illness}, config).then(function(response) {
				$scope.locations = response.data.data;
			});
		};

		$scope.addIllness = function() {
			var config = {
				headers: {
					'Content-Type': 'application/json'
				}
			}
			var symptoms = [];
			symptoms.push($scope.new_symptoms);
			$http.post('api/Illness/create', {name: $scope.new_illness, symptoms: symptoms}, config).then(function(response) {
				$scope.new_illness = '';
				$scope.new_symptoms = '';
			});
		};

		$scope.deleteIllness = function() {
			var config = {
				headers: {
					'Content-Type': 'application/json'
				}
			}

			$http.post('api/Illness/delete', {name: $scope.delete_illness}, config).then(function(response) {
				$scope.delete_illness = '';
			});
		};

		$scope.updateIllness = function() {
			
			var config = {
				headers: {
					'Content-Type': 'application/json'
				}
			}

			var symp = [];
			symp.push($scope.update_symptoms);

			$http.post('api/Illness/update', {name: $scope.illness_update_symptoms, symptoms: symp}, config).then(function(response) {
				$scope.illness_update_symptoms = '';
				$scope.update_symptoms = '';
			});

		};

		$scope.makeAccount = function() {
			var config = {
				headers: {
					'Content-Type':'application/json'
				}
			}

			$http.post('users', {email: $scope.new_email, password: $scope.new_password, name:{first: $scope.new_first_name,last: $scope.new_last_name}, zipcode: $scope.new_zipcode}, config).then(function(response) {
				alert("Signed Up!");
			});
		};

		$scope.logIn = function() {
			var config = {
				headers: {
					'Content-Type':'application/json'
				}
			}

			$http.post('users/auth', {email: $scope.email_input, password: $scope.pwd_input}, config)
				.success(function(response) {
					console.log(response);
					alert("Worked!");
				})
				.error(function(response) {
					console.log(response);
					alert("Failed D:");
				});
		};

		$scope.logOut = function() {
			$window.location.href= '/';
			$http.delete('users/auth');
		};

		$("#displayAddR").click(function() {
			$("#addR").toggle();
		});
		$("#displayAddI").click(function() {
			$("#addI").toggle();
		});
		$("#displayRemoveR").click(function() {
			$("#removeR").toggle();
		});
		$("#displayRemoveI").click(function() {
			$("#removeI").toggle();
		});
		$("#displayUpdate").click(function() {
			$("#update").toggle();
		});
	}]);
})();