'use strict';

angular.module('cloneApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/posts', {
        templateUrl: 'app/post/views/list.html',
        controller: 'PostCtrl'
      })
      .when('/admin/posts', {
        templateUrl: 'app/post/views/admin/list.html',
        controller: 'PostCtrl'
      })
      .when('/posts/:postId', {
        templateUrl: 'app/post/views/public/view.html',
        controller:'PostCtrl'
      })
      .when('/post/create', {
        templateUrl: 'app/post/views/admin/create.html',
        controller: 'PostCtrl'
      })
      .when('/admin/posts/:postId/edit/', {
        templateUrl: 'app/post/views/admin/edit.html',
        controller: 'PostCtrl'
      });
  });
