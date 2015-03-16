angular.module('table.tablefactory', ['table.creator'])

.factory('TableFactory', function(Creator) {
  return {
    createTable: Creator.createTable
  };
});
