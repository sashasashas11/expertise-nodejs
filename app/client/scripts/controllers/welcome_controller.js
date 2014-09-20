'use strict';

angular.module('Expertise').
	controller('welcomeController', function ($scope, $http) {
		$scope.methods = { questionnaire: [], noQuestionnaire: [] };
		$http.get('/methods').success(function(res) {
			for (var i = 0; i < res.length; i++) {
				if (res[i].title == "Анкетні методи")
					var parentId = res[i].id;
				if (res[i].parent == parentId)
					$scope.methods.questionnaire.push(res[i]);
				else if (res[i].title != "Анкетні методи")
					$scope.methods.noQuestionnaire.push(res[i]);
			}
		});

		$scope.updateMethod = function(method) {
			$http.put('/methods/'+ method.id, {text: method.text})
		}
	})
