angular.module('logic.logicfactory', ['logic.revealer', 'logic.checker', 'mine.minefactory', 'param.paramfactory'])

.factory('LogicFactory', function(Revealer, Checker, MineFactory, ParamFactory) {

  return {
    reveal: reveal
  };

  function reveal(table, square) {
    var params = ParamFactory.params;
    if (square.covered && !params.finished) {
      // the game never bombs on the first click
      if (params.firstClick) {
        // add mines to the table
        MineFactory.addMines(table, square.row, square.col, params);
        // count surrounding mines for each square
        for (var i = 0; i < params.size; i++) {
          for (var j = 0; j < params.size; j++) {
            MineFactory.countMines(table, i, j, params);
          }
        }
        params.firstClick = false;
      }
      // uncover the square
      square.covered = false;
      // if square is mined, player loses
      if (square.mined) {
        params.finished = true;
        params.endMessage = 'You Lose!';
      } else {
        // if square doesn't have any bombs surrounding it, it should uncover all squares around it
        if (square.count === 0) {
          Revealer.revealAll(table, square.row, square.col, params);
        }
        params.revealed++;
        // check if player has reached the win condition
        Checker.checkWin(params);
      }
    }
  }
});
