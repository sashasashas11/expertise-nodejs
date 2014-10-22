angular.module('Expertise')
    .factory('SignupModalCtrl', function() {
      return function($scope, $modalInstance, $http, $location) {
        $scope.user = {};
        $scope.signup = function (user, form) {
          $http.post('/signup', user).success(function (res) {
            $location.path("/");
            $scope.cancel();
          })
        };

        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      }
    });
