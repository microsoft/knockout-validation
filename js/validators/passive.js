define([
  'lib/underscore',
  'component/ko-validation/validators/base',
], function (_, Base) {
  'use strict';

  function Passive() {
    Base.apply(this);
    this.error = null;
  }

  Passive.prototype = Object.create(Base.prototype);

  Passive.prototype.isValid = function (value) {
    if (this.error && this.error.value === value) {
      return false;
    }
    this.error = null;
    return true;
  };

  Passive.prototype.setError = function (message, value) {
    this.error = {
      message: message,
      value: value,
    };
    this.message = message;
  };

  return Passive;
});
