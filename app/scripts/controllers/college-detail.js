'use strict';

/**
 * @ngdoc function
 * @name missileManApp.controller:CollegeDetailCtrl
 * @description
 * # CollegeDetailCtrl
 * Controller of the missileManApp
 */
angular.module('missileManApp')
  .controller('CollegeDetailCtrl',['collegeDetails', '$scope', '$modal', 'csNotication',
  function (collegeDetails, $scope, $modal, csNotication) {
    var init,
        addSlide,
        paths;

    init = function() {
      // console.log( collegeDetails );
      collegeDetails.$promise.then( function() {
        $scope.collegeDetail = collegeDetails.data.collegeResult[0];
        $scope.courseDetails = collegeDetails.data.courseResult;
        $scope.collegeFacilities = $scope.collegeDetail.facilities.split('|');
      } );

      $scope.myInterval = 5000;
      $scope.noWrapSlides = false;
      $scope.slides = [];

      addSlide = function(path) {
        $scope.slides.push({
          image: path,
          text: 'College Picture'
        });
      };
      paths = [
        '/images/college/img1.jpg',
        '/images/college/img2.jpg',
        '/images/college/img3.jpg'
      ];

      for (var i=0; i<3; i++) {
        addSlide( paths[i] );
      }
    };

    $scope.openContactPopup = function() {
      $scope.items = ['item1', 'item2', 'item3'];
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'views/contact-request.html',
        controller: 'ContactRequestCtrl',
        size: 'sm',
        resolve: {
          details: function () {
            return $scope.collegeDetail;
          }
        }
      });

      modalInstance.result.then(function () {
        var config = {
          title: 'Thank You..!!',
          message: 'Your request sent successfully.',
          okText: 'Ok',
          cancelText: 'Cancel',
          showOK: true,
          showCancel: true,
          successCallback: function() {
            // $state.go( 'authorise' );
          },
          errorCallback: function() {
            // alert('error');
          }
        };
        csNotication.handle( config );
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

    init();
  }]);
