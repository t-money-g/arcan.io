'use strict';

angular.module('cloneApp')
  .controller('PostCtrl',
   function ($scope, $http, $routeParams,$location) {

    $scope.posts =  $scope.posts || [];

  if($scope.posts.length === 0) {
    $http.get('posts.json').success(function(data){
      $scope.posts = data;
    });
  }



     $scope.getPost = function() {
      $http.get('posts.json').success(function (posts) {
        for(var i =0; i<posts.length; i++){
          if(posts[i]._id ===  $routeParams.postId) {
          $scope.post = posts[i];
        }
        }
      });
    };

    $scope.updatePost = function() {
      $http.get('posts.json').success(function (posts) {
        for(var i =0; i<posts.length; i++){
          if(posts[i]._id ===  $routeParams.postId) {
            $scope.posts[i] = {title: $scope.post.title, content: $scope.post.content};

            $location.path("/posts");
          }
        }
      });
    };
  });
