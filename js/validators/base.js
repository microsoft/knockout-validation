define(['$/i18n!component/ko-validation'], function(i18n) {
  'use strict';

  function Base() {
    this.blockInput = false;
    this.message = i18n.get('Validation_Base_Field_Not_Valid');
  }

  Base.prototype.set = function(options) {
    options = options || {};
    if (options.blockInput) {
      this.blockInput = options.blockInput;
    }

    if (options.message) {
      this.message = options.message;
    }

    return this;
  };

  Base.prototype.validate = function(value) {
    return this.isValid(value) ? undefined : this.message;
  };

  return Base;
});
