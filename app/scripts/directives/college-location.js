'use strict';
angular.module('missileManApp')
.directive('collegeLocation',function () {
  return {
    templateUrl: 'views/college-location.html',
    restrict: 'E',
    replace: true,
    link: function(scope, element, attrs) {
      console.log(attrs.collegeName);

      scope.collegeLocationName = attrs.collegeName;
    }
  };
});
