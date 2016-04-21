define([
  'lib/underscore',
  'component/ko-validation/validators/base',
  'component/ko-validation/config',
  'component/humanize/decimal',
], function (_, Base, config, decimal) {
  'use strict';

  var decimalPoint = config.decimalPoint;

  function Type() {
    _.extend(this, new Base());
    this.blockInput = true;
    this.message = config.defaultMessage('Validation_Number_Require_Numeric');
  }

  Type.prototype.isValid = function (value) {
    // TODO [lyweiwei] this is not general
    return (_.isString(value) && _.isEmpty(value)) || decimal.isValid(value, true);
  };

  function Size(integerLength, decimalLength) {
    _.extend(this, new Base());
    this.blockInput = true;
    this.message = config.defaultMessage('Validation_Number_Max_Length');
    this.integerLength = integerLength;
    this.decimalLength = decimalLength;
  }

  Size.prototype.isValid = function (value) {
    if (_.isString(value) && _.isEmpty(value)) {
      return true;
    }

    if (!decimal.isValid(value, true)) {
      return false;
    }

    var number = decimal.fromLocalToFloat(value);
    var text = number.toString();

    if (number < 0) {
      text = text.substr(1);
    }

    var segments = text.split(decimalPoint);

    if (this.integerLength && _.size(segments[0]) > this.integerLength) {
      return false;
    }

    if (this.decimalLength === 0 && _.size(segments) > 1) {
      return false;
    }

    if (this.decimalLength && _.size(segments[1]) > this.decimalLength) {
      return false;
    }

    return true;
  };

  function Range(min, max) {
    _.extend(this, new Base());
    this.min = min;
    this.max = max;

    if (_.isFinite(min) && _.isFinite(max)) {
      this.message = config.defaultMessage('Validation_Number_Range_Between', {
        min: min,
        max: max,
      });
    } else if (_.isFinite(min)) {
      this.message = config.defaultMessage('Validation_Number_Range_Min', { min: min });
    } else {
      this.message = config.defaultMessage('Validation_Number_Range_Max', { max: max });
    }
  }

  Range.prototype.isValid = function (value) {
    if (_.isString(value) && _.isEmpty(value)) {
      return true;
    }

    if (!decimal.isValid(value, true)) {
      return false;
    }

    var number = parseFloat(value);
    var result = true;

    if (_.isFinite(this.min)) {
      result = result && number >= this.min;
    }

    if (_.isFinite(this.max)) {
      result = result && number <= this.max;
    }

    return result;
  };

  return {
    Type: Type,
    Size: Size,
    Range: Range,
  };
});
