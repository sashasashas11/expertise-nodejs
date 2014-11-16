'use strict';

angular.module('Expertise', [
		'ngRoute',
		'ui.bootstrap',
    'ngResource',
		'textAngular',
		'ngMaterial'
	])
  .config(function ($routeProvider, $locationProvider) {
		$routeProvider.
			when("/welcome", { templateUrl: "views/welcome.html", controller: "welcomeController" }).
			when("/questionnaire", { templateUrl: "views/questionnaire.html", controller: "expertiseController" }).
			when("/expertise", { templateUrl: "views/expertise.html", controller: "evaluationController" }).
			otherwise({redirectTo: '/welcome'});

      $locationProvider.html5Mode(true);
	});
//	.config(['$locationProvider', function ($locationProvider) {
//		$locationProvider.html5Mode(true).hashPrefix('!');
//	}]);