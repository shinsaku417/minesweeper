angular.module('param.resetter', [])

.factory('Resetter', function() {

  return {
    resetParams: resetParams
  };

  // function that resets the parameter of the game
  function resetParams(params) {
    params.firstClick = true;
    params.revealed = 0;
    params.finished = false;
  };
});
