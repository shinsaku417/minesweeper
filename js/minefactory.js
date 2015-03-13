angular.module('minesweeper.minefactory', ['minesweeper.helperfactory'])

.factory('MineFactory', function(HelperFactory) {
  // function that adds mines to the table
  var addMines = function(table, initial, params) {
    var size = params.size;
    var num = params.num;
    for (var i = 0; i < num; i++) {
      // generate random numbers
      var row = Math.floor(Math.random() * size);
      var col = Math.floor(Math.random() * size);
      var square = HelperFactory.getSquare(table, row, col);
      // if the square is initial row or it is already mined, decrement i and try
      // to mine again
      // else, mine that square
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
      square.count = 'M';
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

  // function that uncovers all squares if that square has no surrounding mines
  var uncoverAll = function(table, row, col, params) {
    var addUncovered = function(square) {
      if (square.covered) {
        params.uncovered++;
      }
      square.covered = false;
    };

    // to uncover all squares...
    // 1. uncover the square. if that square is not already uncovered,
    // increment uncovered counter on params to be used for win condition
    // 2. if that square also has 0 surrounding mines and was previously covered,
    // recursively uncover all squares that surround that square

    // uncover three squares on top of the revealed square
    var square, wasCovered;
    if (row > 0) {
      // top left
      if (col > 0) {
        square = HelperFactory.getSquare(table, row - 1, col - 1);
        wasCovered = square.covered;
        addUncovered(square);
        if (square.count === 0 && wasCovered) {
          uncoverAll(table, row - 1, col - 1, params);
        }
      }
      // top
      square = HelperFactory.getSquare(table, row - 1, col);
      wasCovered = square.covered;
      addUncovered(square);
      if (square.count === 0 && wasCovered) {
        uncoverAll(table, row - 1, col, params);
      }
      // top right
      if (col < params.size - 1) {
        square = HelperFactory.getSquare(table, row - 1, col + 1);
        wasCovered = square.covered;
        addUncovered(square);
        if (square.count === 0 && wasCovered) {
          uncoverAll(table, row - 1, col + 1, params);
        }
      }
    }

    // check squares that are to the left and to the right
    // left
    if (col > 0) {
      square = HelperFactory.getSquare(table, row, col - 1);
      wasCovered = square.covered;
      addUncovered(square);
      if (square.count === 0 && wasCovered) {
        uncoverAll(table, row, col - 1, params);
      }
    }
    // right
    if (col < params.size - 1) {
      square = HelperFactory.getSquare(table, row, col + 1);
      wasCovered = square.covered;
      addUncovered(square);
      if (square.count === 0 && wasCovered) {
        uncoverAll(table, row, col + 1, params);
      }
    }

    // check bottom three squares
    if (row < params.size - 1) {
      // bottom left
      if (col > 0) {
        square = HelperFactory.getSquare(table, row + 1, col - 1);
        wasCovered = square.covered;
        addUncovered(square);
        if (square.count === 0 && wasCovered) {
          uncoverAll(table, row + 1, col - 1, params);
        }
      }
      // bottom
      square = HelperFactory.getSquare(table, row + 1, col);
      wasCovered = square.covered;
      addUncovered(square);
      if (square.count === 0 && wasCovered) {
        uncoverAll(table, row + 1, col, params);
      }
      // bottom right
      if (col < params.size - 1) {
        square = HelperFactory.getSquare(table, row + 1, col + 1);
        wasCovered = square.covered;
        addUncovered(square);
        if (square.count === 0 && wasCovered) {
          uncoverAll(table, row + 1, col + 1, params);
        }
      }
    }
  };

  return {
    addMines: addMines,
    countMines: countMines,
    uncoverAll: uncoverAll
  }
});
