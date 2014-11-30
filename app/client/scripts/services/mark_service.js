angular.module('Expertise')
    .factory('ExpertService', function($resource) {
      return $resource('/api/experts/:id',{id: "@id"}, {});
    });