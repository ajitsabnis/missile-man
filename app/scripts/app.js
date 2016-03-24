'use strict';

/**
 * @ngdoc overview
 * @name missileManApp
 * @description
 * # missileManApp
 *
 * Main module of the application.
 */
angular
  .module('missileManApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'ui.select'
  ])
  .config(['$stateProvider','$urlRouterProvider',
   function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('main', {
        url: '/home',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          districts: function(csDistrict) {
            return csDistrict.get();
          }
        }
      })
      .state('about-us', {
        url: '/about-us',
        templateUrl: 'views/about-us.html',
        controller: 'AboutUsCtrl'
      })
      .state('contact-us', {
        url: '/contact-us',
        templateUrl: 'views/contact-us.html',
        controller: 'ContactUsCtrl'
      })
      .state('login', {
        url: '/login/:phone',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'views/sign-up.html',
        controller: 'SignUpCtrl'
      })
      .state('authorise', {
        url: '/authorise',
        templateUrl: 'views/authorise.html',
        controller: 'AuthoriseCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .state('cutoff-college-search', {
        url: '/cutoff-college-search/:stream',
        templateUrl: 'views/cutoff_college_search.html',
        controller: 'CutoffCollegeSearchCtrl'
      })
      .state('cutoff-college-result', {
        url: '/cutoff-college-result/:stream',
        templateUrl: 'views/cutoff_college_result.html',
        controller: 'CutoffCollegeResultCtrl',
        resolve: {
          collegeResult: function(collegeSearch, dataContainer) {
            var searchParams = dataContainer.cutoffCollege;
            return collegeSearch.cutoff().get( {
              stream: searchParams.stream,
              course: searchParams.course,
              district: searchParams.collegeSearch.district,
              collegeId: searchParams.collegeSearch.collegeId,
              criteria: searchParams.criteria
            } );
          }
        }
      })
      .state('college-search', {
        url: '/college-search',
        templateUrl: 'views/college-search.html',
        controller: 'CollegeSearchCtrl',
        resolve: {
          collegeResult: function(collegeSearch, dataContainer) {
            var searchParams = dataContainer.homeSearch;
            return collegeSearch.search().get( {
              course: searchParams.course.name,
              district: searchParams.district.name,
              stream: searchParams.stream.name
            } );
          },
          searchParams: function(dataContainer) {
            return dataContainer.homeSearch;
          }
        }
      })
      .state('college-detail', {
        url: '/college-detail/:collegeId',
        templateUrl: 'views/college-detail.html',
        controller: 'CollegeDetailCtrl',
        resolve: {
          collegeDetails: function(collegeSearch, $stateParams) {
            return collegeSearch.search().get({
              id: $stateParams.collegeId
            });
          }

        }
      })
    .state( 'googlemaps', {
      url: '/maps',
      templateUrl: 'views/google-maps.html',
      data: {}
    })
    .state( 'advertisewithus', {
      url: '/advertise-with-us',
      templateUrl: 'views/advertise-with-us.html',
      controller: 'AboutUsCtrl',
      data: {}
    })
    .state( 'download', {
      url: '/download',
      templateUrl: 'views/download.html',
      controller: 'DownloadCtrl',
      data: {}
    })
    .state( 'under-construction', {
      url: '/under-construction',
      templateUrl: 'views/page-under-contruction.html',
      controller: 'AboutUsCtrl'
    });
  }])
  .config(['$resourceProvider', function($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    // $resourceProvider.defaults.stripTrailingSlashes = false;
    $resourceProvider.defaults.useXDomain = true;
    $resourceProvider.defaults.withCredentials = true;
    // console.log($resourceProvider);
    // console.log( 'This is sample test' );
  }])
  .config(function(uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
  })
  .run(function($rootScope) {
    var mobileRegex = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/;
    $rootScope.isMobileDevice = mobileRegex.test(navigator.userAgent);

    $rootScope.$on('$stateChangeError', function() {
      console.log(arguments);
    });
  });
