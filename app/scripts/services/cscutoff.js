'use strict';

/**
 * @ngdoc service
 * @name missileManApp.csCutoff
 * @description
 * # csCutoff
 * Factory in the missileManApp.
 */
angular.module('missileManApp')
  .factory('csCutoff',
  ['$resource','apiUrl',
  function ($resource, apiUrl) {
  	return {
  		get: function() {
		  	return $resource(apiUrl.CUTOFF_DETAILS, {
		      id: '@collegeId'
		    });		
  		},
  		dse: function() {
		  	return $resource(apiUrl.CUTOFF_DSE_DETAILS, {
		      id: '@collegeId'
		    });		
  		}
  	};
  }]);
