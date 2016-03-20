define([
  'lib/underscore',
  'component/ko-validation/validators/base',
  'component/ko-validation/config',
], function (_, Base, config) {
  'use strict';
  function Required(allowSpace) {
    _.extend(this, new Base());
    this.allowSpace = allowSpace;
    this.message = config.defaultMessage('Validation_NotEmpty_Required_Field');
  }

  Required.prototype.isValid = function (value) {
    return _.isFinite(value) || !_.isEmpty(!this.allowSpace && _.isString(value) ? value.trim() : value);
  };

  return Required;
});
