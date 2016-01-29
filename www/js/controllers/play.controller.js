angular.module('starter.controllers')
  .controller('PlayCtrl', function($scope, $window, $timeout, Alert, Comparator,
    DeckFactory) {

    var deck = [];
    $scope.selectedCards = [];
    $scope.table = [];
    $scope.canReplace = false;

    $scope.init = function() {
      setDeck();
      giveCards();
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

    $scope.replaceCard = function() {
      var tableCard = $scope.table[0];
      var deckCard = getCard();

      $scope.table[0] = deckCard;
      removeFromDeck(deckCard);
      deck.push(tableCard)

      if (!Comparator.anyMatch($scope.table)) Alert.noMatchAvailable();
      $scope.canReplace = !Comparator.anyMatch($scope.table);
    };

    $scope.leaveGame = function() {
      Alert.leaveGame();
    };

    $scope.$watchCollection('selectedCards', function() {
      if ($scope.selectedCards.length >= 3) {
        $timeout(function(){
          if (Comparator.isMatch($scope.selectedCards)) {
            deckSize() >= 3 ? replaceCards() : removeFromTable();
          }
          deselectCards();
        }, 100)
      }
    });

    setDeck = function (){
      if (window.localStorage['level'] == "Hard") {
        deck = DeckFactory.hardLevel();
      } else {
        deck = DeckFactory.easyLevel();
      }
    };

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
        var index = $scope.table.indexOf(card);
        $scope.table.splice(index, 1);
      });

      if ($scope.table.length <= 0) Alert.endGame();
    };

    selectedCard = function(card) {
      $scope.selectedCards.push(card);
      card.shadow = 'selected';
    };

    deselectCard = function(card) {
      card.shadow = 'default';

      var index = $scope.selectedCards.indexOf(card);
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

    replaceCards = function () {
      $scope.selectedCards.forEach(function(card) {
        var index = $scope.table.indexOf(card);
        var newCard = getCard();
        $scope.table[index] = newCard;
        removeFromDeck(newCard);
      })

      if (!Comparator.anyMatch($scope.table)) Alert.noMatchAvailable();
      $scope.canReplace = !Comparator.anyMatch($scope.table);
    };

    giveCards = function() {
      if (deckSize() > 0) {
        while ($scope.table.length < 12) {
          var card = getCard();
          $scope.table.push(card);
          removeFromDeck(card);
        }
      }

      if (!Comparator.anyMatch($scope.table)) Alert.noMatchAvailable();
      $scope.canReplace = !Comparator.anyMatch($scope.table);
    };

  })
  .directive('cards', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/cards.html'
    }
  })
