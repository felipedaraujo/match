angular.module('starter.services')
  .service('Application', function() {

    this.cleanArray = function(array){
      return array.filter(function(n){ return n != undefined });
    };

    this.matrixIndex = function(matrix, element) {
      for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
          if (angular.equals(element, matrix[i][j])) {
            return { row: i, col: j };
          }
        }
      }
    };

    this.flattenArray = function(matrix){
      return matrix.reduce(function(a, b) {
        return a.concat(b);
      });
    };

    this.randomIndex = function(array) {
      return Math.floor(Math.random() * array.length);
    };
  });