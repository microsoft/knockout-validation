define([
  'lib/underscore',
  'component/ko-validation/validators/base',
], function (_, Base) {
  'use strict';

  var Custom = function (method, message, blockInput) {
    Base.apply(this);

    if (!_.isUndefined(blockInput)) {
      this.blockInput = blockInput;
    }

    if (message) {
      this.message = message;
    }

    this.isValid = method;
  };

  Custom.prototype = Object.create(Base.prototype);

  return Custom;
});
