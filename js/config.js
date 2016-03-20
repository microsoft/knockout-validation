define(['lib/underscore'], function(_) {
  return {
    defaultMessage: _.reduce([
      'Validation_Base_Field_Not_Valid',
      'Validation_NotEmpty_Required_Field',
      'Validation_String_Max_Length',
      'Validation_String_Invalid_Characters',
      'Validation_Number_Require_Numeric',
      'Validation_Number_Max_Length',
      'Validation_Number_Range_Min',
      'Validation_Number_Range_Max',
      'Validation_Number_Range_Between',
    ], function(obj, key) {
      obj[key] = function() { return key; };
      return obj;
    }, {}),

    decimalPoint: 2,
  };
});
