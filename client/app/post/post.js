'use strict';

angular.module('cloneApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/post', {
        templateUrl: 'app/post/view.html',
        controller: 'PostCtrl'
      });
  });
