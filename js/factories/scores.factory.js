angular.module('starter.factories')
  .factory('ScoresFactory', function() {
    var lastTime = 0;

    deltaTime = function(currentTime){
      delta = currentTime - lastTime;
      lastTime = currentTime;
      return delta;
    }

    score = function(currentTime) {
      delta = deltaTime(currentTime)

      if (delta <= 3000) {
        return 100;
      } else if (3000 < delta && delta <= 7000) {
        return 89;
      } else if (7000 < delta && delta <= 12000) {
        return 77;
      } else if (12000 < delta && delta <= 18000) {
        return 64;
      } else {
        return 50;
      }
    }

    return {
      score: score
    }
  })
