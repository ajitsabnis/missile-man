'use strict';

describe('Directive: facebookDirective', function () {

  // load the directive's module
  beforeEach(module('missileManApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<facebook-directive></facebook-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the facebookDirective directive');
  }));
});
