'use strict';

describe('Controller: PostCtrl', function () {

  // load the controller's module
  beforeEach(module('cloneApp'));

  var PostCtrl, scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('posts.json').
      respond([{title:'first'},{title:'Hello World'}]);

    PostCtrl = $controller('PostCtrl', {
      $scope: scope
    });
  }));

  it('should create "posts" model with 2 posts fetched from xhr', function () {
    //expect(scope.posts).toBeUndefined();
    $httpBackend.flush();

    expect(scope.posts.length).toBe(2);
  });
});
