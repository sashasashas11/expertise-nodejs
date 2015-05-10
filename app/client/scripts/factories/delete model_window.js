angular.module('Expertise')
    .factory('DeleteModalFactory', function($modal) {
      return function DeleteModalFactory(type, callback) {
        return function (item) {
          var modalInstance = $modal.open({
            templateUrl: '../views/model_window/delete.html',
            controller: 'DeleteModalCtrl',
            resolve: {
              item: function () { return item},
              type: function () { return type}
            }
          });
          modalInstance.result.then(callback)
        };
      }
    });

