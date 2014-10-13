angular.module('Expertise')
    .factory('ExpertiseModalCtrl', function() {
      return function ($scope, $modalInstance, expertiseList) {
        $scope.save = function(expertise) {
          $http.post("/expertizes.json", { name: expertise.name, goal: expertise.goal, method: "test" }).success(function(res){
            expertiseList.push({ name: expertise.name, goal: expertise.goal });
            $scope.cancel();
          });
        };

        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      }
    });
