angular.module('minesweeper.helperfactory', [])

.factory('HelperFactory', function() {

  var getSquare = function(table, x, y) {
    return table.rows[x].cols[y];
  };

  return {
    getSquare: getSquare
  };
});
