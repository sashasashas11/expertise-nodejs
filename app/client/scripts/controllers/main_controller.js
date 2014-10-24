'use strict';

angular.module('Expertise').
    controller('mainController', function ($rootScope, $scope, ModalWindowFactory, SignupModalCtrl, LoginModalCtrl) {

      $rootScope.loginModelOpen = ModalWindowFactory('login', LoginModalCtrl);
      $rootScope.signupModelOpen = ModalWindowFactory('signup', SignupModalCtrl);

    });

