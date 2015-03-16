angular.module('helper.helperfactory', ['helper.getter'])

.factory('HelperFactory', function(Getter) {
  return {
    getSquare: Getter.getSquare
  };
});
