describe('Unit: MainController', function() {
  beforeEach(module('minesweeper'));

  var ctrl, scope;
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('MinesweeperCtrl', {
      $scope: scope,
    });
  }));

  it('should have initial parameters',
    function() {
      expect(scope.params.size).toEqual(5);
      expect(scope.params.num).toEqual(5);
      expect(scope.params.revealed).toEqual(0);
      expect(scope.params.started).toEqual(false);
      expect(scope.params.finished).toEqual(false);
  });

  it('$scope.init should call init in ParamFactory',
    inject(function(ParamFactory) {
      spyOn(ParamFactory, 'init');
      scope.init();
      expect(ParamFactory.init).toHaveBeenCalled();
  }));

  it('$scope.init should create new table',
    function() {
      scope.init();
      expect(typeof scope.table).toEqual('object');
      expect(scope.table.rows.length).toEqual(scope.params.size);
  });
})
