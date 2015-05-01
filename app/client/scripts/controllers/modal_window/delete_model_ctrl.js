angular.module('Expertise').controller('DeleteModalCtrl', function($scope, $modalInstance, item, type) {

    CONTENT = {
      alternative: "альтернативу",
      criterion: "критерій",
      expertise: "експертизу"
    };

    $scope.item = item;
    $scope.type = CONTENT[type];

    $scope.delete = function () {
        $modalInstance.close($scope.item)
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

