angular.module('starter.services')
  .service('Modal', function($ionicModal) {

    var templateUrl = 'templates/modal.html';
    var modal = null;

    this.open = function(scope) {
      $ionicModal.fromTemplateUrl(templateUrl, {
        scope: scope
      }).then(function(newModal) {
        modal = newModal;
        newModal.show();
      });
    };

    this.close = function() {
      modal.remove();
    };
  })
