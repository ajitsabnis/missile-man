'use strict';

/**
 * @ngdoc function
 * @name missileManApp.controller:CutoffCollegeResultCtrl
 * @description
 * # CutoffCollegeResultCtrl
 * Controller of the missileManApp
 */
angular.module('missileManApp')
  .controller('CutoffCollegeResultCtrl',['collegeResult', '$scope', '$stateParams',
  function (collegeResult, $scope, $stateParams) {
    var init;

    init = function() {
      $scope.isDse = $stateParams.stream === 'dse-engineering';
      collegeResult.$promise.then( function( resp ) {
        $scope.resultList = resp.data;
      });
    };

    init();
  }]);
