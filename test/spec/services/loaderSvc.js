'use strict';

describe('Service: loaderSvc', function () {

  // load the service's module
  beforeEach(module('weddingApp'));

  // instantiate service
  var loaderSvc;
  beforeEach(inject(function (_loaderSvc_) {
    loaderSvc = _loaderSvc_;
  }));

  it('should do something', function () {
    expect(!!loaderSvc).toBe(true);
  });

});
