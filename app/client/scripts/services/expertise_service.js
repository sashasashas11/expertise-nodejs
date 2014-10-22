angular.module('Expertise')
        .factory('ExpertiseService', function($resource) {
            return $resource('/api/expertises/:id',{'id': '@id'}, {
              'update': {
                method: 'PUT'
              },
              'query': {method: 'GET', isArray: true }
            });
        });