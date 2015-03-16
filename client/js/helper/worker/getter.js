angular.module('helper.getter', [])

.factory('Getter', function() {

  return {
    getSquare: getSquare
  };

  // helper function that gets content of the square
  function getSquare(table, row, col) {
    return table.rows[row].cols[col];
  };

});
