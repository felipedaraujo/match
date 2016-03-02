angular.module('starter.services')
  .service('Alert', function($window) {

    this.leaveGame = function(){
      swal({
        title: "Quit game?",
        type: "warning",
        showCancelButton: true
      }, function() {
        $window.location.href = '#/home';
        if(AdMob) AdMob.showInterstitial();
      });
    }

  });