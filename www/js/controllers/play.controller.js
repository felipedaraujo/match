angular.module('starter.controllers')
  .controller('PlayCtrl', function($scope, $state, $timeout, $cordovaSocialSharing,
    Alert, Comparator, Modal, DeckFactory, ScoresFactory) {

    var mainDeck = [];
    var currentTime = null;

    $scope.selectedCards = [];
    $scope.tableDeck = [];
    $scope.points = 0;
    $scope.isDisabled = false;

    $scope.init = function() {
      mainDeck = DeckFactory.setDeck();
      setTableDeck();
    };

    angular.element(document).ready(function () {
      $scope.cardWidth = getCardWidth();
      $scope.iconSize = getIconSize();
    });

    $scope.setIcon = function(card){
      return "img/" + card.shape + "-" + card.fill + ".svg#" + card.shape + "-" + card.fill;
    };

    $scope.toggleCard = function(card){
      if ($scope.selectedCards.length < 3 && wasSelected(card)) {
        selectCard(card)
      } else {
        deselectCard(card);
      }
    }

    $scope.unlockGame = function() {
      var tableCard, deckCard;
      var flatDeck = flattenArray($scope.tableDeck);

      while(!Comparator.anyMatch(flatDeck)){
        tableCard = $scope.tableDeck[0][0];
        deckCard = getCard();
        $scope.tableDeck[0][0] = deckCard;
        removeFromDeck(deckCard);
        mainDeck.push(tableCard);
        flatDeck = flattenArray($scope.tableDeck);
      }

      Modal.close();
    };

    $scope.leaveGame = function() {
      Alert.leaveGame();
    };

    $scope.changeState = function(state) {
      Modal.close();

      var reload = $state.current.name == state ? true : false;
      $state.go(state, {}, {reload: reload});
    };

    $scope.getNumber = function(num) {
      return new Array(num);
    };

    $scope.$watchCollection('selectedCards', function() {
      if ($scope.selectedCards.length >= 3) {
        $scope.isDisabled = true;

        $timeout(function(){
          if (Comparator.isMatch($scope.selectedCards)) {
            $scope.points += ScoresFactory.score(currentTime);
            deckSize() >= 3 ? replaceCards() : removeFromTable();
          }
          deselectCards();
          $scope.isDisabled = false;

        }, 250)
      }
    });

    $scope.$on('timer-tick', function (event, args) {
      currentTime = args.millis;
    });

    millisToMinutesAndSeconds = function(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    minutesAndSecondsToMillis = function(minAndSec) {
      var time = minAndSec.split(":");
      var minutes = time[0];
      var seconds = time[1];
      return parseInt(minutes) * 60000 + parseInt(seconds) * 1000;
    }

    deckSize = function() {
      return mainDeck.filter(function(value) { return value !== null }).length;
    };

    randomNumber = function() {
      return Math.floor(Math.random() * mainDeck.length);
    };

    getCard = function() {
      random = randomNumber();
      card = mainDeck[random] || getCard();
      return card;
    };

    removeFromDeck = function(card) {
      var index = mainDeck.indexOf(card);
      mainDeck[index] = null;
    };

    visibleDeck = function(deck) {
      deck.forEach(function(card) {
        if (!card.visible) deck.splice(card, 1);
      });

      return deck;
    }

    removeFromTable = function() {
      $scope.selectedCards.forEach(function(card) {
        card.visible = false;
      });

      var flatDeck = flattenArray($scope.tableDeck);
      var visibleCards = visibleDeck(flatDeck);

      if ($scope.tableDeck.length <= 0 || !Comparator.anyMatch(visibleCards)) {
        $timeout(function(){
          Modal.open($scope, 'end-game');
          finalScore();
        }, 1500)
      }
    };

    cardIndeces = function(matrix, item) {
      for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
          if (angular.equals(item, matrix[i][j])) {
            return { row: i, col: j };
          }
        }
      }
    };

    finalScore = function(){
      var storedRecord = window.localStorage['record'] || 0;
      var storedTime = window.localStorage['time'] || "99:99";

      if ($scope.points > storedRecord) {
        window.localStorage['record'] = $scope.points;
        window.localStorage['time'] = millisToMinutesAndSeconds(currentTime);
      }
      if ($scope.points >= storedRecord &&
        currentTime < minutesAndSecondsToMillis(storedTime)) {
        window.localStorage['time'] = millisToMinutesAndSeconds(currentTime);
      }
    };

    selectCard = function(card) {
      card.shadow = 'selected';
      $scope.selectedCards.push(card);
    };

    deselectCard = function(card) {
      var index = $scope.selectedCards.indexOf(card);

      card.shadow = 'default';
      $scope.selectedCards.splice(index, 1);
    };

    deselectCards = function(){
      $scope.selectedCards.forEach(function(card) {
        card.shadow = 'default';
      });
      $scope.selectedCards = [];
    };

    wasSelected = function(card){
      if($scope.selectedCards.indexOf(card) === -1) {
        return true;
      } else {
        return false;
      }
    };

    checkMatches = function(){
      var flatDeck = flattenArray($scope.tableDeck);

      if (!Comparator.anyMatch(flatDeck)) {
        Modal.open($scope, 'unlock-game');
      }
    }

    replaceCards = function () {
      $scope.selectedCards.forEach(function(selectedCard) {
        var indeces = cardIndeces($scope.tableDeck, selectedCard);
        var newCard = getCard();
        $scope.tableDeck[indeces['row']][indeces.col] = newCard;
        removeFromDeck(newCard);
      });

      checkMatches();
    };

    setTableDeck = function() {
      var row, card;
      var card;
      var maxRows = window.localStorage['level'] == 'Hard' ? 4 : 3;

      while($scope.tableDeck.length < maxRows) {
        $scope.tableDeck.push([]);
        row = $scope.tableDeck.length - 1;

        while($scope.tableDeck[row].length < 3) {
          card = getCard();
          $scope.tableDeck[row].push(card);
          removeFromDeck(card);
        }
      }

      checkMatches();
    };

    getCardWidth = function() {
      var result = document.getElementsByClassName("tres-card");
      return result[0] ? result[0].offsetHeight * 0.7 + 'px' : '75px';
    };

    getIconSize = function() {
      var screenHeight = window.screen.height;

      if (screenHeight < 560) {
        return 20;
      } else if (screenHeight >= 560 && screenHeight < 700) {
        return 25;
      } else if (screenHeight >= 700 && screenHeight < 840){
        return 30;
      } else {
        return 40;
      }
    };

    flattenArray = function(matrix){
      return Array.prototype.concat.apply([], matrix);
    };

  })
  .directive('cards', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/cards.html'
    }
  })
