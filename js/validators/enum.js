define([
  'lib/underscore',
  'component/ko-validation/validators/base',
], function (_, Base) {
  'use strict';

  function Enum(enumerators, nullable) {
    _.extend(this, new Base());
    this.enumerators = enumerators.slice();
    this.nullable = nullable;
    // use error message defined in base validator
  }

  Enum.prototype.isValid = function (value) {
    return (this.nullable && _.isNull(value)) ||
        _.contains(this.enumerators, value);
  };

  return Enum;
});
