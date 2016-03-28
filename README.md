# knockout-validation [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
Knockout validation and error handling module.

## Usage
```bash
npm install --save knockout-validation
```

In your JavaScript code
### As AMD
```javascript
require(['knockout', 'knockout-validation'], function (ko, koValidation) {
  var ob = ko.observable().extend({
    validate: [
      // a list of validators
      koValidation.string(),
    ]
  });

  ob('foo'); // this will success
  ob(123); // this will fail
});
```

### As CMD
```javascript
var ko = require('knockout');
var koValidation = require('knockout-validation');

var ob = ko.observable().extend({
  validate: [
    // a list of validators
    koValidation.string(),
  ]
});

ob('foo'); // this will success
ob(123); // this will fail
```

## API
### `koValidation.string()`
Create a string validator verifies if the observable has a string value.

### `koValidation.string.size(length)`
Create a string validator with limited length.

### `koValidation.string.xss()`
Create a string validator with [XSS (cross site scripting)](https://en.wikipedia.org/wiki/Cross-site_scripting) check.

### `koValidation.number()`
Create a number validator verifies if the observable has a number value.

### `koValidation.number.size(integerLength, decimalLength)`
Create a number validator with limited integer part length and decimal part
length.

### `koValidation.number.range(min, max)`
Create a number validator with a range.

### `koValidation.enum(values, nullable)`
Create an enum validator validates if the observable has a value in the given
value set.

### `koValidation.required(allowSpace)`
Create a validator verifies if the observable has a value. If `allowSpace` is
false, space only strings are treated as invalid.

### `koValidation.custom(isValid, message, blockInput)`
Create a validator using customized validation method.
* `isValid`, the validation method in form of `function (value) { return true; }`
* `message`, the error message for validation failure
* `blockInput`, a boolean decides whether invalid value will be blocked. If it's
`true`, setting the observable with an invalid value will turn into a noop.
Otherwise, the observable will be updated with the `message` added to the its
`errors` property

### `koValidation.run(value, validators)`
Validate a value against an array of validators manually. Returns the error
message of the first failed validator

### Validator.prototype.set(options)
For each validator, you can call its `set` method to config the following
options
* `blockInput`, whether or not the invalid values are blocked from setting to
the observable
* `message`, the error message on validation failure

### Validator.prototype.validate(value)
Validate a given value directly. Returns the error message if failed, otherwise
returns `undefined`.

[npm-image]: https://badge.fury.io/js/knockout-validation.svg
[npm-url]: https://npmjs.org/package/knockout-validation
[travis-image]: https://travis-ci.org/Microsoft/knockout-validation.svg?branch=master
[travis-url]: https://travis-ci.org/Microsoft/knockout-validation
[daviddm-image]: https://david-dm.org/Microsoft/knockout-validation.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Microsoft/knockout-validation
[coveralls-image]: https://coveralls.io/repos/Microsoft/knockout-validation/badge.svg
[coveralls-url]: https://coveralls.io/r/Microsoft/knockout-validation
