'use strict';

angular.module('Expertise').
	controller('expertiseController', function ($scope, $modal, ExpertiseModalCtrl, ExpertiseService, ConstructorFunction, ModalWindowFactory, DeleteModalCtrl) {

    $scope.expertise_list = ExpertiseService.query();
		$scope.criterion = {};
		$scope.alternative = {};
    $scope.users = [];

		$scope.tabs = [
      { title:'Альтернативи', content: 'alternative' },
      { title:'Критерії', content: 'criterion' },
      { title:'Експерти', content: 'experts' }
    ];

    $scope.removeExpertise = function (expertise) {
      ExpertiseService.delete({ id: expertise._id }, expertise, function (res) {
        var index = $scope.expertise_list.indexOf(expertise);
        $scope.expertise_list.splice(index, 1);
        $scope.expertise = {};
      });
    };

    $scope.show = function(item) { $scope.expertise = item; };

		$scope.addAlternative = ConstructorFunction('add', $scope, 'alternative', 'alternatives');
    $scope.removeAlternative = ConstructorFunction('delete', $scope, 'alternative', 'alternatives');
    $scope.addCriterion = ConstructorFunction('add', $scope, 'criterion', 'criterions');
    $scope.removeCriterion = ConstructorFunction('delete', $scope, 'criterion', 'criterions');

    $scope.removeExpertiseModalWindow = function (expertise) {
      var modalInstance = $modal.open({
        templateUrl: 'views/delete_expertise_modal.html',
        controller: DeleteModalCtrl,
        resolve: {
          deleteExpertise: function () { return $scope.removeExpertise; },
          Expertise: function () { return expertise }
        }
      });
    };

		$scope.expertiseModalWindow = function (expertise) {
			var modalInstance = $modal.open({
				templateUrl: 'views/expertise_modal.html',
				controller: ExpertiseModalCtrl,
				resolve: {
					expertiseList: function () { return $scope.expertise_list; },
          editExpertise: function () { return expertise }
				}
			});
		};

	});