angular.module('starter.controllers').
  controller('HomeCtrl', function($scope, $location, $cordovaSocialSharing) {
    $scope.go = function ( path ) {
      $location.path( path );
    };

    $scope.share = function() {
      var message = 'Tres is a card game designed to put your brain to the test! Make as many Tres sets as you...';
      var subject = 'Have you heard about Tres Card Game?';
      var file = 'www/img/tres-card-game.png';
      var link = 'http://bit.ly/1QKWkPQ';

      $cordovaSocialSharing
        .share(message, subject, file, link)
        .then(function(result) {
          // Success!
        }, function(err) {
          // An error occured. Show a message to the user
        });
    }
})