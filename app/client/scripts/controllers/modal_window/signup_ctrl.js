angular.module('Expertise')
    .factory('SignupModalCtrl', function() {
      return function($scope, $modalInstance, $http, $location) {
        $scope.user = {};
        $scope.login = function (user, form) {
          $http.post('/login', user).success(function (res) {
            $location.path("/");
          })
        }
      }
    });