'use strict';

angular.module('Expertise').
	controller('welcomeController', function ($rootScope, $scope, $http, MethodsService) {
		$scope.methods = MethodsService.query();
    $scope.editText = [];

		$scope.updateMethod = function(method) {
      MethodsService.update({id: method._id}, { text: method.text });
		};

	});
