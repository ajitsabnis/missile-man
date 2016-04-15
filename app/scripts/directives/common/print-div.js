'use strict';

/**
 * @ngdoc directive
 * @name missileManApp.directive:printDivDirective
 * @description
 * # printDiveDirective
 */
angular.module('missileManApp')
  .directive('printDiv', function () {
    return {
      restrict: 'A',
    link: function(scope, element, attrs) {
     element.bind('click', function(evt){    
       
       
    var printContents = document.getElementById("printable").innerHTML;
    var popupWin = window.open('', '_blank', 'width=300,height=300');
    popupWin.document.open()
    popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /><img src="images/logo.png" style="border-radius:50%"></head><body onload="window.print()">' + printContents + '<div><p>www.cutoffsearch.com</p> <p>Email: info@gitcpl.com</p><p>Toll Free:+91 9552279841</p></div></html>');
    popupWin.document.close();
 
  });
     return true;
      
    }
  };
});

