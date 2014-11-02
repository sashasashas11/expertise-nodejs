angular.module('Expertise')
    .factory('ExpertiseModalCtrl', function() {
      return function ($scope, $modalInstance, expertiseList, editExpertise, ExpertiseService, MethodsService) {
        $scope.methods = [
          {name: "Метод аналізу співвідношень"},
          {name: "Метод нормування"},
          {name: "Метод попарних порівнянь"},
          {name: "Метод ранжування"},
          {name: "Метод аналізу ієрархій"},
        ];

        if (editExpertise) {
          $scope.expertise = angular.copy(editExpertise);
          $scope.methods.forEach(function (method, index) {
            if (method.name == editExpertise.method.name)
              $scope.methodIndex = index;
          });
          $scope.edit = true;
        }

        $scope.save = function(expertise) {
          ExpertiseService.save({}, expertise, function (res) {
            if (res.error)
              return  console.log(res.error);
            expertiseList.push(res);
            $scope.cancel();
          });
        };

        $scope.update = function(expertise) {
          ExpertiseService.update({ id: expertise._id }, expertise, function (res) {
            var index = expertiseList.indexOf(expertise);
            for (var i = 0; i < expertiseList.length; i++) {
              if (expertiseList[i]._id == expertise._id)
                expertiseList[i] = expertise;
            }
            $scope.cancel();
          });
        };

        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      }
    });
