angular.module('Expertise')
    .factory('UserService', function($resource) {
      return $resource('/api/current_user/:id',{'id': '@id'}, {
        'get': {
          method: 'GET',
          isArray: false
        }
      });
    });