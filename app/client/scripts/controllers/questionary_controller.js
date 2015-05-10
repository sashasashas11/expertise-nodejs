'use strict';

angular.module('Expertise').controller('questionaryController', function ($scope, questionaryService) {
    $scope.questionary = questionaryService.query();

    $scope.questionaryModalWindow = function (questionary) {
        $modal.open({
            templateUrl: 'views/expertise_modal.html',
            controller: 'ExpertiseModalCtrl',
            resolve: {
                expertiseList: function () { return $scope.expertise_list; },
                editExpertise: function () { return questionary }
            }
        });
    };
    });