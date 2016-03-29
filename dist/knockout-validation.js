(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("underscore"), require("knockout"));
	else if(typeof define === 'function' && define.amd)
		define(["underscore", "knockout"], factory);
	else if(typeof exports === 'object')
		exports["knockout-validation"] = factory(require("underscore"), require("knockout"));
	else
		root["knockout-validation"] = factory(root["underscore"], root["knockout"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_10__) {
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
	  __webpack_require__(1),
	  __webpack_require__(2),
	  __webpack_require__(5),
	  __webpack_require__(6),
	  __webpack_require__(7),
	  __webpack_require__(8),
	  __webpack_require__(9),
	  __webpack_require__(4),
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, Required, String, Number, Enum, Custom, config) {
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
	
	  string.size = function (length) {
	    return new String.Size(length);
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
	
	  function custom(method, message, blockInput) {
	    return new Custom(method, message, blockInput);
	  }
	
	  return {
	    // validators
	    required: required,
	    string: string,
	    number: number,
	    enum: enumeration,
	    custom: custom,
	    // end of validators
	    run: run, // run validation manually, for using without knockout
	    config: config,
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(1),
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(1),
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_) {
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
	  // ];
	  return {
	    defaultMessage: _.identity,
	    decimalPoint: '.',
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(1),
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
	
	  function Size(length) {
	    _.extend(this, new Base());
	    this.blockInput = true;
	    this.length = length || 0;
	    this.message = config.defaultMessage('Validation_NotEmpty_Required_Field', { maxlength: this.length });
	  }
	
	  Size.prototype.isValid = function (value) {
	    return _.isString(value) && _.size(value) <= this.length;
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
	  __webpack_require__(1),
	  __webpack_require__(3),
	  __webpack_require__(4),
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, Base, config) {
	  'use strict';
	
	  var decimalPoint = config.decimalPoint;
	
	  function Type() {
	    _.extend(this, new Base());
	    this.blockInput = true;
	    this.message = config.defaultMessage('Validation_Number_Require_Numeric');
	  }
	
	  Type.prototype.isValid = function (value) {
	    // TODO [lyweiwei] this is not general
	    return value === '-' || value === decimalPoint || _.isFinite(value);
	  };
	
	  function Size(integerLength, decimalLength) {
	    _.extend(this, new Base());
	    this.blockInput = true;
	    this.message = config.defaultMessage('Validation_Number_Max_Length');
	    this.integerLength = integerLength;
	    this.decimalLength = decimalLength;
	  }
	
	  Size.prototype.isValid = function (value) {
	    if (!_.isFinite(value)) {
	      return false;
	    }
	
	    var number = parseFloat(value);
	    var text = value.toString();
	
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
	    if (!_.isFinite(value)) {
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
	  __webpack_require__(1),
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(1),
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(10), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ko, _) {
	  'use strict';
	
	  ko.extenders.validate = function (observable, validators) {
	    validators = validators || [];
	
	    var observableWrapper = ko.computed({
	      read: function () {
	        return observable();
	      },
	      write: function (value) {
	        observableWrapper.errors.removeAll();
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
	
	          observable(value);
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
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=knockout-validation.js.map