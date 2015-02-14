'use strict';

angular.module('cloneApp')
  .controller('PostCtrl',
   function ($scope, $http, $routeParams,$location,Posts,Auth) {
    $scope.authentication = Auth;

    $scope.posts = Posts.query();
    $scope.editable = true;
    $scope.create = function(){

      var post = new Posts({
        title: this.title,
        date: Date.now(),
        tags: this.tags, // array of strings
        content: this.content,
        slug: this.slug,

        updated: this.date,
        excerpt : this.excerpt,
        categories: this.categories, //array of strings
        published: this.published,
        link: this.link,
      });
      post.$save(function(response) {

        $scope.title ='';
        $scope.date = new Date();
        $scope.tags =[];
        $scope.content ='';
        $scope.slug = '';
        $scope.updated = new Date();
        $scope.excerpt = '';
        $scope.categories = [];
        $scope.link = '';
         $location.path('/posts/' + response._id);

      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.remove = function(post) {
      if(post){
        post.$remove();
        for(var i in $scope.posts) {
          if($scope.posts[i] === post) {
            $scope.posts.splice(i, 1);
          }
        }
      } else {
        $scope.post.$remove(function() {
          $location.path('posts');
        });
      }
    };

    $scope.update = function() {
      var post = $scope.post;
      post.$update(function() {
        $location.path('posts/' + post._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.find = function() {
      $scope.posts = Posts.query();
    };

    $scope.findOne = function() {
      $scope.post = Posts.get({
        postId: $routeParams.postId
      });
    };

    $scope.imageUpload = function(files, editor) {
     //send the file to server
      console.log('image upload:', files, editor);
     editor.insertImage($scope.editable, files[0]);
  };


});
