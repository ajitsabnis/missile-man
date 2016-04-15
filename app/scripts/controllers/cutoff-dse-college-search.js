'use strict';

/**
 * @ngdoc function
 * @name missileManApp.controller:CutoffDseCollegeSearchCtrl
 * @description
 * # CutoffDseCollegeSearchCtrl
 * Controller of the missileManApp
 */
angular.module('missileManApp')
  .controller('CutoffDseCollegeSearchCtrl',
  ['$stateParams','$scope','csDistrict','collegeSearch','csCutoff', '$state','dataContainer',
  function ($stateParams, $scope, csDistrict, collegeSearch, csCutoff, $state, dataContainer) {
    var init,
        resetAll,
        generateSeatType,
        setStreamDetails;

    resetAll = function ( flag ) {
      $scope.collegeSearch.seatType = '';
      $scope.collegeSearch.category = '';
      $scope.collegeSearch.gender = '';
      $scope.collegeSearch.distType = '';
      if(!flag) {
        $scope.collegeSearch.collegeId = '';
      }
      $scope.metadata.seatTypes = [];
      $scope.metadata.categories = [];
      $scope.metadata.genders = [];
      $scope.metadata.distTypes = [];
    };

    setStreamDetails = function() {
      var stream = $stateParams.stream;
      switch(stream) {
        case 'dse-engineering':
          $scope.stream = 'Engineering';
          $scope.course = 'Bachelor of Engineering (B. E.)';
          return;
        default:
          console.log('error');
      }

    };

    init = function () {
      // $scope.stream = $stateParams.stream;
      setStreamDetails();
      
      $scope.collegeSearch = {};
      $scope.collegeSearch.district = '';

      // polytechnic Metadata

      $scope.metadata = {};
      resetAll();


      csDistrict.get(function(argument) {
        $scope.metadata.districts = argument.data;
      });

    };

    $scope.loadCollege = function() {
      resetAll();
      collegeSearch.search().get({
        course: $scope.course,
        stream: $scope.stream,
        district: $scope.collegeSearch.district
      }, function( resp ) {
        $scope.metadata.collegeList = resp.data;
      });
    };

    $scope.changeSeatType = function() {
      var excludeSeatType = ['D', 'P', 'C'],
          categories = [];

     $scope.metadata.categories = [];
     if( excludeSeatType.indexOf( $scope.collegeSearch.seatType ) > -1 ) {
       return;
     }

     for(var i = 0;i < $scope.metadata.cutoffDetails.length; i++ ) {
        if($scope.metadata.cutoffDetails[i].csSeatType[0] === $scope.collegeSearch.seatType) {
          categories.push({
            value: $scope.metadata.cutoffDetails[i].csSeatType.substr(1),
            label: $scope.metadata.cutoffDetails[i].csSeatType.substr(1)
          });
        }
     }
     $scope.metadata.categories = categories;

    };

    generateSeatType = function() {
        var seatTypes = [],
            tmpArr = [],
          obj;
        for( var i =0; i < $scope.metadata.cutoffDetails.length; i++ ) {
          obj = {};
          obj.value = $scope.metadata.cutoffDetails[i].csSeatType[0];
          obj.label = $scope.metadata.cutoffDetails[i].Label;
          if(tmpArr.indexOf(obj.value) === -1 ) {
            tmpArr.push(obj.value);
            seatTypes.push(obj);
          }
        }
        $scope.metadata.seatTypes = seatTypes;
    };

    $scope.loadCutoffDetails = function() {
      resetAll(true);
      csCutoff.dse().get({
        course: $scope.course,
        stream: $scope.stream,
        district: $scope.collegeSearch.district,
        id: $scope.collegeSearch.collegeId
      }, function( resp ) {
        $scope.metadata.cutoffDetails = resp.data;
        generateSeatType();
      });
    };

    $scope.submit = function() {
      var criteria = $scope.collegeSearch.seatType;

      if( !($scope.collegeSearch.seatType === 'P' || $scope.collegeSearch.seatType === 'D' || $scope.collegeSearch.seatType === 'C') ) {
        criteria = criteria + $scope.collegeSearch.category;
      }

      dataContainer.cutoffCollege = {};
      dataContainer.cutoffCollege.criteria = criteria;
      dataContainer.cutoffCollege.collegeId = $scope.collegeSearch.collegeId;
      dataContainer.cutoffCollege.collegeSearch = $scope.collegeSearch;
      dataContainer.cutoffCollege.stream = $scope.stream;
      dataContainer.cutoffCollege.course = $scope.course;
      dataContainer.cutoffCollege.isDse = true;
      $state.go('cutoff-college-result', {stream: $stateParams.stream});
    };

    $scope.enableSubmit= function() {
      if($scope.collegeSearch.district && $scope.collegeSearch.collegeId && $scope.collegeSearch.seatType) {
        return false;
      } else {
        return true;
      }
    };

    init();
  }]);
