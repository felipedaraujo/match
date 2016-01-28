angular.module('starter.controllers')
  .controller('PlayCtrl', function($scope, $window, Alert, Comparator,
    DeckFactory) {

    $scope.deck = [];
    $scope.table = [];
    $scope.selectedCards = [];
    $scope.totalSets = 0
    $scope.switchEnabled = false;

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

    $scope.selectCard = function(card){
      var index = $scope.selectedCards.indexOf(card);

      if ($scope.selectedCards.length < 3 && index === -1) {
        $scope.selectedCards.push(card);

        card.shadow = 'selected';

        if ($scope.selectedCards.length >= 3) {

          if (Comparator.isMatch($scope.selectedCards)) {
            $scope.totalSets++

            if ($scope.deckSize() > 0) {
              replaceSelectedCards();
            } else {
              removeFromTable($scope.selectedCards);
            }

          } else {
            Alert.doesNotMatch();
          }

          deselectAllCards(card);
        }

      } else {
        deselectCard(card);
      }
    }

    $scope.deckSize = function() {
      return $scope.deck.filter(function(value) { return value !== null }).length;
    };

    $scope.switchCard = function() {
      var tableCard = $scope.table[0];
      var deckCard = getCard();

      $scope.table[0] = deckCard;
      removeFromDeck(deckCard);
      $scope.deck.push(tableCard)

      if (!Comparator.anyMatch($scope.table)) Alert.noMatchAvailable();
      $scope.switchEnabled = !Comparator.anyMatch($scope.table);
    };

    $scope.leaveGame = function() {
      Alert.leaveGame();
    };

    setDeck = function (){
      if (window.localStorage['level'] == "Hard") {
        $scope.deck = DeckFactory.hardLevel();
      } else {
        $scope.deck = DeckFactory.easyLevel();
      }
    };

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

      if ($scope.table.length <= 0) Alert.endGame();
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

      if (!Comparator.anyMatch($scope.table)) Alert.noMatchAvailable();
      $scope.switchEnabled = !Comparator.anyMatch($scope.table);
    };

    giveCards = function() {
      if ($scope.deckSize() > 0) {
        while ($scope.table.length < 12) {
          var card = getCard();
          $scope.table.push(card);
          removeFromDeck(card);
        }
      }

      if (!Comparator.anyMatch($scope.table)) Alert.noMatchAvailable();
      $scope.switchEnabled = !Comparator.anyMatch($scope.table);
    };

  })
  .directive('cards', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/cards.html'
    }
  })
