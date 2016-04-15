'use strict';

/**
 * @ngdoc function
 * @name missileManApp.controller:DownloadCtrl
 * @description
 * # DownloadCtrl
 * Controller of the missileManApp
 */
angular.module('missileManApp').controller('DownloadCtrl',['$scope','$window',
	 function ($scope, $window) {
    var downloads = [];

  downloads.push({name:'Poster for Notice Board (Engish Marathi)', path: 'images/Poster_2.jpg', type: 'image'});
  downloads.push({name:'Poster for Notice Board (English)', path: 'images/Poster_1.jpg', type: 'image'});
  downloads.push({name:'Cutoff Web Portal Offline Demo', path: 'docs/Cutoffsearch_OfflineDemo_Brochure.pdf', type: 'pdf'});

  $scope.downloads = downloads;
 // $scope.isMobileDevice = deviceDetector.isMobile();
  $scope.downloadContent = function( path ) {
    $window.open(path, '_blank');
  };
  }]);
