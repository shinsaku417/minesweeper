angular.module('logic.checker', [])

.factory('Checker', function() {

  return {
    checkWin: checkWin
  };

  // helper function that checks for win condition
  function checkWin(params) {
    // if number of uncovered squares is equal to size^2 - # of mines, player wins
    if (params.revealed === Math.pow(params.size, 2) - params.num) {
      params.finished = true;
      params.endMessage = 'You Win!';
    }
  };
});
