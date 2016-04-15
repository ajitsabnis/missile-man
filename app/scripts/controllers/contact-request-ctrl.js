

'use strict';

/**
* @ngdoc function
* @name missileManApp.controller:ContactusctrlCtrl
* @description
* # ContactusctrlCtrl
* Controller of the missileManApp
*/
angular.module('missileManApp').controller('ContactRequestCtrl',['$scope','contactUs', '$modalInstance', 'details',
function ($scope, contactUs, $modalInstance, details) {
  var init;

  init = function() {
    $scope.contactInfo = {};
  };

  $scope.submit = function() {
    $scope.contactInfo.contactRequest = true;
    $scope.contactInfo.collegeName = details.collegeName;
    $scope.contactInfo.collegeId = details.collegeId;
    $scope.contactInfo.collegeEmail = details.email;
    contactUs.request().save(angular.toJson($scope.contactInfo), function() {
      $modalInstance.dismiss();
    });

  };

  $scope.close = function() {
    console.log('test');
    $modalInstance.dismiss('cancel');
  };

  init();
}]);
