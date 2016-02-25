angular.module('starter.controllers').
  controller('HowToPlayCtrl', function($scope, $state) {
    $scope.updatePage = function(page) {
      $scope.hasPrevious = page != '1' ? true : false;
      $scope.hasNext = page != '3' ? true : false;

      $scope.previousPage = $scope.hasPrevious ? parseInt(page) - 1 : null;
      $scope.nextPage = $scope.hasNext ? parseInt(page) + 1 : null;
    }
  }).
  controller('HowToPlayPageCtrl', function($scope, $stateParams) {
    if ($scope.updatePage) $scope.updatePage($stateParams.page)
  })
