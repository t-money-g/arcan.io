'use strict';

var postServices = angular.module('postServices', ['ngResource']);
postServices.factory('Post',['$resource',
  function($resource){
    return $resource('posts.json',{});
  }]);
