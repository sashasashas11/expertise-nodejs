'use strict';

angular.module('Expertise').
	controller('welcomeController', function ($rootScope, $scope, $http) {
		$scope.methods = [];
		$http.get('/api/methods').success(function(res) {
      $scope.methods = res.methods;
		});

		$scope.updateMethod = function(method) {
			$http.put('/api/methods/'+ method._id, { text: method.text })
		};

	});
