'use strict';

angular.module('Expertise', [
		'ngRoute',
		'ui.bootstrap',
    'ngResource',
		'textAngular',
		'ui'
	])
  .config(function ($routeProvider) {
		$routeProvider.
			when("/welcome", { templateUrl: "views/welcome.html", controller: "welcomeController" }).
			when("/expertise", { templateUrl: "views/expertise.html", controller: "expertiseController" }).
			otherwise({redirectTo: '/welcome'});
	})
	.config(['$locationProvider', function ($locationProvider) {
		$locationProvider.html5Mode(true).hashPrefix('!');
	}]);