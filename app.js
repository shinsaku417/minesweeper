angular.module('minesweeper', ['minesweeper.tablefactory', 'minesweeper.minefactory', 'minesweeper.helperfactory'])

.controller('minesweeperCtrl', function ($scope, TableFactory, MineFactory, HelperFactory) {
  var params = {
    firstClick: true,
    size: 0,
    num: 0
  };
  $scope.table = {};
  $scope.init = function() {
    // check if table size and # of mines are correctly entered
    if (!$scope.table.size || !$scope.table.num) {
      alert('Please Enter table size and number of mines');
    } else if ($scope.table.num > $scope.table.size * 2 - 1) {
      alert('Too many mines!');
    } else {
      params.firstClick = true;
      params.size = $scope.table.size;
      params.num = $scope.table.num;
      $scope.table = TableFactory.createTable(params);
    }
  }

  $scope.reveal = function(square) {
    if (params.firstClick) {
      MineFactory.addMines($scope.table, {row: square.row, col: square.col}, params);
      for (var i = 0; i < params.size; i++) {
        for (var j = 0; j < params.size; j++) {
          MineFactory.countMines($scope.table, i, j, params);
        }
      }
      params.firstClick = false;
    }
  }
});
