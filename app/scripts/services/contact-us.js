'use strict';

/**
 * @ngdoc service
 * @name missileManApp.contactUs
 * @description
 * # contactUs
 * Service in the missileManApp.
 */
angular.module('missileManApp').factory('contactUs', ['$resource', 'apiUrl', function ($resource, apiUrl) {
    var requestFn, contactFn;

    requestFn = function() {
      return $resource(apiUrl.REQUEST, {});
    };
    contactFn = function() {
      return $resource(apiUrl.CONTACTUS, {});
    };

    return {
      request: requestFn,
      contact: contactFn
    };
  }]);
