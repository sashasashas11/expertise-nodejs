angular.module('Expertise')
    .factory('LoginModalCtrl', function() {
      return function($scope, $modalInstance, $http, $location) {
        $scope.user = {};
        $scope.signup = function (user, form) {
          $http.post('/signup', user).success(function (res) {
            $location.path("/");
          })
        }
      }
    });
