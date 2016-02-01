angular.module('starter.factories')
  .factory('DeckFactory', function() {
    var colors = ['pink', 'yellow', 'green'];
    var shapes = ['circle', 'square', 'triangle'];
    var fills = ['solid', 'borded', 'striped'];
    var repeats = [1, 2, 3];

    setDeck = function (){
      if (window.localStorage['level'] == "Hard") {
        return hardLevel();
      } else {
        return easyLevel();
      }
    };

    easyLevel = function() {
      var counter = -1, deck = [];
      colors.forEach(function(color) {
        shapes.forEach(function(shape) {
          fills.forEach(function(fill) {
            counter += 1;
            var card = {id: counter, color: color, shape: shape,
              repeat: 1, fill: fill, shadow: 'default'};
            deck.push(card);
          })
        })
      })
      return deck;
    }

    hardLevel = function(){
      var counter = -1, deck = [];
      colors.forEach(function(color) {
        shapes.forEach(function(shape) {
          fills.forEach(function(fill) {
            repeats.forEach(function(repeat) {
              counter += 1;
              var card = { id: counter, color: color, shape: shape,
                repeat: repeat, fill: fill, shadow: 'default' };
              deck.push(card);
            })
          })
        })
      })
      return deck;
    }

    return {
      setDeck: setDeck
    }
  })
