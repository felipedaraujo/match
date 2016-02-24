// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.
      state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
      }).
      state('play', {
        cache: false,
        url: '/play',
        templateUrl: 'templates/play.html',
        controller: 'PlayCtrl'
      }).
      state('scores', {
        cache: false,
        url: '/scores',
        templateUrl: 'templates/scores.html',
        controller: 'ScoresCtrl'
      }).
      state('how-to-play', {
        url: '/how-to-play',
        templateUrl: 'templates/how-to-play.html'
      }).
      state('how-to-play.page', {
        url: '/:page',
        templateUrl: function($stateParams) {
          return 'templates/how-to-play/' + $stateParams.page + '.html';
        }
      }).
      state('settings', {
        url: '/settings',
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl'
      })

    $urlRouterProvider.otherwise('/home');
  })

angular.module('starter.factories', [])

angular.module('starter.services', ['starter.factories'])

angular.module(
  'starter.controllers',
  [
    'starter.services',
    'starter.factories',
    'timer'
  ]
)
