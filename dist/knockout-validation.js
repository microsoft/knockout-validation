(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("underscore"), require("knockout"));
	else if(typeof define === 'function' && define.amd)
		define(["underscore", "knockout"], factory);
	else if(typeof exports === 'object')
		exports["knockout-validation"] = factory(require("underscore"), require("knockout"));
	else
		root["knockout-validation"] = factory(root["underscore"], root["knockout"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_13__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(2),
	  __webpack_require__(9),
	  __webpack_require__(5),
	  __webpack_require__(6),
	  __webpack_require__(8),
	  __webpack_require__(1),
	  __webpack_require__(10),
	  __webpack_require__(11),
	  __webpack_require__(12),
	  __webpack_require__(4),
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, Required, String, Number, Enum, Array, Passive, Custom, config) {
	  'use strict';
	
	  function run(value, validators) {
	    var failed = _.find(validators, function (v) {
	      return !v.isValid(value);
	    });
	    return failed ? failed.message : undefined;
	  }
	
	  function required(allowSpace) {
	    return new Required(allowSpace);
	  }
	
	  function string() {
	    return new String.Type();
	  }
	
	  string.size = function (length, blockInput) {
	    return new String.Size(length, blockInput);
	  };
	
	  string.xss = function () {
	    return new String.XSS();
	  };
	
	  function number() {
	    return new Number.Type();
	  }
	
	  number.size = function (integerLength, decimalLength) {
	    return new Number.Size(integerLength, decimalLength);
	  };
	
	  number.range = function (min, max) {
	    return new Number.Range(min, max);
	  };
	
	  function enumeration(enumerators, nullable) {
	    return new Enum(enumerators, nullable);
	  }
	
	  function array() {
	    return new Array.Type();
	  }
	
	  array.size = function (min, max) {
	    return new Array.Size(min, max);
	  };
	
	  array.item = function (validators) {
	    return new Array.Item(validators);
	  };
	
	  array.items = function (validators, additionalValidators) {
	    return new Array.Items(validators, additionalValidators);
	  };
	
	  array.unique = function () {
	    return new Array.Unique();
	  };
	
	  function passive() {
	    return new Passive();
	  }
	
	  function custom(method, message, blockInput) {
	    return new Custom(method, message, blockInput);
	  }
	
	  return {
	    // validators
	    required: required,
	    string: string,
	    number: number,
	    enum: enumeration,
	    array: array,
	    passive: passive,
	    custom: custom,
	    // end of validators
	    run: run, // run validation manually, for using without knockout
	    config: config,
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(2),
	  __webpack_require__(3),
	  __webpack_require__(4),
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, Base, config) {
	  'use strict';
	  function Type() {
	    Base.call(this);
	  }
	
	  Type.prototype = Object.create(Base.prototype, { constructor: { value: Type } });
	
	  Type.prototype.isValid = function (value) {
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
	
	  Size.prototype = Object.create(Base.prototype, { constructor: { value: Size } });
	
	  Size.prototype.isValid = function (value) {
	    var size = _.size(value);
	
	    return _.isArray(value) && size >= this.min && size <= this.max;
	  };
	
	  function passAll(validators, value) {
	    return _.every(validators, function (validator) {
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
	
	  Item.prototype = Object.create(Base.prototype, { constructor: { value: Item } });
	
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
	
	  Items.prototype = Object.create(Base.prototype, { constructor: { value: Items } });
	
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
	
	  Unique.prototype = Object.create(Base.prototype, { constructor: { value: Unique } });
	
	  Unique.prototype.isValid = function (value) {
	    return _.isArray(value) && _.size(_.uniq(value)) === _.size(value);
	  };
	
	  return {
	    Type: Type,
	    Size: Size,
	    Item: Item,
	    Items: Items,
	    Unique: Unique,
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(2),
	  __webpack_require__(4),
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, config) {
	  'use strict';
	
	  function Base() {
	    this.blockInput = false;
	    this.message = config.defaultMessage('Validation_Base_Field_Not_Valid');
	  }
	
	  Base.prototype.set = function (options) {
	    options = options || {};
	    if (_.has(options, 'blockInput')) {
	      this.blockInput = options.blockInput;
	    }
	
	    if (_.has(options, 'message')) {
	      this.message = options.message;
	    }
	
	    return this;
	  };
	
	  Base.prototype.validate = function (value) {
	    return this.isValid(value) ? undefined : this.message;
	  };
	
	  return Base;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_) {
	  // var validKeys = [
	  //   'Validation_Base_Field_Not_Valid',
	  //   'Validation_NotEmpty_Required_Field',
	  //   'Validation_String_Max_Length',
	  //   'Validation_String_Invalid_Characters',
	  //   'Validation_Number_Require_Numeric',
	  //   'Validation_Number_Max_Length',
	  //   'Validation_Number_Range_Min',
	  //   'Validation_Number_Range_Max',
	  //   'Validation_Number_Range_Between',
	  //   'Validation_Array_Size_Max',
	  //   'Validation_Array_Size_Between',
	  //   'Validation_Array_Items_Invalid',
	  //   'Validation_Array_Items_Duplicate'
	  // ];
	  return {
	    defaultMessage: _.identity,
	    decimalPoint: '.',
	    groupPoint: ',',
	    groupSize: 3,
	    numberOfDigits: 2,
	    percentDecimalDigits: 2,
	    percentDecimalSeparator: '.',
	    percentGroupSeparator: '.',
	    percentGroupSize: 3,
	    percentPositivePattern: '0',
	    percentSymbol: '%',
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(2),
	  __webpack_require__(3),
	  __webpack_require__(4),
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, Base, config) {
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
	
	  Size.prototype.process = function (value) {
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(2),
	  __webpack_require__(3),
	  __webpack_require__(4),
	  __webpack_require__(7),
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, Base, config, decimal) {
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(2),
	  __webpack_require__(4),
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, config) {
	  'use strict';
	
	  function getParts(input, decimalPoint) {
	    input = String(input);
	    var fracIndex = input.lastIndexOf(decimalPoint) + 1;
	    var parts = {
	      negative: input.substring(0, 1) === '-' ? '-' : '',
	      fractional: fracIndex ? input.substr(fracIndex).replace(/\D/g, '') : '',
	      integral: (fracIndex ? input.substring(0, fracIndex) : input).replace(/\D/g, ''),
	    };
	    parts.toFloat = function toFloat() {
	      return parseFloat(parts.negative + '0' + parts.integral + '.' + parts.fractional);
	    };
	    return parts;
	  }
	
	  function getFormat() {
	    return _.pick(config, [
	      'decimalPoint',
	      'groupPoint',
	      'groupSize',
	      'percentSymbol',
	      'percentGroupSize',
	      'percentGroupSeparator',
	      'percentPositivePattern',
	      'numberOfDigits',
	      'percentDecimalDigits',
	      'percentDecimalSeparator',
	    ]);
	  }
	
	  var dn = {
	    // true/false if exactly formatted correct, no smoothing
	    isValid: function isValid(localizedInput/* , allowNoIntegralPart */) {
	      var format = getFormat();
	      var minGroupSize = 0; // allowNoIntegralPart ? 0 : 1
	      var re = new RegExp('^[+-]?[0-9]{' + minGroupSize + ',' + format.groupSize + '}(?:\\' + format.groupPoint + '?[0-9]{' + format.groupSize + '})*(?:\\' + format.decimalPoint + '[[0-9]*)?$');
	      var isValid = re.test(localizedInput);
	
	      return isValid;
	    },
	
	    // returns null if invalid
	    // rounds if number of digits is passed, otherwise no rounding
	    fromLocalToFloat: function fromLocalToFloat(localizedInput/* , numberOfDigits */) {
	      var format = getFormat();
	      var parts = getParts(localizedInput, format.decimalPoint);
	      // if (parts.fractional || parts.integral) {
	      var floatValue = parts.toFloat();
	      // if (numberOfDigits) {
	      //     floatValue = parseFloat(floatValue.toFixed(numberOfDigits));
	      // }
	      return floatValue;
	      // }
	      // return null;
	    },
	
	    // // returns null if isValid == false
	    // fromLocalToStringStrict: function (localizedInput, numberOfDigits) {
	    //     if (!dn.isValid(localizedInput))
	    //     {
	    //         return null;
	    //     }
	
	    //     return dn.fromLocalToString(localizedInput, numberOfDigits);
	    // },
	
	    // // used to validate & format user input
	    // fromLocalToString: function fromLocalToString(localizedInput, numberOfDigits) {
	    //     var format = getFormat(),
	    //         parts = getParts(localizedInput, format.decimalPoint),
	    //         numberOfDigits = typeof numberOfDigits === 'undefined' ? format.numberOfDigits : numberOfDigits,
	    //         cleanedAndRounded = parts.toFloat().toFixed(numberOfDigits).split('.'),
	    //         formattedIntegral = '',
	    //         i = cleanedAndRounded[0].length;
	
	    //     for (; i > format.groupSize; i -= format.groupSize) {
	    //         formattedIntegral = format.groupPoint + cleanedAndRounded[0].substring(i - format.groupSize, i) + formattedIntegral;
	    //     }
	
	    //     formattedIntegral = cleanedAndRounded[0].substring(0, i) + formattedIntegral;
	    //     if (numberOfDigits) {
	    //         formattedIntegral += format.decimalPoint + cleanedAndRounded[1];
	    //     }
	
	    //     return formattedIntegral;
	    // },
	
	    // // format input to string in percentage format
	    // fromLocalToPercentString: function fromLocalToString(localizedInput, numberOfDigits) {
	    //     var input = localizedInput * 100;
	    //     var format = getFormat(),
	    //         parts = getParts(input, format.percentDecimalSeparator),
	    //         numberOfDigits = typeof numberOfDigits === 'undefined' ? format.percentDecimalDigits : numberOfDigits,
	    //         cleanedAndRounded = parts.toFloat().toFixed(numberOfDigits).split('.'),
	    //         formattedIntegral = '',
	    //         i = cleanedAndRounded[0].length;
	
	    //     for (; i > format.percentGroupSize; i -= format.percentGroupSize) {
	    //         formattedIntegral = format.percentGroupSeparator + cleanedAndRounded[0].substring(i - format.percentGroupSize, i) + formattedIntegral;
	    //     }
	
	    //     formattedIntegral = cleanedAndRounded[0].substring(0, i) + formattedIntegral;
	    //     if (numberOfDigits) {
	    //         formattedIntegral += format.percentDecimalSeparator + cleanedAndRounded[1];
	    //     }
	
	    //     switch (format.percentPositivePattern) {
	    //         //Associated pattern: n %
	    //         case '0':
	    //             formattedIntegral = formattedIntegral + ' ' + format.percentSymbol;
	    //             break;
	    //         //Associated pattern: n%
	    //         case '1':
	    //             formattedIntegral = formattedIntegral + format.percentSymbol;
	    //             break;
	    //         //Associated pattern: %n
	    //         case '2':
	    //             formattedIntegral = format.percentSymbol + formattedIntegral;
	    //             break;
	    //         //Associated pattern: % n
	    //         case '3':
	    //             formattedIntegral = format.percentSymbol + ' ' + formattedIntegral;
	    //             break;
	    //     }
	
	    //     return formattedIntegral;
	    // }
	  };
	
	  // // used to format float values from MT/DB (e.g., always a real number XXX.YY with a period for decimal place
	  // dn.fromFloatToString = function fromFloatToString(floatInput, numberOfDigits) {
	  //     var format = getFormat();
	  //     return dn.fromLocalToString(floatInput.toString().replace('.', format.decimalPoint), numberOfDigits);
	  // };
	
	  // // Used in Location Targeting control to convert Lat/Lon to string using customer culture information
	  // dn.fromCoordinateToString = function fromCoordinateToString(value) {
	  //     if (value && (typeof decimalFormatter !== 'undefined')) {
	  //         value = value.toString().replace(".", decimalFormatter.decimalPoint);
	  //     }
	
	  //     return value;
	  // };
	
	  // // used to format float value to string with a percent sign. Does NOT convert the float to a percent. Ex: 42.07 => 42.07%, 0.15 => 0.15%
	  // dn.fromFloatToPercentString = function fromFloatToPercentString(floatInput, numberOfDigits) {
	  //     var format = getFormat();
	  //     //fromLocalToPercentString will multiply the number by 100 and displayed with a percent symbol.
	  //     var input = floatInput / 100;
	  //     return dn.fromLocalToPercentString(input.toString().replace('.', format.decimalPoint), numberOfDigits);
	  // };
	
	  return dn;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(2),
	  __webpack_require__(3),
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, Base) {
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(2),
	  __webpack_require__(3),
	  __webpack_require__(4),
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, Base, config) {
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(2),
	  __webpack_require__(3),
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, Base) {
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(2),
	  __webpack_require__(3),
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, Base) {
	  'use strict';
	
	  var Custom = function (method, message, blockInput) {
	    Base.apply(this);
	
	    if (!_.isUndefined(blockInput)) {
	      this.blockInput = blockInput;
	    }
	
	    if (message) {
	      this.message = message;
	    }
	
	    this.isValid = method;
	  };
	
	  Custom.prototype = Object.create(Base.prototype);
	
	  return Custom;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(13), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko, _) {
	  'use strict';
	
	  ko.extenders.validate = function (observable, validators) {
	    validators = validators || [];
	
	    var observableWrapper = ko.computed({
	      read: function () {
	        return observable();
	      },
	      write: function (value) {
	        observableWrapper.errors.removeAll();
	        _.each(validators, function (validator) {
	          if (_.isFunction(validator.process) && !validator.blockInput) {
	            value = validator.process(value);
	          }
	        });
	
	        var failedValidations = _.filter(validators, function (v) {
	          return !v.isValid(value);
	        });
	
	        // if user input is blocked, do not pass this value to internal object
	        if (_.some(failedValidations, _.property('blockInput'))) {
	          observable.notifySubscribers();
	        } else {
	          // if user input is blocked, do not expose error to external
	          observableWrapper.errors(_.map(failedValidations, function (failed) {
	            return _.isFunction(failed.message) ? failed.message(value) : failed.message;
	          }));
	
	          if (_.isEqual(observable(), value)) {
	            observable.notifySubscribers();
	          } else {
	            observable(value);
	          }
	        }
	      },
	    }).extend({ notify: 'always' });
	
	    observableWrapper.errors = ko.observableArray();
	    observableWrapper.isValid = ko.computed(function () {
	      return this.errors().length === 0;
	    }, observableWrapper);
	
	    // force validation even if value not changed
	    observableWrapper.validate = function () {
	      this(observable());
	      return this.isValid();
	    };
	
	    return observableWrapper;
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=knockout-validation.js.map