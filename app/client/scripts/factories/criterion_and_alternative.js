angular.module('Expertise')
    .factory('ConstructorFunction', function(ExpertiseService) {
      return function ConstructorFunction(type, $scope, modal, ArrayName) {
          return function(entity, expertise) {
            var index = $scope.expertise_list.indexOf(expertise);
            if (type == 'delete') {
              var entityIndex = $scope.expertise_list[index][ArrayName].indexOf(entity);
              expertise[ArrayName].splice(entityIndex, 1);
            }
            else
              expertise[ArrayName].push(entity);
            ExpertiseService.update({ id: expertise._id }, expertise, function (res) {
              $scope[modal].name =  "";
              $scope.expertise_list[index][ArrayName] = res[ArrayName];
            });
          };
      }
    });
