define([
  'lib/underscore',
  'component/ko-validation/validators/base',
  '$/i18n!component/ko-validation'
], function (_, Base, i18n) {
  'use strict';
  function Type() {
    _.extend(this, new Base());
  }

  Type.prototype.isValid = function(value) {
    return _.isString(value);
  };

  function Size(length) {
    _.extend(this, new Base());
    this.blockInput = true;
    this.length = length || 0;
    this.message = i18n.get('Validation_NotEmpty_Required_Field', {maxlength: this.length});
  }

  Size.prototype.isValid = function(value) {
    return _.isString(value) && _.size(value) <= this.length;
  };

  function XSS() {
    _.extend(this, new Base());
    this.message = i18n.get('Validation_String_Invalid_Characters');
  }

  XSS.prototype.isValid = function (value) {
    return _.isString(value) && !/<[^>]*>/.exec(value);
  };

  return {
    Type: Type,
    Size: Size,
    XSS: XSS
  };
});
