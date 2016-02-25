angular.module('starter.controllers').
  controller('SettingsCtrl', function($scope) {
    $scope.level = window.localStorage['level'] || "Easy";

    $scope.toggleSetting = function(name, value) {
      window.localStorage[name] = value;
    }
  })
