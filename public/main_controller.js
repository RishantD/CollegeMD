(function() {
	var app = angular.module('collegemd');
	app.controller('main_controller', ['$scope', '$http', '$timeout', '$window', '$viewContentLoaded', function($scope, $http, $timeout, $window) {
		
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
		$scope.illnessrecs = {};
		$scope.loggedIn = false;

		L.mapbox.accessToken = 'pk.eyJ1IjoicmlzaGFudGQiLCJhIjoiY2ltemxpYXp2MDR3Z3drbHVoOHZ0Z2NuYSJ9.Z1Dq85YdC-PRd1WqZUi7sA';
		var geocoder = L.mapbox.geocoder('mapbox.places'), map = L.mapbox.map('map', 'rishantd.lbc55bee').setView([38.50, -98.35], 3);
		var markers = new L.MarkerClusterGroup();

		$scope.isLoggedIn = function() {
			var config = {
				headers: {
					'Content-Type': 'application/json'
				}
			}

			$http.get('users/auth', config)
				.success(function(response) {
					$scope.loggedIn = true;
				});
		};

		$scope.$on('$viewContentLoaded', function() {
		    $scope.isLoggedIn();
		});

		$scope.searchIllness = function() {

			var config = {
				headers: {
					'Content-Type': 'application/json'
				}
			}

			$http.post('api/Illness/get', {name: $scope.illness}, config).then(function(response) {
				$scope.view_illness = response.data.data;
				$scope.getLocations(response.data.data);
			});

		};

		$scope.getLocations = function(illness) {
			
			map.removeLayer(markers);
  			markers.clearLayers();

			if (illness.hasOwnProperty('name')) {
				var config = {
					headers: {
						'Content-Type': 'application/json'
					}
				}

				$http.post('api/Illness/getLocations', {name: illness.name}, config).then(function(response) {
					$scope.locations = response.data.data;
					$scope.render();
				});
			}
		};

		$scope.render = function(){
			for (i = 0; i < $scope.locations.length; i++)
			{  
				geocoder.query(String($scope.locations[i].zipcode), showMap);
				function showMap(err, data) {
					console.log(data);
					var marker = L.circle([data.latlng[0], data.latlng[1]], 500, {
						color: 'red',
						fillColor: '#f03',
						fillOpacity: 0.5
					});
					markers.addLayer(marker); 
				}   
			}
      		map.addLayer(markers);
		}

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
				$scope.logIn(true);
			});
		};

		$scope.logIn = function(signup) {
			var config = {
				headers: {
					'Content-Type':'application/json'
				}
			}

			if (signup) {
				$scope.email_input = $scope.new_email;
				$scope.pwd_input = $scope.new_password;
			}

			$http.post('users/auth', {email: $scope.email_input, password: $scope.pwd_input}, config)
				.success(function(response) {
					alert("Logged In Successfully!");
					$scope.loggedIn = true;
					$scope.new_email = '';
					$scope.new_password = '';
					$scope.confirm_password = '';
					$scope.new_zipcode = '';
					$scope.new_first_name = '';
					$scope.new_last_name = '';
					$scope.illnessrecs = {};
					$http.get('api/getRecs', config)
						.success(function(response) {
							$scope.illnessrecs = response.data;
						})
						.error(function(response) {
							alert("No one has searched anything in your area before");
						});
				})
				.error(function(response) {
					alert("Incorrect Email or Password");
				});
		};

		$scope.logOut = function() {
			$window.location.href= '/';
			$http.delete('users/auth').success(function(response) {
				$scope.loggedIn = false;
			});
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