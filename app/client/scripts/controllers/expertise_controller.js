'use strict';

angular.module('Expertise').
	controller('expertiseController', function ($scope, $http, $location, $modal, ExpertiseModalCtrl, ExpertiseService, ConstructorFunction) {

		$scope.expertise_list = [];
		$scope.criterion = {};
		$scope.alternative = {};

    $scope.expertise_list = ExpertiseService.query();

		$scope.tabs = [ { title:'Альтернативи' }, { title:'Критерії', disabled: true } ];

    $scope.removeExpertise = function (expertise) {
      ExpertiseService.delete({ id: expertise._id }, expertise, function (res) {
        var index = $scope.expertise_list.indexOf(expertise);
        $scope.expertise_list.splice(index, 1);
      });
    };

    $scope.show = function(item) {
      $scope.expertise = item;
    };

		$scope.addAlternative = ConstructorFunction('add', $scope, 'alternative', 'alternatives');
    $scope.removeAlternative = ConstructorFunction('delete', $scope, 'alternative', 'alternatives');
    $scope.addCriterion = ConstructorFunction('add', $scope, 'criterion', 'criterions');
    $scope.removeCriterion = ConstructorFunction('delete', $scope, 'criterion', 'criterions');

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