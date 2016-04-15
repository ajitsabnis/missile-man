'use strict';

/**
 * @ngdoc function
 * @name missileManApp.controller:CutoffCollegeResultCtrl
 * @description
 * # CutoffCollegeResultCtrl
 * Controller of the missileManApp
 */
angular.module('missileManApp')
  .controller('CutoffCollegeResultCtrl',['collegeResult', '$scope', '$stateParams', 'csNotication',
  function (collegeResult, $scope, $stateParams, csNotication) {
    var init;

    init = function() {
      $scope.isDse = $stateParams.stream === 'dse-engineering';
      collegeResult.$promise.then( function( resp ) {
        $scope.resultList = resp.data;
        
        if(collegeResult.msg) {
            var config = {
                title: 'Information',
                message: collegeResult.msg,
                okText: 'Ok',
                cancelText: 'Cancel',
                showOK: true,
                showCancel: false,
                successCallback: function() {
                // $state.go( 'authorise' );
                },
                errorCallback: function() {
                // alert('error');
                }
            };
            csNotication.handle( config );
        }

      });
    };

    init();
  }]);
