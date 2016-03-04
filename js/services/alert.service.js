angular.module('starter.services')
  .service('Alert', function($window, Audio) {

    this.leaveGame = function(){
      swal({
        title: "Quit game?",
        type: "warning",
        showCancelButton: true
      }, function() {
        $window.location.href = '#/home';

        Audio.play('quit-game-ok')

        if(AdMob) AdMob.showInterstitial();
      });
    }
  });