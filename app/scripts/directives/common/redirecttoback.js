'use strict';

/**
 * @ngdoc directive
 * @name missileManApp.directive:redirecttoBackDirective
 * @description
 * #redirecttoBackDirective
 */
angular.module('missileManApp')
  .directive('redirecttoBack', function () {
    return {
    	restrict: 'A',
    	 link: function( scope, element, attrs ) {
            element.on( 'click', function () {
                history.back();
                scope.$apply();
            } );
        }
    };
});