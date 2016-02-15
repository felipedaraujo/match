angular.module('starter.controllers')
  .controller('PlayCtrl', function($scope, $state, $timeout, $cordovaSocialSharing,
    Alert, Audio, Comparator, Modal, DeckFactory, ScoresFactory) {

    var deck = [];
    var currentTime = null;
    var sound = window.localStorage['sound'] == 'On' ? true : false

    $scope.selectedCards = [];
    $scope.tableDeck = [];
    $scope.points = 0;
    $scope.isDisabled = false;

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
      var tableCard, deckCard;

      while(!Comparator.anyMatch($scope.tableDeck)){
        tableCard = $scope.tableDeck[0];
        deckCard = getCard();

        $scope.tableDeck[0] = deckCard;
        removeFromDeck(deckCard);
        deck.push(tableCard);
      }

      Modal.close();
    };

    $scope.leaveGame = function() {
      Alert.leaveGame();
      if (sound) { Audio.leave(); }
    };

    $scope.changeState = function(state) {
      Modal.close();

      var reload = $state.current.name == state ? true : false;
      $state.go(state, {}, {reload: reload});
    }

    $scope.getNumber = function(num) {
      return new Array(num);
    }

    $scope.shareAnywhere = function() {
      $cordovaSocialSharing.share("This is your message", "This is your subject", "www/img/tres.png", "http://www.felipedearaujo.com/tres");
    }

    $scope.$watchCollection('selectedCards', function() {
      if ($scope.selectedCards.length >= 3) {
        $scope.isDisabled = true;

        $timeout(function(){
          if (Comparator.isMatch($scope.selectedCards)) {
            $scope.points += ScoresFactory.score(currentTime);
            deckSize() >= 3 ? replaceCards() : removeFromTable();
            if (sound) { Audio.score(); }
          } else {
            if (sound) { Audio.deselect(); }
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

      if ($scope.tableDeck.length <= 0 || !Comparator.anyMatch($scope.tableDeck)) {
        $timeout(function(){
          Modal.open($scope, 'end-game');
          finalScore();
          if (sound) { Audio.end(); }
        }, 1500)
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

    selectedCard = function(card) {
      card.shadow = 'selected';
      $scope.selectedCards.push(card);

      if (sound) { Audio.select(); }
    };

    deselectCard = function(card) {
      var index = $scope.selectedCards.indexOf(card);

      card.shadow = 'default';
      $scope.selectedCards.splice(index, 1);

      if (sound) { Audio.deselect(); }
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
      if (!Comparator.anyMatch($scope.tableDeck)) {
        Modal.open($scope, 'unlock-game');
      }
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
