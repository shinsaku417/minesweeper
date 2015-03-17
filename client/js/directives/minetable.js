angular.module('directives.minetable', [])
   .directive('mineTable', function () {
      return {
        replace: true,
        templateUrl: '../../js/directives/templates/minetable-template.html'
      };
   });
