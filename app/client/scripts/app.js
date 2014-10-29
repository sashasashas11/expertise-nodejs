'use strict';

angular.module('Expertise', [
		'ngRoute',
		'ui.bootstrap',
    'ngResource',
		'textAngular',
		'ui',
//    'ngAnimate',
//    'ngAria',
		'ngMaterial'
	])
  .config(function ($routeProvider, $locationProvider) {
		$routeProvider.
			when("/welcome", { templateUrl: "views/welcome.html", controller: "welcomeController" }).
			when("/expertise", { templateUrl: "views/expertise.html", controller: "expertiseController" }).
			otherwise({redirectTo: '/welcome'});

      $locationProvider.html5Mode(true);
	})
//	.config(['$locationProvider', function ($locationProvider) {
//		$locationProvider.html5Mode(true).hashPrefix('!');
//	}]);