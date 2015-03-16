angular.module('logic.revealer', ['helper.helperfactory'])

.factory('Revealer', function(HelperFactory) {

  return {
    revealAll: revealAll
  };

  // function that adds onto the number of squares revealed
  function addRevealed(square, params) {
    if (square.covered) {
      params.revealed++;
    }
    square.covered = false;
  };
  // function that reveals all squares if that square has no surrounding mines
  function revealAll(table, row, col, params) {

    // to reveal all squares...
    // 1. reveal the square. if that square is not already uncovered,
    // increment uncovered counter on params to be used for win condition
    // 2. if that square also has 0 surrounding mines and was previously covered,
    // recursively reveal all squares that surround that square

    // reveal three squares on top of the revealed square
    var square, wasCovered;
    if (row > 0) {
      // top left
      if (col > 0) {
        square = HelperFactory.getSquare(table, row - 1, col - 1);
        wasCovered = square.covered;
        addRevealed(square, params);
        if (square.count === 0 && wasCovered) {
          revealAll(table, row - 1, col - 1, params);
        }
      }
      // top
      square = HelperFactory.getSquare(table, row - 1, col);
      wasCovered = square.covered;
      addRevealed(square, params);
      if (square.count === 0 && wasCovered) {
        revealAll(table, row - 1, col, params);
      }
      // top right
      if (col < params.size - 1) {
        square = HelperFactory.getSquare(table, row - 1, col + 1);
        wasCovered = square.covered;
        addRevealed(square, params);
        if (square.count === 0 && wasCovered) {
          revealAll(table, row - 1, col + 1, params);
        }
      }
    }

    // check squares that are to the left and to the right
    // left
    if (col > 0) {
      square = HelperFactory.getSquare(table, row, col - 1);
      wasCovered = square.covered;
      addRevealed(square, params);
      if (square.count === 0 && wasCovered) {
        revealAll(table, row, col - 1, params);
      }
    }
    // right
    if (col < params.size - 1) {
      square = HelperFactory.getSquare(table, row, col + 1);
      wasCovered = square.covered;
      addRevealed(square, params);
      if (square.count === 0 && wasCovered) {
        revealAll(table, row, col + 1, params);
      }
    }

    // check bottom three squares
    if (row < params.size - 1) {
      // bottom left
      if (col > 0) {
        square = HelperFactory.getSquare(table, row + 1, col - 1);
        wasCovered = square.covered;
        addRevealed(square, params);
        if (square.count === 0 && wasCovered) {
          revealAll(table, row + 1, col - 1, params);
        }
      }
      // bottom
      square = HelperFactory.getSquare(table, row + 1, col);
      wasCovered = square.covered;
      addRevealed(square, params);
      if (square.count === 0 && wasCovered) {
        revealAll(table, row + 1, col, params);
      }
      // bottom right
      if (col < params.size - 1) {
        square = HelperFactory.getSquare(table, row + 1, col + 1);
        wasCovered = square.covered;
        addRevealed(square, params);
        if (square.count === 0 && wasCovered) {
          revealAll(table, row + 1, col + 1, params);
        }
      }
    }
  }
});
