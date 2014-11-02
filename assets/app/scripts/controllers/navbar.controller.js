'use strict';

angular.module('finanzomatApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Editor',
      'link': 'editor'
    }, {
      'title': 'About',
      'link': 'about'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });