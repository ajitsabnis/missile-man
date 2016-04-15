'use strict';

/**
 * @ngdoc function
 * @name missileManApp.controller:LikeCutoffCtrl
 * @description
 * #LikeCutoffCtrl
 * Controller of the missileManApp
 */
angular.module('missileManApp')
.controller('LikeCutoffCtrl',['$scope', function($scope) {
  $scope.close = function() {
    this.$dismiss();
  };
}]);
