angular.module('Expertise').controller('DeleteModalCtrl', function($scope, $modalInstance, item) {
    $scope.item = item;

    $scope.delete = function () {
      $modalInstance.close($scope.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
});

