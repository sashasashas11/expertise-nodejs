angular.module('Expertise')
    .factory('DeleteModalCtrl', function() {
      return function($scope, $modalInstance, $http, $location, Expertise, deleteExpertise) {
        $scope.expertise = Expertise;
        $scope.delete = function (expertise) {
          deleteExpertise(expertise);
          $scope.cancel();
        };

        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      }
    });

