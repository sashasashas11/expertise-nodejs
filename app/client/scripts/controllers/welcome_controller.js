'use strict';

angular.module('Expertise').
	controller('welcomeController', function ($scope, $http) {
		$scope.methods = [];
		$http.get('/api/methods').success(function(res) {
      $scope.methods = res.methods;
		});

		$scope.updateMethod = function(method) {
			$http.put('/api/methods/'+ method.id, {text: method.text})
		}
	});
