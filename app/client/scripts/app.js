'use strict';

angular.module('Expertise', [
		'ngRoute',
		'ui.bootstrap',
    'ngResource',
		'textAngular',
    'ui.router',
		'ngMaterial'
	])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise("/welcome");
      $stateProvider
          .state('expertise', {
            url: "/expertise",
            templateUrl: "views/expertise.html",
            controller: "evaluationController"
          })
          .state('welcome', {
            url: "/welcome",
            templateUrl: "views/welcome.html",
            controller: "welcomeController"
          })
          .state('questionnaire', {
            url: "/questionnaire",
            templateUrl: "views/questionnaire.html",
            controller: "expertiseController"
          })
          .state('questionary', {
              url: "/questionary",
              templateUrl: "views/questionary.html",
              controller: "questionaryController"
          })

    });
