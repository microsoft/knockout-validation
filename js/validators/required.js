define(['lib/underscore',
  'component/ko-validation/validators/base',
  '$/i18n!component/ko-validation'
], function(_, Base, i18n) {
  'use strict';
  function Required(allowSpace) {
    _.extend(this, new Base());
    this.allowSpace = !!allowSpace;
    this.message = i18n.get('Validation_NotEmpty_Required_Field');
  }

  Required.prototype.isValid = function(value) {
    return _.isFinite(value) || !_.isEmpty(!this.allowSpace && _.isString(value) ? value.trim() : value);
  };

  return Required;
});
