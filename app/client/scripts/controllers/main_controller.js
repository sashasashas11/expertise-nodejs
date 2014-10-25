'use strict';

angular.module('Expertise').
    controller('mainController', function ($rootScope, $scope, $http, ModalWindowFactory, SignupModalCtrl, LoginModalCtrl, UserService) {

      $rootScope.loginModelOpen = ModalWindowFactory('login', LoginModalCtrl);
      $rootScope.signupModelOpen = ModalWindowFactory('signup', SignupModalCtrl);

      $http.get("/authenticate").success(function (res) {
        if (res.status)
          $rootScope.user = UserService.get();
      });

    });

