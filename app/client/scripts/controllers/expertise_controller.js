'use strict';

angular.module('Expertise').
	controller('expertiseController', function ($scope, $http, $location, $modal, ExpertiseModalCtrl, ExpertiseService) {

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

		$scope.addAlternative = function(alternative, expertise) {
      var index = $scope.expertise_list.indexOf(expertise);
      expertise.alternatives.push(alternative);
      ExpertiseService.update({ id: expertise._id }, expertise, function (res) {
        $scope.alternative.name =  "";
        $scope.expertise_list[index].alternatives = res.alternatives;
      });
		};

		$scope.removeAlternative = function(alternative, expertise) {
      var index = $scope.expertise_list.indexOf(expertise);
      var alternativeIndex = $scope.expertise_list[index].alternatives.indexOf(alternative);
      expertise.alternatives.splice(alternativeIndex, 1);
      ExpertiseService.update({ id: expertise._id }, expertise, function (res) {
        $scope.expertise_list[index].alternatives = res.alternatives;
      });
		};

//		CRITERION BLOCK
		$scope.addCriterion = function(criterion, expertise) {
      var index = $scope.expertise_list.indexOf(expertise);
      expertise.criterions.push(criterion);
      ExpertiseService.update({ id: expertise._id }, expertise, function (res) {
        $scope.criterion.name =  "";
        $scope.expertise_list[index].criterions = res.criterions;
      });
		};

		$scope.removeCriterion = function(criterion, expertise) {
      var index = $scope.expertise_list.indexOf(expertise);
      var criterionIndex = $scope.expertise_list[index].criterions.indexOf(criterion);
      expertise.criterions.splice(criterionIndex, 1);
      ExpertiseService.update({ id: expertise._id }, expertise, function (res) {
        $scope.expertise_list[index].criterions = res.criterions;
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