define(['lib/knockout', 'lib/underscore'], function (ko, _) {
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
});
