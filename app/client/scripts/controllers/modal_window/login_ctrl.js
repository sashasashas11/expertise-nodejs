'use strict';
/*
 * notify attributes:
 *   - notify.type : 'success' or 'error'
 *   - notify.text  : string message
 *
 */

var UNAUTHORIZED_MSG = "Користувач з такими даними не зареєстрований в системі";

angular.module('Expertise')
    .factory('LoginModalCtrl', function() {
      return function($rootScope, $scope, $modalInstance, $http, $location, UserService) {
        $scope.user = {};
        $scope.login = function (user, form) {
          $http.post('/login', user).success(function (res) {
            $rootScope.user = UserService.get();
            $scope.cancel();
          })
          .error(function (res) {
            if (typeof res == "object") {
              $scope.notify = {
                type : Object.keys(res)[0],
                text : res[Object.keys(res)[0]]
              };
            } else {
              var errorText = ("Unauthorized" == res)? UNAUTHORIZED_MSG: res;
              $scope.notify = {
                type : 'error',
                text : errorText
              };
            }
          });
        };

        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      }
    });
