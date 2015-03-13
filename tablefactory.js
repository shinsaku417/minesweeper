angular.module('minesweeper.tablefactory', [])

.factory('TableFactory', function() {
  var table = {};
  var createTable = function(params) {
    var size = params.size;
    table.rows = [];
    for (var i = 0; i < size; i++) {
      var row = {};
      row.cols = [];
      for (var j = 0; j < size; j++) {
        var square = {};
        square.covered = true;
        square.mined = false;
        row.cols.push(square);
      }
      table.rows.push(row);
    }
    return table;
  };
  return {
    createTable: createTable
  };
});
