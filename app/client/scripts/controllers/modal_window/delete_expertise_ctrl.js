angular.module('Expertise').controller('DeleteModalCtrl', function($scope, $modalInstance, Expertise) {
    $scope.expertise = Expertise;

    $scope.delete = function (expertise) {
      $modalInstance.close(expertise);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
});

