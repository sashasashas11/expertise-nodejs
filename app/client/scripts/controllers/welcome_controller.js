'use strict';

angular.module('Expertise').
	controller('welcomeController', function ($rootScope, $scope, $http, $modal) {
		$scope.methods = [];
		$http.get('/api/methods').success(function(res) {
      $scope.methods = res.methods;
		});

		$scope.updateMethod = function(method) {
			$http.put('/api/methods/'+ method.id, {text: method.text})
		};

      $rootScope.loginModelOpen = function () {
          var modalInstance = $modal.open({
            templateUrl: '../views/login_modal.html',
            controller: loginModalCtrl
          });
      };

      var loginModalCtrl = function($scope, $modalInstance, $http, $location) {
        $scope.user = {};
        $scope.login = function (user, form) {
          $http.post('/login', user).success(function (res) {
            $location.path("/");
          })
        }
      }

      $rootScope.signupModelOpen = function () {
        var modalInstance = $modal.open({
          templateUrl: '../views/signup_modal.html',
          controller: signupCtrl
        });
      };

      var signupCtrl = function($scope, $modalInstance, $http, $location) {
        $scope.user = {};
        $scope.signup = function (user, form) {
          $http.post('/signup', user).success(function (res) {
            $location.path("/");
          })
        }
      }
	});
