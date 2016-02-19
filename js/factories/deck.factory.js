angular.module('starter.factories')
  .factory('DeckFactory', function() {
    var colors = ['assertive', 'energized', 'balanced'];
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
      var id = -1, deck = [];
      colors.forEach(function(color) {
        shapes.forEach(function(shape) {
          fills.forEach(function(fill) {
            id += 1;
            var card = {id: id, color: color, shape: shape,
              repeat: 1, fill: fill, shadow: 'default', visible: true};
            deck.push(card);
          })
        })
      })
      return deck;
    }

    hardLevel = function(){
      var id = -1, deck = [];
      colors.forEach(function(color) {
        shapes.forEach(function(shape) {
          fills.forEach(function(fill) {
            repeats.forEach(function(repeat) {
              id += 1;
              var card = { id: id, color: color, shape: shape,
                repeat: repeat, fill: fill, shadow: 'default', visible: true};
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
