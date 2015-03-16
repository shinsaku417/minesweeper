angular.module('param.paramfactory', ['param.resetter'])

.factory('ParamFactory', function(Resetter) {

  var params = {
    size: 5,
    num: 5,
    revealed: 0,
    started: false,
    finished: false,
    endMessage: ''
  };

  return {
    params: params,
    init: init,
  };

  function init(size, num) {
    Resetter.resetParams(params);
    params.size = size;
    params.num = num;
    params.started = true;
  }
});
