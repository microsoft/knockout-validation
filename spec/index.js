var _ = require('underscore');
var chai = require('chai');
var sinon = require('sinon');
var koValidation = require('../js/index');
var Required = require('../js/validators/required');
var str = require('../js/validators/string');
var num = require('../js/validators/number');
var Enum = require('../js/validators/enum');
var Custom = require('../js/validators/custom');

chai.use(require('sinon-chai'));
var expect = chai.expect;

describe('knockout-validation', function () {
  it('should return an object', function () {
    expect(koValidation).to.exist;
  });

  describe('required', function () {
    it('should be defined as a function', function () {
      expect(koValidation.required).to.be.a('function');
    });

    it('should return an instance of Required', function () {
      var allowSpace = false;
      var validator = koValidation.required(allowSpace);

      expect(validator).to.be.instanceof(Required);
      expect(validator.allowSpace).to.be.equal(allowSpace);
    });
  });

  describe('string', function () {
    it('should be defined as a function', function () {
      expect(koValidation.string).to.be.a('function');
    });

    it('should return an instance of str.Type', function () {
      expect(koValidation.string()).to.be.instanceof(str.Type);
    });

    describe('string.size', function () {
      it('should be defined as a function', function () {
        expect(koValidation.string.size).to.be.a('function');
      });

      it('should return an instance of str.Size', function () {
        expect(koValidation.string.size(32)).to.be.instanceof(str.Size);
      });
    });

    describe('string.xss', function () {
      it('should be defined as a function', function () {
        expect(koValidation.string.xss).to.be.a('function');
      });

      it('should return an instance of str.XSS', function () {
        expect(koValidation.string.xss()).to.be.instanceof(str.XSS);
      });
    });
  });

  describe('number', function () {
    it('should be defined as a function', function () {
      expect(koValidation.number).to.be.a('function');
    });

    it('should return an instance of num.Type', function () {
      expect(koValidation.number()).to.be.instanceof(num.Type);
    });

    describe('number.size', function () {
      it('should be defined as a function', function () {
        expect(koValidation.number.size).to.be.a('function');
      });

      it('should return an instance of num.Size', function () {
        var integerLength = _.random(1, 10);
        var decimalLength = _.random(1, 10);
        var validator = koValidation.number.size(integerLength, decimalLength);

        expect(validator).to.be.instanceof(num.Size);
        expect(validator.integerLength).to.equal(integerLength);
        expect(validator.decimalLength).to.equal(decimalLength);
      });
    });

    describe('number.range', function () {
      it('should be defined as a function', function () {
        expect(koValidation.number.range).to.be.a('function');
      });

      it('should reutrn an instance of num.Range', function () {
        var min = _.random(0, 100);
        var max = _.random(100, 200);
        var validator = koValidation.number.range(min, max);

        expect(validator).to.be.instanceof(num.Range);
        expect(validator.min).to.equal(min);
        expect(validator.max).to.equal(max);
      });
    });
  });

  describe('enum', function () {
    it('should be defined as a function', function () {
      expect(koValidation.enum).to.be.a('function');
    });

    it('should return an instance of Enum', function () {
      var enumerators = ['hello', 'world'];
      var nullable = true;
      var validator = koValidation.enum(enumerators, true);

      expect(validator).to.be.instanceof(Enum);
      expect(validator.enumerators).to.deep.equal(enumerators);
      expect(validator.nullable).to.equal(nullable);
    });
  });

  describe('custom', function () {
    it('should be defined as a function', function () {
      expect(koValidation.custom).to.be.a('function');
    });

    it('should return an instance of Custom', function () {
      var method = function () {
        return false;
      };
      var message = 'Always fail';
      var blockInput = false;
      var validator = koValidation.custom(method, message, blockInput);

      expect(validator).to.be.instanceof(Custom);
      expect(validator.isValid).to.be.equal(method);
      expect(validator.message).to.be.equal(message);
      expect(validator.blockInput).to.be.equal(blockInput);
    });
  });

  describe('run', function () {
    it('should be defined as a function', function () {
      expect(koValidation.run).to.be.a('function');
    });

    it('should call the validators', function () {
      var isValid = sinon.spy(function () {
        return false;
      });
      var message = 'Always fail';
      var blockInput = false;

      var result = koValidation.run('foo', [
        koValidation.custom(isValid, message, blockInput),
      ]);

      expect(result).to.equal(message);
      expect(isValid).to.be.calledOnce;
    });
  });
});
