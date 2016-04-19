define(['component/ko-validation/config'], function (config) {
    'use strict';

    function getParts(input, decimalChar) {
        input = '' + input;
        var fracIndex = input.lastIndexOf(decimalChar) + 1;
        var parts = {
            negative: input.substring(0, 1) == '-' ? '-' : '',
            fractional: fracIndex ? input.substr(fracIndex).replace(/\D/g, '') : '',
            integral: (fracIndex ? input.substring(0, fracIndex) : input).replace(/\D/g, '')
        };
        parts.toFloat = function toFloat() {
            return parseFloat(parts.negative + '0' + parts.integral + '.' + parts.fractional);
        };
        return parts;
    }

    function getFormat() {
      return {
        decimalChar             : config.decimalPoint,
        groupChar               : config.groupPoint,
        groupSize               : config.groupSize,
        percentSymbol           : config.percentSymbol,
        percentGroupSize        : config.percentGroupSize,
        percentGroupSeparator   : config.percentGroupSeparator,
        percentPositivePattern  : config.percentPositivePattern,
        numberOfDigits          : config.numberOfDigits,
        percentDecimalDigits    : config.percentDecimalDigits,
        percentDecimalSeparator : config.percentDecimalSeparator,
      };
    }

    var dn = {
        // true/false if exactly formatted correct, no smoothing
        isValid: function isValid (localizedInput, allowNoIntegralPart) {
            var format = getFormat()
              , minGroupSize = 0// allowNoIntegralPart ? 0 : 1
              , re = new RegExp('^[+-]?[0-9]{' + minGroupSize + ',' + format.groupSize + '}(?:\\' + format.groupChar + '?[0-9]{' + format.groupSize + '})*(?:\\' + format.decimalChar + '[[0-9]*)?$')
              , isValid = re.test(localizedInput);

            return isValid;
        },

        // returns null if invalid
        // rounds if number of digits is passed, otherwise no rounding
        fromLocalToFloat: function fromLocalToFloat(localizedInput /*, numberOfDigits */) {
            var format = getFormat(),
                parts = getParts(localizedInput, format.decimalChar);
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
        //         parts = getParts(localizedInput, format.decimalChar),
        //         numberOfDigits = typeof numberOfDigits === 'undefined' ? format.numberOfDigits : numberOfDigits,
        //         cleanedAndRounded = parts.toFloat().toFixed(numberOfDigits).split('.'),
        //         formattedIntegral = '',
        //         i = cleanedAndRounded[0].length;

        //     for (; i > format.groupSize; i -= format.groupSize) {
        //         formattedIntegral = format.groupChar + cleanedAndRounded[0].substring(i - format.groupSize, i) + formattedIntegral;
        //     }

        //     formattedIntegral = cleanedAndRounded[0].substring(0, i) + formattedIntegral;
        //     if (numberOfDigits) {
        //         formattedIntegral += format.decimalChar + cleanedAndRounded[1];
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
    //     return dn.fromLocalToString(floatInput.toString().replace('.', format.decimalChar), numberOfDigits);
    // };

    // // Used in Location Targeting control to convert Lat/Lon to string using customer culture information
    // dn.fromCoordinateToString = function fromCoordinateToString(value) {
    //     if (value && (typeof decimalFormatter !== 'undefined')) {
    //         value = value.toString().replace(".", decimalFormatter.decimalChar);
    //     }

    //     return value;
    // };

    // // used to format float value to string with a percent sign. Does NOT convert the float to a percent. Ex: 42.07 => 42.07%, 0.15 => 0.15%
    // dn.fromFloatToPercentString = function fromFloatToPercentString(floatInput, numberOfDigits) {
    //     var format = getFormat();
    //     //fromLocalToPercentString will multiply the number by 100 and displayed with a percent symbol.
    //     var input = floatInput / 100;
    //     return dn.fromLocalToPercentString(input.toString().replace('.', format.decimalChar), numberOfDigits);
    // };

    return dn;
});
