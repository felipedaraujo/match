angular.module('starter.services')
  .service('Modal', function($ionicModal) {

    var modal = null;

    this.open = function(scope, screen) {
      $ionicModal.fromTemplateUrl('templates/' + screen + '.html', {
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
