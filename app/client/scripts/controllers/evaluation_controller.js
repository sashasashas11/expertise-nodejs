'use strict';

angular.module('Expertise').
    controller('evaluationController', function ($scope, $http, ExpertiseService, $mdToast, MarkService) {
      $scope.expertise_list = ExpertiseService.query();
      $scope.evaluation = {};
      $scope.status = [ { open: true } ];
      $scope.result = function (item) {
        $http.get("/api/marks/result/" + item._id).success(function (res) {
          $scope.marks = res.marks;
          $scope.usersMap = res.users;
          var scale = $scope.expertise.setting.scale == 'percentages'? '%': '';
          $scope.resultMarks = $scope.expertise.criterions.map(function (value, index) {
            var index = index;
            return {
              name: value.name,
              users: $scope.marks.map(function (user) {
                return $scope.usersMap[user.account];
              }),
              alternatives: $scope.expertise.alternatives.map(function (alternative, i) {
                var sum = 0;
                return {
                  name: alternative.name,
                  users: $scope.marks.map(function (marks) {
                    var mark = marks.criterions[index].alternatives[i].mark;
                    sum += mark;
                    return { mark: mark + scale }
                  }),
                  sum: (Number(sum/$scope.marks.length).toFixed(2)) + scale
                }
              })
            }
          });
        });
      };

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
