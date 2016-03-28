var chai = require('chai');
var sinon = require('sinon');

chai.use(require('sinon-chai'));
var expect = chai.expect;

// Use custom to test Base
var Base = require('../../js/validators/base');
var Custom = require('../../js/validators/custom');

describe('base validator', function () {
  var isValid = sinon.spy(function (value) {
    return value === 123;
  });
  var message = 'expect number 123';
  var blockInput = true;
  var validator = null;

  beforeEach(function () {
    validator = new Custom(isValid, message, blockInput);
  });

  it('should be super class of Custom', function () {
    expect(validator).to.be.instanceof(Base);
  });

  describe('set', function () {
    it('should be a method', function () {
      expect(validator.set).to.be.a('function');
    });

    it('should reconfig the validator', function () {
      var messageNew = 'It fails';
      var blockInputNew = false;

      expect(validator.message).to.equal(message);
      expect(validator.blockInput).to.equal(blockInput);

      validator.set({ message: messageNew, blockInput: blockInputNew });

      expect(validator.message).to.equal(messageNew);
      expect(validator.blockInput).to.equal(blockInputNew);
    });
  });

  describe('validate', function () {
    it('should be a method', function () {
      expect(validator.validate).to.be.a('function');
    });

    it('should return the error message on failure', function () {
      expect(validator.validate(456)).to.equal(message);
    });

    it('should return ', function () {
      expect(validator.validate(123)).not.to.exist;
    });
  });
});
