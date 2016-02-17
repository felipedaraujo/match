angular.module('starter.services')
  .service('Audio', function(MediaSrv) {
    var select = deselect = score = end = leave = null;

    MediaSrv.loadMedia('audio/select-pop.mp3').then(function(media){
      select = media;
    });

    MediaSrv.loadMedia('audio/deselect-pop.mp3').then(function(media){
      deselect = media;
    });

    MediaSrv.loadMedia('audio/score-pop.mp3').then(function(media){
      score = media;
    });

    MediaSrv.loadMedia('audio/end-blip.mp3').then(function(media){
      end = media;
    });

    MediaSrv.loadMedia('audio/leave-floomp.mp3').then(function(media){
      leave = media;
    });

    this.select = function(){
      select.play();
    };

    this.deselect = function(){
      deselect.play();
    };

    this.score = function(){
      score.play();
    };

    this.end = function(){
      end.play();
    };

    this.leave = function(){
      leave.play();
    };


  })