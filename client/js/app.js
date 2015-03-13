angular.module('minesweeper', ['minesweeper.tablefactory', 'minesweeper.minefactory', 'minesweeper.helperfactory'])

.controller('minesweeperCtrl', function ($scope, TableFactory, MineFactory, HelperFactory) {
  // initial parameters
  $scope.params = {
    firstClick: true,
    size: 5,
    num: 5,
    uncovered: 0
  };
  $scope.table = {
    hidden: true
  };
  $scope.finished = false;

  // method tha gets called when a player clicks on start
  $scope.init = function() {
    // check if table size and # of mines are correctly entered
    if ($scope.params.size === undefined || $scope.params.num === undefined) {
      alert('Please Enter table size and number of mines');
    // check if we have too many bombs
  } else if ($scope.params.num > Math.pow($scope.params.size, 2) - 1) {
      alert('Too many mines!');
    } else {
      // initialize the table
      $scope.table.hidden = false;
      $scope.finished = false;
      HelperFactory.resetParams($scope.params);
      $scope.table = TableFactory.createTable($scope.params);
    }
  }

  // method that gets called when a player clicks on a square
  $scope.uncover = function(square) {
    if (square.covered && !$scope.finished) {
      var params = $scope.params;
      // the game never bombs on the first click
      if (params.firstClick) {
        // add mines to the table
        MineFactory.addMines($scope.table, {row: square.row, col: square.col}, params);
        // count surrounding mines for each square
        for (var i = 0; i < params.size; i++) {
          for (var j = 0; j < params.size; j++) {
            MineFactory.countMines($scope.table, i, j, params);
          }
        }
        params.firstClick = false;
      }
      // uncover the square
      square.covered = false;
      // if square is mined, player loses
      if (square.mined) {
        $scope.finished = true;
        $scope.status = 'You Lose!';
      } else {
        // if square doesn't have any bombs surrounding it, it should uncover all squares around it
        if (square.count === 0) {
          MineFactory.uncoverAll($scope.table, square.row, square.col, params);
        }
        params.uncovered++;
        // check if player has reached the win condition
        if (HelperFactory.checkWin(params)) {
          $scope.finished = true;
          $scope.status = 'You Win!';
        };
      }
    }
  }
});
