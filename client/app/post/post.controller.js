'use strict';

angular.module('cloneApp')
  .controller('PostCtrl', function ($scope, $http) {
    $scope.posts = [];
    $http.get('posts.json').success(function(data){
      $scope.posts = data;
    });


  });
