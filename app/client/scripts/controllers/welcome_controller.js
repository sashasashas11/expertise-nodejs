'use strict';

angular.module('Expertise').
	controller('welcomeController', function ($rootScope, $state, $scope, $http, MethodsService) {
		$scope.methods = MethodsService.query();
    $scope.editText = [];
    if ($state.current.name == 'login')
      $rootScope.loginModelOpen();

		$scope.updateMethod = function(method) {
      MethodsService.update({id: method._id}, { text: method.text });
		};

	});
