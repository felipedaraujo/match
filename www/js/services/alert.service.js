angular.module('starter.services')
  .service('AlertService', function($window) {

    doesNotMatchAlert = function() {
      swal({
        title:"That is not a set.",
        confirmButtonText:"Try again",
        type: "warning"
      });
    }

    endGameAlert = function() {
      swal({
        title: "You won!",
        type: "success",
        showCancelButton: true,
        confirmButtonText:"Play again",
        cancelButtonText:"Quit"
      }, function(isConfirm) {
        if (isConfirm) {
          $window.location.reload();
        } else {
          $window.location.href = '#/home';
        }
      });
    }

    noMatchAvailableAlert = function(){
      swal({
        title: "No match available.",
        type: "warning"
      });
    }

    leaveGameAlert = function(){
      swal({
        title: "Quit game?",
        type: "warning",
        showCancelButton: true
      }, function() {
        $window.location.href = '#/home';
      });
    }
  })