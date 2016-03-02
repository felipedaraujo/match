// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {

      var admobid = {
        interstitial: 'ca-app-pub-3310378446527576/2274303314',
      };

      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }

      if(window.StatusBar) {
        StatusBar.styleDefault();
      }

      if(window.AdMob) {
        AdMob.prepareInterstitial({adId:admobid.interstitial, autoShow:false});
      }
    });
  })
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.
      state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
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
        templateUrl: 'templates/how-to-play.html',
        controller: 'HowToPlayCtrl'
      }).
      state('how-to-play.page', {
        url: '/:page',
        templateUrl: function($stateParams) {
          return 'templates/how-to-play/' + $stateParams.page + '.html';
        },
        controller: 'HowToPlayPageCtrl'
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
