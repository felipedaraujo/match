angular.module('starter.services')
  .service('Alert', function($window) {

    this.noMatchAvailable = function(){
      swal({
        title: "No match available.",
        type: "warning"
      });
    }

    this.leaveGame = function(){
      swal({
        title: "Quit game?",
        type: "warning",
        showCancelButton: true
      }, function() {
        $window.location.href = '#/home';
      });
    }
  })