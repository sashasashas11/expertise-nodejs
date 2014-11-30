angular.module('Expertise')
    .factory('MethodsService', function($resource) {
      var getMethods = function (res) {
        return JSON.parse(res).methods;
      };

      return $resource('/api/methods/:id',{'id': '@id'}, {
        'query': {
          method: 'GET',
          isArray: true,
          transformResponse: getMethods
        },
        'update': { method: 'PUT' }
      });
    });
