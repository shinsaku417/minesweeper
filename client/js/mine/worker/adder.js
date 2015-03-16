angular.module('mine.adder', ['helper.helperfactory'])

.factory('Adder', function(HelperFactory) {

  return {
    addMines: addMines
  };

  // function that adds mines to the table
  function addMines(table, row, col, params) {
    var size = params.size;
    var num = params.num;
    for (var i = 0; i < num; i++) {
      // generate random numbers
      var randomRow = Math.floor(Math.random() * size);
      var randomCol = Math.floor(Math.random() * size);
      var square = HelperFactory.getSquare(table, randomRow, randomCol);
      // if the square is same as a square that is clicked initially or it is already mined, decrement i and try
      // to mine again
      // else, mine that square
      if ((randomRow === row && randomCol === col) || square.mined) {
        i--;
      } else {
        square.mined = true;
      }
    }
  }

});
