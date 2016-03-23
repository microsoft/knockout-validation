define(['component/ko-validation/config'], function (config) {
  'use strict';

  function Base() {
    this.blockInput = false;
    this.message = config.defaultMessage('Validation_Base_Field_Not_Valid');
  }

  Base.prototype.set = function (options) {
    options = options || {};
    if (options.blockInput) {
      this.blockInput = options.blockInput;
    }

    if (options.message) {
      this.message = options.message;
    }

    return this;
  };

  Base.prototype.validate = function (value) {
    return this.isValid(value) ? undefined : this.message;
  };

  return Base;
});
