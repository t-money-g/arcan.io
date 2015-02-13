'use strict';

angular.module('cloneApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/posts', {
        templateUrl: 'app/post/views/list.html',
        controller: 'PostCtrl'
      })
      .when('/:postId/post/edit', {
        templateUrl: 'app/post/views/edit.html',
        controller: 'PostCtrl'
      });
  });
