'use strict';

angular.module('Expertise').
    controller('evaluationController', function ($scope, ExpertiseService, $mdToast, MarkService) {
      $scope.expertise_list = ExpertiseService.query();
      $scope.evaluation = {};
      $scope.status = [ { open: true } ];
      $scope.tabs = [
        { title:'Оцінювання', content: 'evaluation' },
        { title:'Результати', content: 'result' }
      ];

      $scope.show = function(item) {
        $scope.expertise = item;
        MarkService.get({ id: item._id }, function (res) {
          if (!res.criterions) {
            $scope.evaluation.criterions = item.criterions.map(function (value) {
              return {
                criterionName: value.name,
                alternatives: item.alternatives.map(function (i) {
                  return { name: i.name,  mark: 0 }
                })
              }
            });
            $scope.evaluation.expertise = item._id;
          }
          else
            $scope.evaluation = res;
        });

      };

      $scope.complexToastIt = function() {
        $mdToast.show({
          controller: function($scope, $mdToast) {
            $scope.closeToast = function() {
              $mdToast.hide();
            };
          },
          templateUrl: 'views/toast-template.html',
          hideDelay: 5000,
          position: "top right"
        });
      };

      $scope.save = function (evaluation) {
        MarkService.save(evaluation, function (res) {
          $scope.complexToastIt();
        });
      }
    });
