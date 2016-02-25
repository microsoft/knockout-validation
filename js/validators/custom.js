define(['lib/underscore',
        'component/ko-validation/validators/base'], 
function (_, Base) {
    'use strict';
    var Custom = function (method, message, blockInput) {
        _.extend(this, new Base());

        if (blockInput) {
            this.blockInput = blockInput;
        }

        if (message) {
            this.message = message;
        }

        this.isValid = method;
    };
    
    return Custom;
});