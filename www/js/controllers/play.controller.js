angular.module('starter.controllers')
  .controller('PlayCtrl', function($scope, $window, AlertService, DeckFactory) {
    $scope.deck = [];
    $scope.table = [];
    $scope.selectedCards = [];
    $scope.totalSets = 0
    $scope.switchEnabled = false;

    setDeck = function (){
      if (window.localStorage['level'] == "Hard") {
        $scope.deck = DeckFactory.hardLevel();
      } else {
        $scope.deck = DeckFactory.easyLevel();
      }
    }

    randomNumber = function() {
      return Math.floor(Math.random() * $scope.deck.length);
    };

    getCard = function() {
      random = randomNumber();
      return card = $scope.deck[random] || getCard();
    };

    removeFromDeck = function(card){
      var index = $scope.deck.indexOf(card);
      $scope.deck[index] = null;
    };

    removeFromTable = function(){
      $scope.selectedCards.forEach(function(card) {
        var index = $scope.table.indexOf(card);
        $scope.table.splice(index, 1);
      });

      if ($scope.table.length <= 0) AlertService.endGame();
    };

    deselectAllCards = function(){
      $scope.selectedCards.forEach(function(card) {
        card.shadow = 'default';
      });

      $scope.selectedCards = [];
    };

    deselectCard = function(card) {
      card.shadow = 'default';

      var index = $scope.selectedCards.indexOf(card);
      $scope.selectedCards.splice(index, 1);
    };

    replaceSelectedCards = function () {
      $scope.selectedCards.forEach(function(card) {
        var index = $scope.table.indexOf(card);
        var newCard = getCard();
        $scope.table[index] = newCard;
        removeFromDeck(newCard);
      })

      if (!anyMatch()) AlertService.noMatchAvailable();
      $scope.switchEnabled = !anyMatch();
    };

    giveCards = function() {
      if ($scope.deckSize() > 0) {
        while ($scope.table.length < 12) {
          var card = getCard();
          $scope.table.push(card);
          removeFromDeck(card);
        }
      }

      if (!anyMatch()) AlertService.noMatchAvailable();
      $scope.switchEnabled = !anyMatch();
    };

    anyMatch = function() {
      for(i = 0; i < $scope.table.length - 2; i++) {
        for(j = i + 1; j < $scope.table.length - 1; j++) {
          for(k = j + 1; k < $scope.table.length; k++) {
            $scope.selectedCards.push($scope.table[i], $scope.table[j], $scope.table[k]);

            if (isMatch()) {
              deselectAllCards();
              return  true;
            }

            deselectAllCards();
          }
        }
      }
      return false;
    };

    isMatch = function() {
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

      for (var i = 0; i < $scope.selectedCards.length; i++) {
        args.push($scope.selectedCards[i][attr]);
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

    $scope.init = function() {
      setDeck();
      giveCards();
    }

    $scope.getNumber = function(num) {
      return new Array(num);
    }

    $scope.setIcon = function(card){
      return "img/" + card.shape + "-" + card.fill + ".svg";
    }

    $scope.selectCard = function(card){
      var index = $scope.selectedCards.indexOf(card);

      if ($scope.selectedCards.length < 3 && index === -1) {
        $scope.selectedCards.push(card);

        card.shadow = 'selected';

        if ($scope.selectedCards.length >= 3) {

          if (isMath()) {
            $scope.totalSets++

            if ($scope.deckSize() > 0) {
              replaceSelectedCards();
            } else {
              removeFromTable($scope.selectedCards);
            }

          } else {
            AlertService.doesNotMatch();
          }

          deselectAllCards(card);
        }

      } else {
        deselectCard(card);
      }

    }

    $scope.deckSize = function() {
      return $scope.deck.filter(function(value) { return value !== null }).length;
    }

    $scope.switchCard = function() {
      var tableCard = $scope.table[0];
      var deckCard = getCard();

      $scope.table[0] = deckCard;
      removeFromDeck(deckCard);
      $scope.deck.push(tableCard)

      if (!anyMatch()) AlertService.noMatchAvailable();
      $scope.switchEnabled = !anyMatch();
    }

    $scope.leaveGame = function() {
      AlertService.leaveGame();
    }
  })
  .directive('cards', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/cards.html'
    }
  })
