angular.module('starter.controllers').
  controller('ScoresCtrl', function($scope) {
    $scope.record = window.localStorage['record'] || 0;
    $scope.time = window.localStorage['time'] || '00:00';
  })