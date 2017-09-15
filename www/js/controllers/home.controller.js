angular.module('starter.controllers').
  controller('HomeCtrl', function($cordovaSocialSharing, $ionicPlatform, $location,
    $scope, $timeout, Audio) {

    var soundOn = window.localStorage['sound'] == "On" ? true : false;

    $scope.init = function() {
      $ionicPlatform.ready(function() {
        if(soundOn) Audio.play('main-menu-loop');
      });
    };

    $scope.go = function(path) {
      if(soundOn) Audio.stop('main-menu-loop');
      $location.path(path);
    };

    $scope.share = function() {
      var message = 'Tres is a card game designed to put your brain to the test! Make as many Tres sets as you...';
      var subject = 'Have you heard about Tres Card Game?';
      var file = 'www/img/tres-card-game.png';
      var link = 'http://bit.ly/1QKWkPQ';

      $cordovaSocialSharing.share(message, subject, file, link);
    };
})