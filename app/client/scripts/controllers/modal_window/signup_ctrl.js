angular.module('Expertise').controller('SignupModalCtrl', function($rootScope, $scope, $modalInstance, $http, $location) {
  $scope.user = {};
  $scope.signup = function (user, form) {
    $http.post('/signup', user).success(function (res) {
      $location.path("/");
      $rootScope.messageBox("Акаунт був успішно створений, на ваш E-Mail був надісланий лист з підтвердженням", "warning");
      $scope.cancel();
    })
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
