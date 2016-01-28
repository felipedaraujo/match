angular.module('starter.services')
  .service('Comparator', function() {

    var selectedCards = [];

    this.anyMatch = function(table) {
      for(i = 0; i < table.length - 2; i++) {
        for(j = i + 1; j < table.length - 1; j++) {
          for(k = j + 1; k < table.length; k++) {
            var cards = [table[i], table[j], table[k]];
            if (this.isMatch(cards)) return  true;
          }
        }
      }
      return false;
    };

    this.isMatch = function(cards) {
      selectedCards = cards;

      if ((areEqual(buildArgs('color')) &&
           areEqual(buildArgs('shape')) &&
           areEqual(buildArgs('fill')) &&
           areDifferent(buildArgs('repeat'))) ||

          (areEqual(buildArgs('color')) &&
           areEqual(buildArgs('shape')) &&
           areDifferent(buildArgs('fill')) &&
           areEqual(buildArgs('repeat'))) ||

          (areEqual(buildArgs('color')) &&
           areDifferent(buildArgs('shape')) &&
           areEqual(buildArgs('fill')) &&
           areEqual(buildArgs('repeat'))) ||

          (areDifferent(buildArgs('color')) &&
           areEqual(buildArgs('shape')) &&
           areEqual(buildArgs('fill')) &&
           areEqual(buildArgs('repeat'))) ||

          (areDifferent(buildArgs('color')) &&
           areDifferent(buildArgs('shape')) &&
           areDifferent(buildArgs('fill')) &&
           areEqual(buildArgs('repeat'))) ||

          (areDifferent(buildArgs('color')) &&
           areDifferent(buildArgs('shape')) &&
           areEqual(buildArgs('fill')) &&
           areDifferent(buildArgs('repeat'))) ||

          (areDifferent(buildArgs('color')) &&
           areEqual(buildArgs('shape')) &&
           areDifferent(buildArgs('fill')) &&
           areDifferent(buildArgs('repeat'))) ||

          (areEqual(buildArgs('color')) &&
           areDifferent(buildArgs('shape')) &&
           areDifferent(buildArgs('fill')) &&
           areDifferent(buildArgs('repeat'))) ||

          (areEqual(buildArgs('color')) &&
           areEqual(buildArgs('shape')) &&
           areDifferent(buildArgs('fill')) &&
           areDifferent(buildArgs('repeat'))) ||

          (areEqual(buildArgs('color')) &&
           areDifferent(buildArgs('shape')) &&
           areDifferent(buildArgs('fill')) &&
           areEqual(buildArgs('repeat'))) ||

          (areDifferent(buildArgs('color')) &&
           areDifferent(buildArgs('shape')) &&
           areEqual(buildArgs('fill')) &&
           areEqual(buildArgs('repeat'))) ||

          (areEqual(buildArgs('color')) &&
           areDifferent(buildArgs('shape')) &&
           areEqual(buildArgs('fill')) &&
           areDifferent(buildArgs('repeat'))) ||

          (areDifferent(buildArgs('color')) &&
           areEqual(buildArgs('shape')) &&
           areDifferent(buildArgs('fill')) &&
           areEqual(buildArgs('repeat'))) ||

          (areDifferent(buildArgs('color')) &&
           areDifferent(buildArgs('shape')) &&
           areDifferent(buildArgs('fill')) &&
           areDifferent(buildArgs('repeat')))){

        return true;
      } else {
        return false;
      }
    }

    buildArgs = function(attr){
      var args = [];

      for (var i = 0; i < selectedCards.length; i++) {
        args.push(selectedCards[i][attr]);
      }

      return args;
    }

    areEqual = function(args){
      for (var i = 1; i < args.length; i++) {
        if (args[0] != args[i]) return false;
      }
      return true;
    }

    areDifferent = function(args){
      for (var i = 1; i < args.length; i++) {
        if (args[0] === args[i]) return false;
      }
      for (var i = args.length - 2; i > -1; i--) {
        if (args[args.length - 1] === args[i]) return false;
      }
      return true;
    }
  })
