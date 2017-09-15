angular.module('starter.services')
  .service('Alert', function($window, Audio) {


    this.leaveGame = function(){
      swal({
        title: "Quit game?",
        type: "warning",
        showCancelButton: true
      }, function() {
        $window.location.href = '#/home';

        var soundOn = window.localStorage['sound'] == "On" ? true : false;
        if(soundOn) Audio.play('quit-game-ok')

        if(window.AdMob) AdMob.showInterstitial();
      });
    }
  });