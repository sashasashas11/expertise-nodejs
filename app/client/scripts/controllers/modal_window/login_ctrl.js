angular.module('Expertise')
    .factory('LoginModalCtrl', function() {
      return function($rootScope, $scope, $modalInstance, $http, $location, UserService) {
        $scope.user = {};
        $scope.login = function (user, form) {
          $http.post('/login', user).success(function (res) {
            $location.path("/expertise");
            $rootScope.user = UserService.get();
            $scope.cancel();
          })
        };

        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      }
    });
