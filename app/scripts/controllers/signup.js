'use strict';

/**
 * @ngdoc function
 * @name missileManApp.controller:SignUpCtrl
 * @description
 * # SignUpCtrl
 * Controller of the missileManApp
 */
angular.module('missileManApp')
  .controller('SignUpCtrl',['userFactory', '$scope', '$modal', '$state','csNotication',
    function ( userFactory, $scope, $modal, $state, csNotication ) {

    var init,
        validate,
        userSaveError,
        userSaveSuccess;

    init = function() {
      $scope.user = {};
      $scope.user.userType = 'S';
      $scope.user.firstName = null;
      $scope.user.lastName = null;
      $scope.user.phone = null;
      $scope.user.gender = '';
      $scope.user.district = null;
      $scope.user.aboutMe = null;
      $scope.user.email = null;
      $scope.user.password = null;

      // $scope.user.userType = 'S';
      // $scope.user.firstName = 'sampleFirstName';
      // $scope.user.lastName = 'sampleLastName';
      // $scope.user.phone = '9422987456';
      // $scope.user.gender = 'M';
      // $scope.user.district = 'Pune';
      // $scope.user.aboutMe = 'Demo Text';
      // $scope.user.email = 'pune@gmail.com';
      // $scope.user.password = 'demo';

      // $scope.acceptTerms = true;
    };

    validate = function() {
      if( !$scope.acceptTerms ) {
        var config = {
          title: 'Terms & Conditions..!!',
          message: 'Please accept Terms and Conditions to registration',
          okText: 'OK',
          cancelText: 'Cancel',
          showOK: true,
          showCancel: false,
          successCallback: function() {
            // $state.go( 'contact-us' );
          },
          errorCallback: function() {
            // alert('error');
          }
        };
        csNotication.handle( config );
        return false;
      }
      return true;
    };

    userSaveSuccess = function( data ) {

      if( data.data.status === 301 ) {
        userSaveError( data );
        return;
      }

      // var config = {
      //   title: 'Congratulations..!!',
      //   message: 'You have registered successfully. Please enter OTP or click on link in the email.',
      //   okText: 'Ok',
      //   cancelText: 'Cancel',
      //   showOK: true,
      //   showCancel: true,
      //   successCallback: function() {
      //     // $state.go( 'authorise' );
      //   },
      //   errorCallback: function() {
      //     // alert('error');
      //   }
      // };
      // csNotication.handle( config );
      // $state.go( 'authorise' );


      var config = {
        title: 'Congratulations..!!',
        message: 'You have registered successfully. Please login with your phone number and password.',
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
      $state.go( 'login' );
    };

    userSaveError = function( data ) {
      // console.log( data );
      // console.log('in user save error');
      var config = {
        title: 'Error..!!',
        message: data.data ? data.data.message : 'Unable to register. Please contact cutoffsearch admin',
        okText: 'Contact Us',
        cancelText: 'Cancel',
        showOK: true,
        showCancel: true,
        successCallback: function() {
          $state.go( 'contact-us' );
        },
        errorCallback: function() {
          // alert('error');
        }
      };
      csNotication.handle( config );
    };

    $scope.submit = function () {
      if(validate()) {
        userFactory.userData = $scope.user;
        userFactory.save( $scope.user ).$promise.then( userSaveSuccess, userSaveError );
      }
    };

    init();
  }]);
