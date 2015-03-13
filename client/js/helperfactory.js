angular.module('minesweeper.helperfactory', [])

.factory('HelperFactory', function() {

  // helper function that gets content of the square
  var getSquare = function(table, row, col) {
    return table.rows[row].cols[col];
  };

  // helper function that checks for win condition
  var checkWin = function(params) {
    // if number of uncovered squares is equal to size^2 - # of mines, player wins
    if (params.uncovered === Math.pow(params.size, 2) - params.num) {
      return true;
    }
    return false;
  };

  // helper function that resets the parameter of the game
  var resetParams = function(params) {
    params.firstClick = true;
    params.uncovered = 0;
  };

  return {
    getSquare: getSquare,
    checkWin: checkWin,
    resetParams: resetParams
  };
});
