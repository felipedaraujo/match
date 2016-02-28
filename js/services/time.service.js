angular.module('starter.services')
  .service('Time', function() {

    this.millisToMinutesAndSeconds = function(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    this.minutesAndSecondsToMillis = function(minAndSec) {
      var time = minAndSec.split(":");
      var minutes = time[0];
      var seconds = time[1];
      return parseInt(minutes) * 60000 + parseInt(seconds) * 1000;
    }

  })