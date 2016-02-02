angular.module('starter.services')
  .service('Audio', function($ionicPlatform, $cordovaNativeAudio) {

    document.addEventListener('deviceready', this.receivedEvent, false);

    receivedEvent = function() {
      if( window.plugins && window.plugins.NativeAudio ) {
        window.plugins.NativeAudio.preloadSimple('select', 'audio/select-pop.mp3',
          function(msg){ console.info(msg); },
          function(msg){ console.error( 'error: ' + msg ); }
        );
      }
    }

    this.select = function(){
      $cordovaNativeAudio.play('select');
    }

    // this.deselect = function(){
    // }

    // this.score = function(){
    // }
  })