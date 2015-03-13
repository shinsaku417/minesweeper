angular.module('minesweeper.helperfactory', [])

.factory('HelperFactory', function() {

  var getSquare = function(table, row, col) {
    return table.rows[row].cols[col];
  };

  return {
    getSquare: getSquare
  };
});
