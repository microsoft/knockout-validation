define([
  'lib/underscore',
  'component/ko-validation/validators/base',
  'component/ko-validation/config',
], function (_, Base, config) {
  'use strict';
  function Type() {
    _.extend(this, new Base());
  }

  Type.prototype.isValid = function (value) {
    return _.isString(value);
  };

  function Size(length, blockInput) {
    _.extend(this, new Base());
    this.blockInput = _.isUndefined(blockInput) ? true : blockInput;
    this.length = length;
    this.message = config.defaultMessage('Validation_NotEmpty_Required_Field', { maxlength: this.length });
  }

  Size.prototype.isValid = function (value) {
    return _.isString(value) && _.size(value) <= this.length;
  };

  Size.prototype.process = function(value) {
    if (_.isString(value) && _.size(value) > this.length) {
      return value.substring(0, this.length);
    }

    return value;
  };

  function XSS() {
    _.extend(this, new Base());
    this.message = config.defaultMessage('Validation_String_Invalid_Characters');
  }

  XSS.prototype.isValid = function (value) {
    return _.isString(value) && !/<[^>]*>/.exec(value);
  };

  return {
    Type: Type,
    Size: Size,
    XSS: XSS,
  };
});
