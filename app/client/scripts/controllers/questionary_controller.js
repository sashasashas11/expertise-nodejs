'use strict';

angular.module('Expertise').controller('questionaryController', function ($scope, questionaryService) {
    $scope.questionary = questionaryService.query();

    });