angular.module('table.creator', [])

.factory('Creator', function() {

  return {
    createTable: createTable
  };

  // function that creates the table given parameters
  function createTable(params) {
    var table = {
      hidden: false
    };
    var size = params.size;
    // create array for rows in the table
    table.rows = [];
    for (var i = 0; i < size; i++) {
      var row = {};
      // create columns for each row in the table
      row.cols = [];
      for (var j = 0; j < size; j++) {
        // square has following properties:
        // covered: square is covered or not
        // count: number of surrounding mines
        // row: square's row
        // col: square's column
        var square = {};
        square.covered = true;
        square.count = 0;
        square.mined = false;
        square.row = i;
        square.col = j;
        row.cols.push(square);
      }
      table.rows.push(row);
    }
    return table;
  };

});
