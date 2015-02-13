'use strict';

angular.module('cloneApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .when('/:thingId/edit', {
        templateUrl: 'app/main/views/edit.html',
        controller: 'MainCtrl'
      });

  });
