'use strict';

angular.module('Expertise').
    controller('mainController', function ($rootScope, $scope, $http, ModalWindowFactory, $timeout, SignupModalCtrl, LoginModalCtrl, UserService) {

      $rootScope.loginModelOpen = ModalWindowFactory('login', LoginModalCtrl);
      $rootScope.signupModelOpen = ModalWindowFactory('signup', SignupModalCtrl);

      $http.get("/authenticate").success(function (res) {
        if (res.status)
          $rootScope.user = UserService.get();
      });

      $rootScope.messageBox = function (msg, type) {
        $scope.alert = { type: type, msg: msg };
        $timeout(function () { $scope.closeAlert() }, 10000);
        $scope.closeAlert = function() { $scope.alert = false; };
      };

    });

