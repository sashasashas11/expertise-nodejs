angular.module('Expertise').factory('questionaryService', function($resource) {
  return $resource('/api/questionnaire/:id',{'id': '@id'}, {
    'query': {method: 'GET', isArray: true }
  });
});
