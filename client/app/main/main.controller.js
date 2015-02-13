'use strict';

angular.module('cloneApp')
  .controller('MainCtrl', function ($scope, $http,$routeParams,$location) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };


    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.getThing = function() {
      $http.get('/api/things/' + $routeParams.thingId).success(function (thing) {
        $scope.thing = thing;
      });
    };

    $scope.updateThing = function() {
      $http.put('/api/things/' + $scope.thing._id, {name: $scope.thing.name,
                                                    info: $scope.thing.info})
      .error(function(errorResponse) {
        /* Act on the event */
        $scope.error = errorResponse.data.message;
      })
      .success(function() {
        $location.path("/");
      });
    };
  });
