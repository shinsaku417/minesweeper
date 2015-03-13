angular.module('minesweeper.minefactory', ['minesweeper.helperfactory'])

.factory('MineFactory', function(HelperFactory) {
  var addMines = function(table, initial, params) {
    var size = params.size;
    var num = params.num;
    for (var i = 0; i < num; i++) {
      var x = Math.floor(Math.random() * table.size);
      var y = Math.floor(Math.random() * table.size);
      var square = HelperFactory.getSquare(table, x, y);
      if ((x === initial.x && y === initial.y) || square.mined) {
        i--;
      } else {
        square.mined = true;
      }
    }
  };

  return {
    addMines: addMines
  }
});
