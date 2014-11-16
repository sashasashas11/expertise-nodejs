'use strict';

angular.module('Expertise').
	controller('expertiseController', function ($scope, $modal, ExpertiseModalCtrl, ExpertiseService, ConstructorFunction,
                                              ModalWindowFactory, DeleteModalCtrl, ExpertService, $mdToast, MarkService) {
    $scope.expertise_list = ExpertiseService.query();
		$scope.criterion = {};
		$scope.alternative = {};
    $scope.users = ExpertService.query();
    $scope.status = [ { open: true } ];

    $scope.setting = { minValue: 1, maxValue: 100, percentages: 'false' };

    $scope.$watch('setting.minValue', function(value) {
      if (value < 0)
        $scope.setting.minValue = 0;
    });

    $scope.$watch('setting.maxValue', function(value) {
      if (value < 0)
        $scope.setting.maxValue = 0
    });

		$scope.tabs = [
      { title:'Альтернативи', content: 'alternative' },
      { title:'Критерії', content: 'criterion' },
      { title:'Експерти', content: 'experts' },
      { title:'Оцінювання', content: 'evaluation_setting' }
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

    $scope.addExpert = function (expert, expertise) {
      expert.expertises.push(expertise._id);
      ExpertService.save({ id: expert._id }, {expertises: expert.expertises});
    };

    $scope.deleteExpert = function (expert, expertise) {
      var index = expert.expertises.indexOf(expertise._id);
      expert.expertises.splice(index, 1);
      ExpertService.save({ id: expert._id }, {expertises: expert.expertises});
    };

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