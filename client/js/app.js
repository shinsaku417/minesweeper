angular.module('minesweeper', ['logic.logicfactory', 'mine.minefactory', 'table.tablefactory', 'param.paramfactory', 'directives.minetable'])

.controller('minesweeperCtrl', function ($scope, LogicFactory, MineFactory, TableFactory, ParamFactory) {

  // set initial parameters
  $scope.params = ParamFactory.params;

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
      ParamFactory.init($scope.params.size, $scope.params.num);
      $scope.table = TableFactory.createTable($scope.params);
    }
  }

  // method that gets called when a player clicks on a square
  $scope.reveal = function(square) {
    LogicFactory.reveal($scope.table, square);
  };
});
