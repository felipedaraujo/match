angular.module('starter.controllers').
  controller('ScoresCtrl', function($scope) {
    window.localStorage['record'] =  window.localStorage['record'] || 0;
    $scope.record = window.localStorage['record'];
  })