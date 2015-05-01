'use strict';

angular.module('Expertise').controller('expertiseController',
      function ($scope, $modal, ExpertiseService, ConstructorFunction, $timeout, ExpertService) {

    $scope.expertise_list = ExpertiseService.query();
		$scope.criterion = {};
		$scope.alternative = {};
    $scope.users = ExpertService.query();
    $scope.status = [ { open: true } ];

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

    var timeout;
    $scope.show = function(item) {
      $scope.expertise = item;
      if (!$scope.expertise.setting)
        $scope.expertise.setting = { minValue: 1, maxValue: 100, scale: 'manual' };

      $scope.$watchCollection('expertise.setting', function(value) {
        var setting = $scope.expertise.setting;
        setting.step = 1;
        if (setting && setting.scale == "percentages") {
          setting.minValue = 1;
          setting.maxValue = 100;
        }
        if (setting && setting.scale == "decimal") {
          setting.step = 0.1;
          setting.minValue = 0;
          setting.maxValue = 1;
        }
        $timeout.cancel(timeout);
        timeout = $timeout(function () {
          ExpertiseService.update({ id: $scope.expertise._id }, $scope.expertise);
        }, 1000);
      });
    };

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
        controller: 'DeleteModalCtrl',
        resolve: { item: function () { return expertise } }
      });
      modalInstance.result.then(function(expertise) {
        $scope.removeExpertise(expertise)
      })
    };

		$scope.expertiseModalWindow = function (expertise) {
			var modalInstance = $modal.open({
				templateUrl: 'views/expertise_modal.html',
				controller: 'ExpertiseModalCtrl',
				resolve: {
					expertiseList: function () { return $scope.expertise_list; },
          editExpertise: function () { return expertise }
				}
			});
		};

	});