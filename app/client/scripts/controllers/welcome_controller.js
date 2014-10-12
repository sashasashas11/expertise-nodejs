'use strict';

angular.module('Expertise').
	controller('welcomeController', function ($rootScope, $scope, $http, $modal, SignupModalCtrl, LoginModalCtrl) {
		$scope.methods = [];
		$http.get('/api/methods').success(function(res) {
      $scope.methods = res.methods;
		});

		$scope.updateMethod = function(method) {
			$http.put('/api/methods/'+ method.id, { text: method.text })
		};

    $rootScope.loginModelOpen = function () {
        var modalInstance = $modal.open({
          templateUrl: '../views/login_modal.html',
          controller: LoginModalCtrl
        });
    };

    $rootScope.signupModelOpen = function () {
      var modalInstance = $modal.open({
        templateUrl: '../views/signup_modal.html',
        controller: SignupModalCtrl
      });
    };

	});
