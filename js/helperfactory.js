angular.module('minesweeper.helperfactory', [])

.factory('HelperFactory', function() {

  // helper function that gets content of the square
  var getSquare = function(table, row, col) {
    return table.rows[row].cols[col];
  };

  // helper function that handles when a player steps on a mine
  var endGame = function() {
    alert('you lose!');
  };

  // helper function that checks for win condition
  var checkWin = function(params) {
    // if number of uncovered squares is equal to size^2 - # of mines, player wins
    if (params.uncovered === Math.pow(params.size, 2) - params.num) {
      alert('You Win!');
    }
  };

  // helper function that resets the parameter of the game
  var resetParams = function(params) {
    params.firstClick = true;
    params.uncovered = 0;
  };

  return {
    getSquare: getSquare,
    endGame: endGame,
    checkWin: checkWin,
    resetParams: resetParams
  };
});
