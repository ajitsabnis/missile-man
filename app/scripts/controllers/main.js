'use strict';

/**
 * @ngdoc function
 * @name missileManApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the missileManApp
 */
angular.module('missileManApp')
  .controller('MainCtrl',['$scope', '$state', 'dataContainer', 'districts', 'csStreams', 'csCourses', '$modal', '$timeout',
  function ($scope, $state, dataContainer, districts, csStreams, csCourses, $modal, $timeout ) {
    var init;

    $scope.find = function () {
      dataContainer.homeSearch = $scope.search;
      console.log( dataContainer );
      $state.go('college-search');
    };

    $scope.loadStreams = function( item ) {
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
      $scope.country = {};

      $scope.search = {};
      $scope.search.district = null;
      districts.$promise.then( function() {
        $scope.districts = districts.data;
      });

      // $scope.districts = [{name: 'Ahmednagar',value: 'Ahmednagar'},{name: 'Akola',value: 'Akola'},{name: 'Amravati',value: 'Amravati'},{name: 'Aurangabad',value: 'Aurangabad'},{name: 'Beed',value: 'Beed'},{name: 'Bhandara',value: 'Bhandara'},{name: 'Buldhana',value: 'Buldhana'},{name: 'Chandrapur',value: 'Chandrapur'},{name: 'Dhule',value: 'Dhule'},{name: 'Gadchiroli',value: 'Gadchiroli'},{name: 'Gondiya',value: 'Gondiya'},{name: 'Hingoli',value: 'Hingoli'},{name: 'Jalgaon',value: 'Jalgaon'},{name: 'Jalna',value: 'Jalna'},{name: 'Kolhapur',value: 'Kolhapur'},{name: 'Latur',value: 'Latur'},{name: 'Mumbai-City',value: 'Mumbai-City'},{name: 'Mumbai-Suburban',value: 'Mumbai-Suburban'},{name: 'Nagpur',value: 'Nagpur'},{name: 'Nanded',value: 'Nanded'},{name: 'Nandurbar',value: 'Nandurbar'},{name: 'Nashik',value: 'Nashik'},{name: 'Osmanabad',value: 'Osmanabad'},{name: 'Palghar',value: 'Palghar'},{name: 'Parbhani',value: 'Parbhani'},{name: 'Pune',value: 'Pune'},{name: 'Raigad',value: 'Raigad'},{name: 'Ratnagiri',value: 'Ratnagiri'},{name: 'Sangli',value: 'Sangli'},{name: 'Satara',value: 'Satara'},{name: 'Silvassa',value: 'Silvassa'},{name: 'Sindhudurg',value: 'Sindhudurg'},{name: 'Solapur',value: 'Solapur'},{name: 'Thane',value: 'Thane'},{name: 'Wardha',value: 'Wardha'},{name: 'Washim',value: 'Washim'},{name: 'Yavatmal',value: 'Yavatmal'}];

      $scope.search.stream = null;
      // $scope.streams =  [{name: 'Architecture',value: 'Architecture'},{name: 'Engineering',value: 'Engineering'},{name: 'Hotel Management',value: 'Hotel Management'},{name: 'Management',value: 'Management'},{name: 'MCA',value: 'MCA'},{name: 'Other Advance Diplom',value: 'Other Advance Diplom'},{name: 'Pharmacy',value: 'Pharmacy'},{name: 'Polytechnic',value: 'Polytechnic'}];

      $scope.search.course = null;
      // $scope.courses =  [{name: 'Advance Diploma',value: 'Advance Diploma',stream: 'Other Advance Diplom'},{name: 'Bachelor of Architecture',value: 'Bachelor of Architecture',stream: 'Architecture'},{name: 'Bachelor of Engineering (B. E.)',value: 'Bachelor of Engineering (B. E.)',stream: 'Engineering'},{name: 'Bachelor of Engineering (Direct Second Year)',value: 'Bachelor of Engineering (Direct Second Year)',stream: 'Engineering'},{name: 'Bachelor of H.M.C.T.',value: 'Bachelor of H.M.C.T.',stream: 'Hotel Management'},{name: 'Bachelor of Pharmacy',value: 'Bachelor of Pharmacy',stream: 'Pharmacy'},{name: 'Bachelor of Technology (B. Tech.)',value: 'Bachelor of Technology (B. Tech.)',stream: 'Engineering'},{name: 'Certificate Course',value: 'Certificate Course',stream: 'Other Advance Diplom'},{name: 'Dual Degree Course in Management',value: 'Dual Degree Course in Management',stream: 'Management'},{name: 'Dual Degree Course in MCA',value: 'Dual Degree Course in MCA',stream: 'MCA'},{name: 'Integrated Program in Management',value: 'Integrated Program in Management',stream: 'Management'},{name: 'M.B.A./M.M.S.',value: 'M.B.A./M.M.S.',stream: 'Management'},{name: 'M.Text.',value: 'M.Text.',stream: 'Engineering'},{name: 'Master in Computer Application (Direct Second Year',value: 'Master in Computer Application (Direct Second Year',stream: 'N/A'},{name: 'Master in Computer Application (M.C.A.)',value: 'Master in Computer Application (M.C.A.)',stream: 'MCA'},{name: 'Master of Architecture',value: 'Master of Architecture',stream: 'Architecture'},{name: 'Master of Engineering (M. E.)',value: 'Master of Engineering (M. E.)',stream: 'Engineering'},{name: 'Master of H.M.C.T.',value: 'Master of H.M.C.T.',stream: 'Hotel Management'},{name: 'Master of Pharmacy',value: 'Master of Pharmacy',stream: 'Pharmacy'},{name: 'Master of Technology (M. Tech.)',value: 'Master of Technology (M. Tech.)',stream: 'Engineering'},{name: 'Non-AICTE',value: 'Non-AICTE',stream: 'Other Advance Diplom'},{name: 'P.G.D.M. (Autonomous)',value: 'P.G.D.M. (Autonomous)',stream: 'Management'},{name: 'Pharma D',value: 'Pharma D',stream: 'Pharmacy'},{name: 'Post Diploma (Non AICTE)',value: 'Post Diploma (Non AICTE)',stream: 'Engineering '},{name: 'Post Diploma Program in Engineering & Technology',value: 'Post Diploma Program in Engineering & Technology',stream: 'Engineering'},{name: 'Post Graduate Certificate in management',value: 'Post Graduate Certificate in management',stream: 'Management'},{name: 'Post Graduate Degree (Excluding MBA/MMS)',value: 'Post Graduate Degree (Excluding MBA/MMS)',stream: 'Management'},{name: 'Post Graduate Diploma (NON-AICTE MSBTE Approved)',value: 'Post Graduate Diploma (NON-AICTE MSBTE Approved)',stream: 'Other Advance Diplom'},{name: 'Post Graduate Diploma In Management (University Affiliated)',value: 'Post Graduate Diploma In Management (University Affiliated)',stream: 'Management'},{name: 'Post H.S.C. Diploma in H.M.C.T.',value: 'Post H.S.C. Diploma in H.M.C.T.',stream: 'Hotel Management'},{name: 'Post H.S.C. Diploma in Pharmacy (D. Pharm.)',value: 'Post H.S.C. Diploma in Pharmacy (D. Pharm.)',stream: 'Pharmacy'},{name: 'Post H.S.C. Diploma in Surface Coating Technology',value: 'Post H.S.C. Diploma in Surface Coating Technology',stream: 'Other Advance Diplom'},{name: 'Post S.S.C. Diploma in Engineering (Polytechnics)',value: 'Post S.S.C. Diploma in Engineering (Polytechnics)',stream: 'Polytechnic'}];

      $scope.modalOpen = false;

      $scope.open = function () {
        var modalInstance = $modal.open({
          templateUrl: 'views/like-cutoff.html',
          controller: 'LikeCutoffCtrl',
          size: 'sm'
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
          console.log('**Modal dismissed at: ' + new Date());
          $scope.modalOpen = false;
        });
      };

      $timeout( function () {
        $scope.open();
        $scope.modalOpen = true;
      }, 2000);

      var date = new Date();
      $scope.todaysDate = date.getDate();
      $scope.todaysDate += 3;
    };

    init();
  }]);
