'use strict';

/**
 * @ngdoc service
 * @name missileManApp.apiUrl
 * @description
 * # apiUrl
 * Constant in the missileManApp.
 */
angular.module('missileManApp')
  .constant('apiUrl', (function() {
    var BASE_URL = 'services/index.php/',
        apiRoot = $('#apiRoot').attr('href') ? $('#apiRoot').attr('href') : '';

    BASE_URL = apiRoot + BASE_URL;
    return {
      'DISTRICT': BASE_URL + 'districts',
      'STREAMS': BASE_URL + 'streams/:action/:district',
      'COURSES': BASE_URL + 'courses/streams/:stream/:district',
      'USERS': BASE_URL + 'users/:action',
      'COLLEGE_SEARCH': BASE_URL + 'colleges/search/:id',
      'CUTOFF_DETAILS': BASE_URL + 'cutoff',
      'CUTOFF_DSE_DETAILS': BASE_URL + 'cutoff/dse',
      'COLLEGE_CUTOFF': BASE_URL + 'colleges/cutoff/:id',
      'COLLEGE_DSE_CUTOFF': BASE_URL + 'colleges/dsecutoff/:id',
      'CONTACTUS': BASE_URL + 'contactus',
      'REQUEST': BASE_URL + 'contactus/request',
    };
  }()));
