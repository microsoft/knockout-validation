define([
  'lib/underscore',
  'component/ko-validation/validators/base',
  'component/ko-validation/config'
], function (_, Base, config) {
  'use strict';
  function Type() {
    Base.call(this);
  }

  Type.prototype = Object.create(Base.prototype, { constructor: { value: Type } } );

  Type.prototype.isValid = function(value) {
    return _.isArray(value);
  };

  function Size(min, max) {
    Base.call(this);

    this.min = min || 0;
    this.max = max;
    if (this.min) {
      this.message = config.defaultMessage('Validation_Array_Size_Between', { min: this.min, max: max });
    } else {
      this.message = config.defaultMessage('Validation_Array_Size_Max', { max: max });
    }
  }

  Size.prototype = Object.create(Base.prototype, { constructor: { value: Size } } );

  Size.prototype.isValid = function(value) {
    var size = _.size(value);

    return _.isArray(value) && size >= this.min && size <= this.max;
  };

  function passAll(validators, value) {
    return _.every(validators, function(validator) {
      return validator.isValid(value);
    });
  }

  /**
   * Create an array validator which inspects each item of an array by validators passed in.
   * @param: {Validator[]} validators - validators for all items, each item should pass all validators.
   */
  function Item(validators) {
    Base.call(this);

    this.validators = validators;
    this.message = function (value) {
      if (!_.isArray(value)) {
        return config.defaultMessage('Validation_Base_Field_Not_Valid');
      }

      return config.defaultMessage('Validation_Array_Items_Invalid');
    };
  }

  Item.prototype = Object.create(Base.prototype, { constructor: { value: Item } } );

  Item.prototype.isValid = function (value) {
    return _.isArray(value) && _.isEmpty(this.invalidItems(value));
  };

  /**
   * Filter out invalid items.
   *
   * @see http://json-schema.org/latest/json-schema-validation.html#anchor37 for understanding conditions of successful validation.
   */
  Item.prototype.invalidItems = function (value) {
    return _.omit(value, _.partial(passAll, this.validators));
  };

  /**
   * Create an array validator which inspects items of an array.
   * @param: {Validator[][]} validators - validators for first _.size(validator) items.
   * @param: {(Validator[]|boolean)} additionalValidators - boolean as allowing or not additional items, Validator[] as validators for additional items.
   */
  function Items(validators, additionalValidators) {
    Base.call(this);

    this.validators = validators;
    this.additionalValidators = additionalValidators;

    this.message = function (value) {
      if (!_.isArray(value)) {
        return config.defaultMessage('Validation_Base_Field_Not_Valid');
      }

      if (sizeNotFits(value, validators, additionalValidators)) {
        return config.defaultMessage('Validation_Array_Size_Max', { max: _.size(validators) });
      }

      return config.defaultMessage('Validation_Array_Items_Invalid');
    };
  }

  Items.prototype = Object.create(Base.prototype, { constructor: { value: Items } } );

  Items.prototype.isValid = function (value) {
    return _.isArray(value) && _.isEmpty(this.invalidItems(value));
  };

  /**
   * Filter out invalid items.
   *
   * when additionalValidators is false, means max length of array is _.size(validators);
   * when additionalValidators is true, no validation for additional items;
   * when additionalValidators is Validator[], it will be applied to additional items not covered by validators.
   *
   * @see http://json-schema.org/latest/json-schema-validation.html#anchor37 for understanding conditions of successful validation.
   */
  Items.prototype.invalidItems = function (value) {
    var validators = this.validators;
    var additionalValidators = this.additionalValidators;

    if (sizeNotFits(value, validators, additionalValidators)) {
      return value;
    }

    // additionalValidator could be validators or boolean
    if (additionalValidators === true) {
      additionalValidators = [];
    }

    return _.omit(value, function (item, index) {
      var vs = validators[index] || additionalValidators;
      return passAll(vs, item);
    });
  };

  function sizeNotFits(value, validators, additionalValidators) {
    return !additionalValidators && _.size(value) > _.size(validators);
  }

  function Unique() {
    Base.call(this);

    this.message = config.defaultMessage('Validation_Array_Items_Duplicate');
  }

  Unique.prototype = Object.create(Base.prototype, { constructor: { value: Unique } } );

  Unique.prototype.isValid = function (value) {
    return _.isArray(value) && _.size(_.uniq(value)) === _.size(value);
  };

  return {
    Type: Type,
    Size: Size,
    Item: Item,
    Items: Items,
    Unique: Unique
  };
});
