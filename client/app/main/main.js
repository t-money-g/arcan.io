'use strict';

angular.module('cloneApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/post/views/public/list.html',
        controller: 'PostCtrl'
      })
      .when('/:thingId/edit', {
        templateUrl: 'app/main/views/edit.html',
        controller: 'MainCtrl'
      });

  });
