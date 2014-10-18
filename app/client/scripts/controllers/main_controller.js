'use strict';

angular.module('Expertise').
    controller('mainController', function ($rootScope, $scope, $modal, SignupModalCtrl, LoginModalCtrl) {

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

