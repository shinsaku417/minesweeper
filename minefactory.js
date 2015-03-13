angular.module('minesweeper.minefactory', ['minesweeper.helperfactory'])

.factory('MineFactory', function(HelperFactory) {
  var addMines = function(table, initial, params) {
    var size = params.size;
    var num = params.num;
    for (var i = 0; i < num; i++) {
      var row = Math.floor(Math.random() * size);
      var col = Math.floor(Math.random() * size);
      var square = HelperFactory.getSquare(table, row, col);
      if ((row === initial.row && col === initial.col) || square.mined) {
        i--;
      } else {
        console.log('row: ', row, " col: ", col, " is mined!");
        square.mined = true;
      }
    }
  };

  var countMines = function(table, row, col, params) {
    var square = HelperFactory.getSquare(table, row, col);
    var count = 0;
    // if square is mined, no need to count surrounding mines
    if (square.mined) {
      return;
    } else {
      // check three squares that are top of the square
      if (row > 0) {
        // top left
        if (col > 0) {
          if (HelperFactory.getSquare(table, row - 1, col - 1).mined) {
            count++;
          }
        }
        // top
        if (HelperFactory.getSquare(table, row - 1, col).mined) {
          count++;
        }
        // top right
        if (col < params.size - 1) {
          if (HelperFactory.getSquare(table, row - 1, col + 1).mined) {
            count++;
          }
        }
      }

      // check squares that are to the left and to the right
      // left
      if (col > 0) {
        if (HelperFactory.getSquare(table, row, col - 1).mined) {
          count++;
        }
      }
      // right
      if (col < params.size - 1) {
        if (HelperFactory.getSquare(table, row, col + 1).mined) {
          count++;
        }
      }

      // check bottom three squares
      if (row < params.size - 1) {
        // bottom left
        if (col > 0) {
          if (HelperFactory.getSquare(table, row + 1, col - 1).mined) {
            count++;
          }
        }
        // bottom
        if (HelperFactory.getSquare(table, row + 1, col).mined) {
          count++;
        }
        // bottom right
        if (col < params.size - 1) {
          if (HelperFactory.getSquare(table, row + 1, col + 1).mined) {
            count++;
          }
        }
      }
      square.count = count;
    }
  };


  return {
    addMines: addMines,
    countMines: countMines
  }
});
