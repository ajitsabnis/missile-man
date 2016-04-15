'use strict';

/**
 * @ngdoc function
 * @name missileManApp.controller:CollegeSearchCtrl
 * @description
 * # CollegeSearchCtrl
 * Controller of the missileManApp
 */
angular.module('missileManApp')
  .controller('CollegeSearchCtrl',['collegeResult','$scope', 'searchParams','csDistrict', 'csStreams', 'csCourses','collegeSearch',
  function (collegeResult, $scope, searchParams, csDistrict, csStreams, csCourses, collegeSearch) {
    var init;

    $scope.find = function () {
      collegeSearch.search().get( {
        course: $scope.search.course.name,
        district: $scope.search.district.name,
        stream: $scope.search.stream.name
      } ).$promise.then(function(collegeResult) {
        $scope.collegeList = collegeResult.data;
      });
    };

    $scope.loadStreams = function( item ) {
      $scope.search.stream = null;
      $scope.search.course = null;
      csStreams.get({
        district: item.value,
        action: 'districts'
      }).$promise.then(function(data) {
        $scope.streams = data.data;
      });
    };

    $scope.loadCourses = function( item ) {
      csCourses.get({
        district: $scope.search.district.value,
        stream: item.value,
        action: 'streams'
      }).$promise.then(function(data) {
        $scope.courses = data.data;
      });
    };

    init = function() {
      collegeResult.$promise.then( function() {
        $scope.collegeList = collegeResult.data;
      } );

      $scope.search = {};
      $scope.search.district = null;
      csDistrict.get().$promise.then( function(districts) {
        $scope.districts = districts.data;
        $scope.search.district = searchParams.district;
      });
      $scope.search.stream = searchParams.stream;
      $scope.search.course = searchParams.course;

    };

    init();
  }]);
