angular.module('mine.minefactory', ['mine.adder', 'mine.counter'])

.factory('MineFactory', function(Adder, Counter) {
  return {
    addMines: Adder.addMines,
    countMines: Counter.countMines
  };
});
