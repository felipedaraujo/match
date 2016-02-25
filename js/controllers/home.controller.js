angular.module('starter.controllers').
  controller('HomeCtrl', function($scope, $location) {
    $scope.go = function ( path ) {
      $location.path( path );
    };
  })