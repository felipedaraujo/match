angular.module('starter.controllers')
  .controller('PlayCtrl', function($scope, $window, $timeout, Alert, Audio, Comparator,
    DeckFactory, ScoresFactory) {

    var deck = [];
    var currentTime = null;
    $scope.selectedCards = [];
    $scope.tableDeck = [];
    $scope.locked = false;
    $scope.points = 0;

    $scope.init = function() {
      deck = DeckFactory.setDeck();
      setTableDeck();
    };

    $scope.getNumber = function(num) {
      return new Array(num);
    };

    $scope.setIcon = function(card){
      return "img/" + card.shape + "-" + card.fill + ".svg";
    };

    $scope.toggleCard = function(card){
      if ($scope.selectedCards.length < 3 && wasSelected(card)) {
        selectedCard(card)
      } else {
        deselectCard(card);
      }
    }

    $scope.unlockGame = function() {
      var tableCard = $scope.tableDeck[0];
      var deckCard = getCard();

      $scope.tableDeck[0] = deckCard;
      removeFromDeck(deckCard);
      deck.push(tableCard)

      checkMatches();
    };

    $scope.leaveGame = function() {
      Alert.leaveGame();
    };

    $scope.$watchCollection('selectedCards', function() {
      if ($scope.selectedCards.length >= 3) {
        $timeout(function(){
          if (Comparator.isMatch($scope.selectedCards)) {
            deckSize() >= 3 ? replaceCards() : removeFromTable();
            $scope.points += ScoresFactory.score(currentTime);
          }
          deselectCards();
        }, 300)
      }
    });

    $scope.$on('timer-tick', function (event, args) {
      currentTime = args.millis;
    });

    deckSize = function() {
      return deck.filter(function(value) { return value !== null }).length;
    };

    randomNumber = function() {
      return Math.floor(Math.random() * deck.length);
    };

    getCard = function() {
      random = randomNumber();
      return card = deck[random] || getCard();
    };

    removeFromDeck = function(card){
      var index = deck.indexOf(card);
      deck[index] = null;
    };

    removeFromTable = function(){
      $scope.selectedCards.forEach(function(card) {
        var index = $scope.tableDeck.indexOf(card);
        $scope.tableDeck.splice(index, 1);
      });

      if ($scope.tableDeck.length <= 0) Alert.youWin();
    };

    selectedCard = function(card) {
      card.shadow = 'selected';

      $scope.selectedCards.push(card);

      Audio.select();
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
      if (!Comparator.anyMatch($scope.tableDeck)) Alert.noMatchAvailable();
      $scope.locked = !Comparator.anyMatch($scope.tableDeck);
    }

    replaceCards = function () {
      $scope.selectedCards.forEach(function(card) {
        var index = $scope.tableDeck.indexOf(card);
        var newCard = getCard();
        $scope.tableDeck[index] = newCard;
        removeFromDeck(newCard);
      })
      checkMatches();
    };

    setTableDeck = function() {
      var maxCards = window.localStorage['level'] == 'Hard' ? 12 : 9;

      while ($scope.tableDeck.length < maxCards) {
        var card = getCard();
        $scope.tableDeck.push(card);
        removeFromDeck(card);
      }

      checkMatches();
    };

  })
  .directive('cards', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/cards.html'
    }
  })
