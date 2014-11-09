angular.module('Expertise')
    .factory('MarkService', function($resource) {
      return $resource('/api/marks/:id',{id: "@id"}, {});
    });