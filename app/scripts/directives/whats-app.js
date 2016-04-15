'use strict';
angular.module('missileManApp')
.directive('whatsapp',function () {
  return {
    templateUrl: 'views/whatsapp.html',
    restrict: 'E',
    replace: true
  };
});
