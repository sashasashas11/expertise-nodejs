angular.module('Expertise')
    .factory('ModalWindowFactory', function($modal) {
      return function ModalWindowFactory(templateName, controller) {
        return function () {
          var modalInstance = $modal.open({
            templateUrl: '../views/model_window/'+ templateName + '_modal.html',
            controller: controller
          });
        };
      }
    });
