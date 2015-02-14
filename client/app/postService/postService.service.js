'use strict';

angular.module('cloneApp').factory('Posts', ['$resource', function($resource){
  return $resource('api/posts/:postId',
  {
    postId: '@_id'
  },
  {
    update: {
      method : 'PUT'
    }
  });
}
]);
