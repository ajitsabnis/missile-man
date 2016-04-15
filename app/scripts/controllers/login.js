'use strict';

/**
 * @ngdoc function
 * @name missileManApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the missileManApp
 */
angular.module('missileManApp')
  .controller('LoginCtrl',
  ['$scope','userFactory', 'csNotication','$state','$rootScope', '$stateParams',
  function ($scope, userFactory, csNotication, $state, $rootScope, $stateParams) {
    var init,
        loginSuccess,
        loginError;

    init = function() {
      $scope.user = {};
      // $scope.user.phone = '9422987456';
      // $scope.user.password = 'demo';
      $scope.user.phone = $stateParams.phone ? $stateParams.phone : '';
      $scope.user.password = '';
    };

    loginSuccess = function( resp ) {
      if( resp.data.status === 301 ) {
        loginError();
        return;
      }
      var config = {
        title: 'Login',
        message: 'You have successfully logged in.',
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
      sessionStorage.setItem('userLoginStatus', 'loggedIn');
      $rootScope.showDashboardNav = true;
      $state.go( 'dashboard' );
    };

    loginError = function() {
      var config = {
        title: 'Error Login',
        message: 'Login Failed. Please try again with correct username and password',
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
    };

    $scope.loginSubmit = function() {
      // alert('demo');
      var execute = userFactory
            .execute( { phone: $scope.user.phone,password: $scope.user.password, action: 'login' } );
      execute.$promise.then(loginSuccess, loginError);
    };

    init();

  }]);
