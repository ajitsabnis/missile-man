'use strict';

/**
 * @ngdoc directive
 * @name missileManApp.directive:facebookDirective
 * @description
 * # facebookDirective
 */
angular.module('missileManApp')
  .directive('csFacebookDir', function () {
    return {
      templateUrl: 'views/facebook.html',
      restrict: 'E',
      replace: true,
      link: function postLink() {
        // element.text('this is the facebookDirective directive');
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }
    };
  });
