angular.module('starter.controllers')
  .controller('PlayCtrl', function($scope, $state, $timeout, $cordovaSocialSharing,
    Alert, Application, Audio, Comparator, Modal, Time, DeckFactory, ScoresFactory) {

    var admobid = {
      interstitial: 'ca-app-pub-3310378446527576/2274303314',
    };

    var mainDeck = [];
    var currentTime = null;

    $scope.selectedCards = [];
    $scope.tableDeck = [];
    $scope.points = 0;
    $scope.isDisabled = false;

    $scope.init = function() {
      mainDeck = DeckFactory.setDeck();
      setTableDeck();
      Audio.play('start-game')
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
        selectCard(card);

        Audio.play('card-selection-' + $scope.selectedCards.length);
      } else {
        deselectCard(card);
      }
    }

    $scope.unlockGame = function() {
      var tableCard, deckCard;
      var flatDeck = Application.flattenArray($scope.tableDeck);

      while(!Comparator.anyMatch(flatDeck)){
        tableCard = $scope.tableDeck[0][0];
        deckCard = getCard();
        $scope.tableDeck[0][0] = deckCard;
        removeFromDeck(deckCard);
        mainDeck.push(tableCard);
        flatDeck = Application.flattenArray($scope.tableDeck);
      }

      Modal.close();
    };

    $scope.leaveGame = function() {
      Alert.leaveGame();
      Audio.play('leave-game-x');
    };

    $scope.changeState = function(state) {
      Modal.close();

      var reload = $state.current.name == state ? true : false;

      if (!reload) {
        Audio.play('quit-game-ok');
        if(AdMob) AdMob.showInterstitial();
      }

      $state.go(state, {}, {reload: reload});
    };

    $scope.getNumber = function(num) {
      return new Array(num);
    };

    $scope.$watchCollection('selectedCards', function() {
      if ($scope.selectedCards.length >= 3) {
        $scope.isDisabled = true;

        $timeout(function(){
          var deckSize = Application.cleanArray(mainDeck).length;

          if (Comparator.isMatch($scope.selectedCards)) {
            $scope.points += ScoresFactory.score(currentTime);
            deckSize >= 3 ? replaceCards() : removeFromTable();
            Audio.play('right-set');
          } else {
            Audio.play('wrong-set');
          }
          deselectCards();
          $scope.isDisabled = false;

        }, 250)
      }
    });

    $scope.$on('timer-tick', function (event, args) {
      currentTime = args.millis;
    });

    getCard = function() {
      var index = Application.randomIndex(mainDeck);
      return card = mainDeck[index] || getCard();
    };

    removeFromDeck = function(card) {
      var index = mainDeck.indexOf(card);
      mainDeck[index] = null;
    };

    visibleDeck = function(array) {
      return array.filter(function(n){ return n.visible });
    }

    removeFromTable = function() {
      $scope.selectedCards.forEach(function(card) {
        card.visible = false;
      });

      var flatDeck = Application.flattenArray($scope.tableDeck);
      var visibleCards = visibleDeck(flatDeck);

      if (!Comparator.anyMatch(visibleCards)) {
        $timeout(function(){
          $scope.tableDeck = []

          Audio.play('win');

          Modal.open($scope, 'end-game');

          finalScore();
        }, 1500)
      }
    };

    finalScore = function(){
      var storedRecord = window.localStorage['record'] || 0;
      var storedTime = window.localStorage['time'] || "99:99";

      if ($scope.points > storedRecord) {
        window.localStorage['record'] = $scope.points;
        window.localStorage['time'] = Time.millisToMinutesAndSeconds(currentTime);
      }
      if ($scope.points >= storedRecord &&
        currentTime < Time.minutesAndSecondsToMillis(storedTime)) {
        window.localStorage['time'] = Time.millisToMinutesAndSeconds(currentTime);
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

      Audio.play('deselect');
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
      var flatDeck = Application.flattenArray($scope.tableDeck);

      if (!Comparator.anyMatch(flatDeck)) {
        Modal.open($scope, 'unlock-game');
      }
    }

    replaceCards = function () {
      $scope.selectedCards.forEach(function(selectedCard) {
        var index = Application.matrixIndex($scope.tableDeck, selectedCard);
        var newCard = getCard();
        $scope.tableDeck[index.row][index.col] = newCard;
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

  })
  .directive('cards', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/cards.html'
    }
  })
