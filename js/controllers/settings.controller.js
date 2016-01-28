angular.module('starter.controllers').
  controller('SettingsCtrl', function($scope, $http) {
    $scope.level = window.localStorage['level'] || "Easy";
    $scope.sound = window.localStorage['sound'] || "On";

    $scope.toggleSetting = function(name, value) {
      window.localStorage[name] = value;
    }

  })