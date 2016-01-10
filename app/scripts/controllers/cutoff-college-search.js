'use strict';

/**
 * @ngdoc function
 * @name missileManApp.controller:CutoffCollegeSearchCtrl
 * @description
 * # CutoffCollegeSearchCtrl
 * Controller of the missileManApp
 */
angular.module('missileManApp')
  .controller('CutoffCollegeSearchCtrl',
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
        case 'polytechnic':
          $scope.stream = 'Polytechnic';
          $scope.course = 'Post S.S.C. Diploma in Engineering (Polytechnics)';
          return;
        case 'mca':
            $scope.stream = 'MCA';
            $scope.course = 'Master in Computer Application (M.C.A.)';
            return;
        case 'mba':
          $scope.stream = 'Management';
          $scope.course = 'M.B.A./M.M.S.';
          return;
        case 'hotel-management':
          $scope.stream = 'Hotel Management';
          $scope.course = 'Bachelor of H.M.C.T.';
          return;
        case 'engineering':
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

    $scope.changeCategory  = function( isPH ) {
      var distTypes = [],
          tmpArr = [],
          obj,
          st;

      for( var i =0; i < $scope.metadata.cutoffDetails.length; i++ ) {
        obj = {};
        st = $scope.metadata.cutoffDetails[i].csSeatType;
        obj.value = st.substring(st.length - 1);
        obj.label = obj.value === 'H' ? 'Home District' : 'Other District';
        if(tmpArr.indexOf(obj.value) === -1 && ( st[1] === $scope.collegeSearch.gender || st[1] === '@') && st[0] === $scope.collegeSearch.seatType && st.substring( 2, st.length-1 ) === $scope.collegeSearch.category && !isPH) {
            tmpArr.push(obj.value);
            distTypes.push(obj);
          } else if( tmpArr.indexOf(obj.value) === -1 && isPH && st[0] === 'P') {
            tmpArr.push(obj.value);
            distTypes.push(obj);
          }
        }

        $scope.metadata.distTypes = distTypes;
      };


    $scope.changeGender = function() {
      var category = [],
          tmpArr = [],
          obj,
          st;

      for( var i =0; i < $scope.metadata.cutoffDetails.length; i++ ) {
        obj = {};
        st = $scope.metadata.cutoffDetails[i].csSeatType;
        obj.value = st.substring(2, st.length - 1);
        obj.label = st.substring(2, st.length - 1);

        if(tmpArr.indexOf(obj.value) === -1 && ( st[1] === $scope.collegeSearch.gender || st[1] === '@') && st[0] === $scope.collegeSearch.seatType) {
            tmpArr.push(obj.value);
            category.push(obj);
          }
        }
        $scope.metadata.categories = category;
    };

    $scope.changeSeatType = function() {
      var gender = [],
          tmpArr = [],
          excludeSeatType = ['D', 'O', 'A'],
          excludeStream = ['MCA', 'Management', 'Hotel Management', 'Engineering'],
          obj,
          st;

     if( excludeSeatType.indexOf( $scope.collegeSearch.seatType ) > -1 ) {
       return;
     }

     if( $scope.collegeSearch.seatType === 'P' ) {
       $scope.changeCategory( 1 );
     } else if( excludeStream.indexOf( $scope.stream ) > -1 ) {
       $scope.changeGender();
     } else {
       for( var i =0; i < $scope.metadata.cutoffDetails.length; i++ ) {
         obj = {};
         st = $scope.metadata.cutoffDetails[i].csSeatType;
         obj.value = st[1];
         obj.label = st[1] === 'G' ? 'Male': 'Female';
         if(tmpArr.indexOf(obj.value) === -1 && st[0] === $scope.collegeSearch.seatType ) {

             tmpArr.push(obj.value);
             gender.push(obj);
           }
         }
         $scope.metadata.genders = gender;
     }
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
      csCutoff.get({
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

      if( $scope.collegeSearch.seatType === 'D' ) {
        $scope.collegeSearch.distType = 'EFO';
      }
      if( $scope.collegeSearch.seatType === 'O' ) {
        $scope.collegeSearch.distType = 'MS';
      }
      if( $scope.collegeSearch.seatType === 'A' ) {
        $scope.collegeSearch.distType = 'I';
      }

      criteria += $scope.collegeSearch.gender;
      criteria += $scope.collegeSearch.category;
      criteria += $scope.collegeSearch.distType;


      dataContainer.cutoffCollege = {};
      dataContainer.cutoffCollege.criteria = criteria;
      dataContainer.cutoffCollege.collegeId = $scope.collegeSearch.collegeId;
      dataContainer.cutoffCollege.collegeSearch = $scope.collegeSearch;
      dataContainer.cutoffCollege.stream = $scope.stream;
      dataContainer.cutoffCollege.course = $scope.course;
      console.log( dataContainer.cutoffCollege );
      $state.go('cutoff-college-result');
    };
    init();

  }]);
